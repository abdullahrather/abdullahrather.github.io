// Production build: client bundle + build-time pre-render of the English pages.
// The pre-rendered HTML gives an instant first paint, indexable content and a
// no-JS fallback; src/main.jsx then hydrates it. The home page is dist/index.html
// and each case study is dist/work/<slug>/index.html.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const indexPath = path.join(dist, "index.html");
const ssrDir = path.join(root, "node_modules", ".prerender");
const marker = '<div id="root"></div>';
const SITE = "https://abdullahrather.com";

const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));

// One timestamp for both builds so date-based text hydrates identically.
process.env.VITE_BUILD_TIME ||= new Date().toISOString();

await build({ root });
await build({
  root,
  logLevel: "warn",
  build: { ssr: "src/entry-server.jsx", outDir: ssrDir, emptyOutDir: true, copyPublicDir: false },
});

const { render } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
let template = fs.readFileSync(indexPath, "utf8");
if (!template.includes(marker)) throw new Error(`prerender: ${marker} not found in dist/index.html`);

// Inline the (single, small) stylesheet to save a render-blocking round trip.
template = template.replace(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/, (_, href) => {
  const css = fs.readFileSync(path.join(dist, href), "utf8");
  return `<style>${css}</style>`;
});

// Replacer functions throughout: a string replacement would interpret $&, $' etc. inside the content.
const withPage = (html, pathname) => html.replace(marker, () => `<div id="root">${render(pathname)}</div>`);

const escapeAttr = (text) => text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Replaces one value in the <head>, and fails the build if index.html no longer has it. */
const replaceOnce = (html, pattern, value) => {
  if (!pattern.test(html)) throw new Error(`prerender: ${pattern} not found in index.html`);
  return html.replace(pattern, (_, before, after) => `${before}${escapeAttr(value)}${after}`);
};

const withHead = (html, { title, description, url }) => {
  const content = (selector) => new RegExp(`(<meta ${selector}\\s+content=")[^"]*(")`);
  let page = html;
  page = replaceOnce(page, /(<title>)[^<]*(<\/title>)/, title);
  page = replaceOnce(page, /(<link rel="canonical" href=")[^"]*(")/, url);
  page = replaceOnce(page, content('name="description"'), description);
  page = replaceOnce(page, content('property="og:url"'), url);
  for (const name of ['property="og:title"', 'name="twitter:title"']) page = replaceOnce(page, content(name), title);
  for (const name of ['property="og:description"', 'name="twitter:description"']) {
    page = replaceOnce(page, content(name), description);
  }
  // The portrait is only on the home page.
  return page.replace(/\s*<link rel="preload" as="image"[^>]*>/, "");
};

fs.writeFileSync(indexPath, withPage(template, "/"));
const pages = ["index.html"];

const en = readJson("src/languages/en.json");
for (const project of readJson("src/data/facts.json").projects.filter((p) => p.caseStudy)) {
  const text = en.projects.items.find((item) => item.id === project.id);
  const pathname = `/work/${project.slug}/`;
  const head = { title: `${text.title} — Abdullah Rather`, description: text.study.tagline, url: SITE + pathname };
  const file = path.join(dist, "work", project.slug, "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, withPage(withHead(template, head), pathname));
  pages.push(path.relative(dist, file).replaceAll("\\", "/"));
}

fs.rmSync(ssrDir, { recursive: true, force: true });

for (const page of pages) {
  console.log(`prerender: dist/${page} is ${(fs.statSync(path.join(dist, page)).size / 1024).toFixed(1)} kB`);
}
