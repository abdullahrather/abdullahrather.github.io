// Browser checks against the production build. Run `npm run build` first.
// Set PW_CHANNEL=msedge to use an installed browser instead of Playwright's Chromium.
import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import { chromium } from "playwright";
import { preview } from "vite";

const PORT = 4180;
const URL = `http://localhost:${PORT}/`;
const axeSource = fs.readFileSync(createRequire(import.meta.url).resolve("axe-core/axe.min.js"), "utf8");

const server = await preview({ preview: { port: PORT, strictPort: true }, logLevel: "error" });
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || undefined });
const problems = [];

const GOOGLE_ANALYTICS = /googletagmanager|google-analytics/;

// `consent` is the stored choice; null means a first visit, with the banner showing.
const openPage = async ({ consent = "denied", path = "", ...options } = {}) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...options });
  // External services are not part of these checks.
  await context.route(GOOGLE_ANALYTICS, (route) => route.abort());
  if (consent) await context.addInitScript((value) => localStorage.setItem("analytics-consent", value), consent);
  const page = await context.newPage();
  page.analyticsRequests = [];
  page.on("request", (request) => {
    if (GOOGLE_ANALYTICS.test(request.url())) page.analyticsRequests.push(request.url());
  });
  page.on("pageerror", (error) => problems.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && !/Failed to load resource|ERR_FAILED/.test(message.text())) {
      problems.push(message.text());
    }
  });
  await page.goto(URL + path, { waitUntil: "networkidle" });
  return page;
};

const check = async (name, run) => {
  await run();
  console.log(`ok - ${name}`);
};

