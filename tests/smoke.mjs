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

const openPage = async (options = {}) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...options });
  // External services are not part of these checks.
  await context.route(/googletagmanager|google-analytics/, (route) => route.abort());
  const page = await context.newPage();
  page.on("pageerror", (error) => problems.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && !/Failed to load resource|ERR_FAILED/.test(message.text())) {
      problems.push(message.text());
    }
  });
  await page.goto(URL, { waitUntil: "networkidle" });
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
    for (const id of ["about", "experience", "expertise", "projects", "contact"]) {
      assert.equal(await page.locator(`#${id}`).count(), 1, id);
    }
    assert.equal(await page.locator("#experience ol > li").count(), 6);
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
    await page.waitForTimeout(1300);
    const top = await page.evaluate(() => document.getElementById("contact").getBoundingClientRect().top);
    assert.ok(Math.abs(top) < 200, `contact top was ${top}`);
  });

  await check("German language and title load", async () => {
    const page = await openPage({ locale: "de-DE" });
    await page.waitForTimeout(500);
    assert.match(await page.locator("h1").innerText(), /entwickle/);
    assert.match(await page.title(), /KI-Entwickler/);
  });

  await check("phone layout has no sideways scroll", async () => {
    const page = await openPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  });

  for (const colorScheme of ["dark", "light"]) {
    await check(`no accessibility violations in ${colorScheme} theme`, async () => {
      const page = await openPage({ colorScheme, reducedMotion: "reduce" });
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
