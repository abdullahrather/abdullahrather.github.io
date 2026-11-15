// Browser checks against the production build. Run `npm run build` first.
// Set PW_CHANNEL=msedge to use an installed browser instead of Playwright's Chromium.
//
// What to expect is read from the content folder the site was built from (content/, or the
// folder CONTENT_DIR names), so the same checks cover the demo content and anyone's own.
import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import { chromium } from "playwright";
import { preview } from "vite";
import { readContent } from "../scripts/content.mjs";

const PORT = 4180;
const URL = `http://localhost:${PORT}/`;
const axeSource = fs.readFileSync(createRequire(import.meta.url).resolve("axe-core/axe.min.js"), "utf8");

const site = readContent("site.json");
const facts = readContent("facts.json");
const en = readContent("en.json");
const de = readContent("de.json");

const SOFT_HYPHEN = String.fromCharCode(0xad);
const plain = (text) => text.replaceAll(SOFT_HYPHEN, "");
const isPublic = (url) => url && url !== "#" && url !== `https://github.com/${site.github}`;
// In the order of the language file, which is the order on the site.
const studies = en.projects.items
  .map((p) => ({ ...p, ...facts.projects.find((f) => f.id === p.id) }))
  .filter((p) => p.caseStudy);
const studyPath = (study) => `work/${study.slug}/`;
const analyticsOn = Boolean(site.analyticsId);
const calendars = readContent("activity.json").calendars ?? [];
const activityOn = Boolean(site.github) && calendars.length > 0;

const server = await preview({ preview: { port: PORT, strictPort: true }, logLevel: "error" });
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || undefined });
const problems = [];

const GOOGLE_ANALYTICS = /googletagmanager|google-analytics/;

// `consent` is the stored choice; null means a first visit, with the banner showing when analytics are on.
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

const phone = { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true };

const check = async (name, run) => {
  await run();
  console.log(`ok - ${name}`);
};