try {
  await check("pre-rendered content works without JavaScript", async () => {
    const page = await openPage({ javaScriptEnabled: false });
    assert.match(await page.locator("h1").innerText(), /backends/);
    assert.equal(await page.locator("#projects article").count(), 7);
  });

  await check("sections, experience and projects render", async () => {
    const page = await openPage();
    for (const id of ["about", "experience", "expertise", "projects", "activity", "contact"]) {
      assert.equal(await page.locator(`#${id}`).count(), 1, id);
    }
    assert.equal(await page.locator("#experience ol > li").count(), 6);
    assert.equal((await page.locator("#about .chip").count()) > 20, true, "skills are listed");
  });

  await check("GitHub activity shows the saved data without asking GitHub", async () => {
    const page = await openPage();
    const requests = [];
    page.on("request", (request) => requests.push(request.url()));
    await page.evaluate(() => document.getElementById("activity").scrollIntoView({ behavior: "instant" }));
    assert.ok((await page.locator('#activity [role="img"] > span').count()) > 170, "half a year of days");
    assert.ok((await page.locator('#activity a[href*="/releases/tag/"]').count()) > 0, "a release is listed");
    assert.ok((await page.locator('#activity a[href*="/commit/"]').count()) > 0, "a commit is listed");
    await page.waitForTimeout(300);
    assert.deepEqual(
      requests.filter((url) => url.includes("github")),
      [],
    );
  });

  await check("case study pages are pre-rendered and linked", async () => {
    const page = await openPage({ javaScriptEnabled: false, path: "work/streaming-ad-platform/" });
    assert.equal(await page.locator("h1").innerText(), "Streaming Ad Platform");
    assert.match(await page.title(), /^Streaming Ad Platform — Abdullah Rather$/);
    assert.equal(
      await page.locator('link[rel="canonical"]').getAttribute("href"),
      "https://abdullahrather.com/work/streaming-ad-platform/",
    );
    assert.equal(await page.locator("main figure img").count(), 4);
    // Section links lead back to the home page.
    assert.equal(await page.getByRole("link", { name: "About", exact: true }).first().getAttribute("href"), "/#about");

    const home = await openPage();
    await home.evaluate(() => document.getElementById("projects").scrollIntoView({ behavior: "instant" }));
    await home.getByRole("link", { name: "Read the case study: CareerCraft" }).click();
    await home.waitForURL(/\/work\/career-craft\/$/);
    assert.equal(await home.locator("h1").innerText(), "CareerCraft");
    await home.getByRole("link", { name: /Next case study/ }).click();
    await home.waitForURL(/\/work\/enterprise-management\/$/);
    // Private work has no screenshots.
    assert.equal(await home.locator("main figure").count(), 0);
  });

  await check("project filters and details work", async () => {
    const page = await openPage();
    await page.evaluate(() => document.getElementById("projects").scrollIntoView({ behavior: "instant" }));
    await page.locator("#projects article button").first().click();
    assert.equal(await page.locator("dialog[open]").count(), 1);
    await page.keyboard.press("Escape");
    await page.locator("button[aria-pressed]", { hasText: "Public" }).click();
    await page.waitForTimeout(700);
    assert.equal(await page.locator("#projects article").count(), 6);
  });

  await check("command menu navigates", async () => {
    const page = await openPage();
    await page.keyboard.press("Control+k");
    await page.keyboard.type("contact");
    await page.keyboard.press("Enter");
    // Smooth scrolling takes longer on slower machines.
    await page.waitForFunction(
      () => Math.abs(document.getElementById("contact").getBoundingClientRect().top) < 200,
      null,
      {
        timeout: 5000,
      },
    );
  });

  await check("command menu opens a case study", async () => {
    const page = await openPage({ path: "work/career-craft/" });
    await page.keyboard.press("Control+k");
    await page.keyboard.type("streaming");
    await page.keyboard.press("Enter");
    await page.waitForURL(/\/work\/streaming-ad-platform\/$/);
    await page.waitForLoadState("networkidle");
    // A section is on the home page, so choosing one from a case study goes there.
    await page.keyboard.press("Control+k");
    await page.keyboard.type("contact");
    await page.keyboard.press("Enter");
    await page.waitForURL(/\/#contact$/);
  });

  await check("German language and title load", async () => {
    const page = await openPage({ locale: "de-DE" });
    await page.waitForTimeout(500);
    assert.match(await page.locator("h1").innerText(), /entwickle/);
    assert.match(await page.title(), /KI-Entwickler/);

    const study = await openPage({ locale: "de-DE", path: "work/streaming-ad-platform/" });
    await study.waitForTimeout(500);
    assert.equal(await study.locator("h1").innerText(), "Streaming-Werbeplattform");
    assert.match(await study.title(), /^Streaming-Werbeplattform — Abdullah Rather$/);
  });

  for (const path of ["", "work/streaming-ad-platform/"]) {
    await check(`phone layout has no sideways scroll on /${path}`, async () => {
      const page = await openPage({ path, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    });
  }

  await check("the cookie banner leaves the headline readable on a phone", async () => {
    const page = await openPage({
      consent: null,
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    await page.waitForTimeout(1200);
    const headline = await page.locator("h1").boundingBox();
    const banner = await page.getByRole("region", { name: "This site uses cookies" }).boundingBox();
    assert.ok(headline.y + headline.height <= banner.y, "the headline ends above the banner");
  });

  await check("Google Analytics waits for consent", async () => {
    const page = await openPage({ consent: null });
    const banner = page.getByRole("region", { name: "This site uses cookies" });
    assert.equal(await banner.count(), 1, "banner shows on a first visit");
    assert.match(await banner.textContent(), /Google Analytics/, "banner names the analytics provider");
    assert.deepEqual(page.analyticsRequests, [], "nothing loads before a choice");

    await page.getByRole("button", { name: "Decline" }).click();
    await page.waitForTimeout(300);
    assert.equal(await banner.count(), 0, "banner closes");
    assert.deepEqual(page.analyticsRequests, [], "nothing loads after declining");

    await page.getByRole("button", { name: "Cookie settings" }).click();
    await page.getByRole("button", { name: "Accept" }).click();
    await page.waitForTimeout(300);
    assert.ok(page.analyticsRequests.length > 0, "analytics load after accepting");

    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await banner.count(), 0, "the choice is remembered");
  });

  await check("privacy page opens and links to cookie settings", async () => {
    const page = await openPage({ consent: "granted", path: "privacy/" });
    assert.equal(await page.locator("h1").first().innerText(), "Privacy Policy");
    await page.getByRole("link", { name: "open cookie settings" }).click();
    await page.getByRole("button", { name: "Decline" }).waitFor();
  });

  for (const [colorScheme, path] of [
    ["dark", ""],
    ["light", ""],
    ["dark", "work/streaming-ad-platform/"],
    ["light", "work/enterprise-management/"],
  ]) {
    await check(`no accessibility violations in ${colorScheme} theme on /${path}`, async () => {
      const page = await openPage({ consent: null, colorScheme, reducedMotion: "reduce", path });
      await page.evaluate(() => document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in")));
      await page.addScriptTag({ content: axeSource });
      const violations = await page.evaluate(async () =>
        (await window.axe.run(document)).violations.map((v) => `${v.id} x${v.nodes.length}`),
      );
      assert.deepEqual(violations, []);
    });
  }

  assert.deepEqual(problems, [], "browser errors");
  console.log("All smoke checks passed.");
} finally {
  await browser.close();
  await new Promise((resolve) => server.httpServer.close(resolve));
}