try {
  await check("pre-rendered content works without JavaScript", async () => {
    const page = await openPage({ javaScriptEnabled: false });
    assert.ok((await page.locator("h1").innerText()).includes(en.ui.hero.headline_a));
    // The portrait stays out of the headline, so the heading reads as one plain sentence.
    assert.equal(await page.locator("h1 img").count(), 0);
    assert.equal(await page.locator(`#top img[alt="${en.ui.a11y.portrait}"]`).count(), 1);
    assert.equal(await page.locator('#top a[aria-label^="Case study: "]').count(), Math.min(3, studies.length));
    assert.equal(await page.locator("#projects article").count(), Math.min(7, facts.projects.length));
  });

  await check("sections, experience and projects render", async () => {
    const page = await openPage();
    for (const id of ["about", "experience", "expertise", "projects", "contact"]) {
      assert.equal(await page.locator(`#${id}`).count(), 1, id);
    }
    assert.equal(await page.locator("#activity").count(), activityOn ? 1 : 0, "activity shows only with a GitHub user");
    assert.equal(await page.locator("#experience ol > li").count(), facts.experience.length);
    const skills = en.skills.groups.reduce((sum, group) => sum + group.items.length, 0);
    assert.equal(await page.locator("#about li.chip").count(), skills, "skills are listed");
  });

  if (activityOn) {
    await check("GitHub activity shows the saved data without asking GitHub", async () => {
      const page = await openPage();
      const requests = [];
      page.on("request", (request) => requests.push(request.url()));
      await page.evaluate(() => document.getElementById("activity").scrollIntoView({ behavior: "instant" }));
      const [recent, ...years] = calendars;
      const days = page.locator('#activity [role="img"] > span');
      assert.equal(await days.count(), recent.counts.length, "a square per day of the last 12 months");
      assert.ok((await page.locator("#activity").innerText()).includes(String(recent.total)));

      // A year shows its own calendar and total, and the readout names the day under the pointer.
      const choices = page.locator('#activity [role="group"] button');
      assert.equal(await choices.count(), calendars.length, "the last 12 months and every year");
      if (years.length) {
        const year = years[0];
        await choices.nth(1).click();
        assert.equal(await choices.nth(1).getAttribute("aria-pressed"), "true");
        assert.equal(await days.count(), year.counts.length, `a square per day of ${year.id}`);
        assert.ok((await page.locator("#activity").innerText()).includes(String(year.total)));
      }
      await days.first().hover();
      assert.match(await page.locator('#activity [aria-live="polite"]').innerText(), /\d{4}/, "the day is named");

      assert.ok((await page.locator('#activity a[href*="/releases/tag/"]').count()) > 0, "a release is listed");
      assert.ok((await page.locator('#activity a[href*="/commit/"]').count()) > 0, "a commit is listed");
      await page.waitForTimeout(300);
      assert.deepEqual(
        requests.filter((url) => url.includes("github")),
        [],
      );
    });
  }

  if (studies.length) {
    await check("case study pages are pre-rendered and linked", async () => {
      const first = studies[0];
      const page = await openPage({ javaScriptEnabled: false, path: studyPath(first) });
      assert.equal(plain(await page.locator("h1").innerText()), plain(first.title));
      assert.equal(await page.title(), `${plain(first.title)} — ${site.name}`);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), `${site.url}/${studyPath(first)}`);
      assert.equal(await page.locator("main figure img").count(), first.screens.length);
      // Section links lead back to the home page.
      const about = page.getByRole("link", { name: en.ui.nav.about, exact: true }).first();
      assert.equal(await about.getAttribute("href"), "/#about");

      const last = studies.at(-1);
      const home = await openPage();
      await home.evaluate(() => document.getElementById("projects").scrollIntoView({ behavior: "instant" }));
      await home.getByRole("link", { name: `${en.ui.study.read}: ${last.title}` }).click();
      await home.waitForURL(new RegExp(`/${studyPath(last)}$`));
      assert.equal(plain(await home.locator("h1").innerText()), plain(last.title));
      // The last case study leads on to the first.
      await home.getByRole("link", { name: new RegExp(en.ui.study.next) }).click();
      await home.waitForURL(new RegExp(`/${studyPath(first)}$`));
      assert.equal(await home.locator("main figure").count(), first.screens.length);
    });
  }

  await check("project filters and details work", async () => {
    const page = await openPage();
    await page.evaluate(() => document.getElementById("projects").scrollIntoView({ behavior: "instant" }));
    if (facts.projects.some((p) => !p.caseStudy)) {
      await page.locator("#projects article button").first().click();
      assert.equal(await page.locator("dialog[open]").count(), 1);
      await page.keyboard.press("Escape");
    }
    const publicFilter = en.projects.filters.find((f) => f.id === "public").name;
    await page.locator("button[aria-pressed]", { hasText: publicFilter }).click();
    await page.waitForTimeout(700);
    const publicCount = facts.projects.filter((p) => isPublic(p.github)).length;
    assert.equal(await page.locator("#projects article").count(), Math.min(6, publicCount));
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

  if (studies.length > 1) {
    await check("command menu opens a case study", async () => {
      const [from, to] = [studies.at(-1), studies[0]];
      const page = await openPage({ path: studyPath(from) });
      await page.keyboard.press("Control+k");
      await page.keyboard.type(to.slug);
      await page.keyboard.press("Enter");
      await page.waitForURL(new RegExp(`/${studyPath(to)}$`));
      await page.waitForLoadState("networkidle");
      // A section is on the home page, so choosing one from a case study goes there.
      await page.keyboard.press("Control+k");
      await page.keyboard.type("contact");
      await page.keyboard.press("Enter");
      await page.waitForURL(/\/#contact$/);
    });
  }

  await check("German language and title load", async () => {
    const page = await openPage({ locale: "de-DE" });
    await page.waitForTimeout(500);
    assert.ok((await page.locator("h1").innerText()).includes(de.ui.hero.headline_a));
    assert.equal(await page.title(), de.ui.meta.title);

    if (studies.length) {
      const title = de.projects.items.find((p) => p.id === studies[0].id).title;
      const study = await openPage({ locale: "de-DE", path: studyPath(studies[0]) });
      await study.waitForTimeout(500);
      assert.equal(plain(await study.locator("h1").innerText()), plain(title));
      assert.equal(await study.title(), `${plain(title)} — ${site.name}`);
    }
  });

  for (const path of ["", ...studies.map(studyPath)]) {
    await check(`phone layout has no sideways scroll on /${path}`, async () => {
      const page = await openPage({ path, ...phone });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    });
  }

  await check("the German headline fits a phone screen", async () => {
    const page = await openPage({ locale: "de-DE", ...phone });
    await page.waitForFunction((text) => document.querySelector("h1").innerText.includes(text), de.ui.hero.headline_a);
    assert.equal(await page.locator("h1").evaluate((h1) => h1.scrollWidth <= h1.clientWidth), true);
  });

  if (analyticsOn) {
    await check("the cookie banner leaves the headline readable on a phone", async () => {
      const page = await openPage({ consent: null, ...phone });
      await page.waitForTimeout(1200);
      const headline = await page.locator("h1").boundingBox();
      const banner = await page.getByRole("region", { name: en.ui.consent.title }).boundingBox();
      assert.ok(headline.y + headline.height <= banner.y, "the headline ends above the banner");
    });

    await check("Google Analytics waits for consent", async () => {
      const page = await openPage({ consent: null });
      const banner = page.getByRole("region", { name: en.ui.consent.title });
      assert.equal(await banner.count(), 1, "banner shows on a first visit");
      assert.match(await banner.textContent(), /Google Analytics/, "banner names the analytics provider");
      assert.deepEqual(page.analyticsRequests, [], "nothing loads before a choice");

      await page.getByRole("button", { name: en.ui.consent.decline }).click();
      await page.waitForTimeout(300);
      assert.equal(await banner.count(), 0, "banner closes");
      assert.deepEqual(page.analyticsRequests, [], "nothing loads after declining");

      await page.getByRole("button", { name: en.ui.consent.settings }).click();
      await page.getByRole("button", { name: en.ui.consent.accept }).click();
      await page.waitForTimeout(300);
      assert.ok(page.analyticsRequests.length > 0, "analytics load after accepting");

      await page.reload({ waitUntil: "networkidle" });
      assert.equal(await banner.count(), 0, "the choice is remembered");
    });

    await check("privacy page opens and links to cookie settings", async () => {
      const page = await openPage({ consent: "granted", path: "privacy/" });
      assert.equal(await page.locator("h1").first().innerText(), "Privacy Policy");
      await page.getByRole("link", { name: "open cookie settings" }).click();
      await page.getByRole("button", { name: en.ui.consent.decline }).waitFor();
    });
  } else {
    await check("without an analytics ID, nothing asks for consent or loads analytics", async () => {
      const page = await openPage({ consent: null });
      await page.waitForTimeout(800);
      assert.equal(await page.getByRole("region", { name: en.ui.consent.title }).count(), 0, "no banner");
      assert.equal(await page.getByRole("button", { name: en.ui.consent.settings }).count(), 0, "no settings link");
      assert.deepEqual(page.analyticsRequests, [], "no analytics requests");
    });

    await check("privacy page opens", async () => {
      const page = await openPage({ path: "privacy/" });
      assert.equal(await page.locator("h1").first().innerText(), "Privacy Policy");
    });
  }

  // GitHub Pages shows this for a missing address. The preview server doesn't, so it's opened directly.
  await check("the page-not-found page links home", async () => {
    const page = await openPage({ path: "404.html" });
    assert.equal(await page.locator("h1").innerText(), "Page not found");
    assert.ok((await page.locator('a[href="/"]').count()) > 0);
    assert.match(await page.title(), new RegExp(`— ${site.name}$`));
  });

  for (const [colorScheme, path] of [
    ["dark", ""],
    ["light", ""],
    ...(studies.length ? [["dark", studyPath(studies[0])]] : []),
    ...(studies.length > 1 ? [["light", studyPath(studies.at(-1))]] : []),
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
