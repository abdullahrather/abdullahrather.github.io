// Production build: client bundle + build-time pre-render of the English pages.
// The pre-rendered HTML gives an instant first paint, indexable content and a
// no-JS fallback; src/main.jsx then hydrates it. The home page is dist/index.html
// and each case study is dist/work/<slug>/index.html. Content comes from the content
// folder (see scripts/content.mjs), which also gives the sitemap and robots.txt. It also
// writes a page-not-found page.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";
import { readContent, root } from "./content.mjs";

const dist = path.join(root, "dist");
const indexPath = path.join(dist, "index.html");
const ssrDir = path.join(root, "node_modules", ".prerender");
const marker = '<div id="root"></div>';
const site = readContent("site.json");

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

const en = readContent("en.json");
const studies = readContent("facts.json").projects.filter((p) => p.caseStudy);
for (const project of studies) {
  const text = en.projects.items.find((item) => item.id === project.id);
  const pathname = `/work/${project.slug}/`;
  const head = { title: `${text.title} — ${site.name}`, description: text.study.tagline, url: site.url + pathname };
  const file = path.join(dist, "work", project.slug, "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, withPage(withHead(template, head), pathname));
  pages.push(path.relative(dist, file).replaceAll("\\", "/"));
}

fs.rmSync(ssrDir, { recursive: true, force: true });

// Files that name the site's address, written from site.json.
const entry = (pathname, changefreq, priority) =>
  `  <url>\n    <loc>${site.url}${pathname}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entry("/", "monthly", "1.0") +
    studies.map((p) => entry(`/work/${p.slug}/`, "monthly", "0.8")).join("") +
    entry("/privacy/", "yearly", "0.2") +
    "</urlset>\n",
);
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

// GitHub Pages answers a missing address with 404.html when the site has one.
const name = escapeAttr(site.name);
fs.writeFileSync(
  path.join(dist, "404.html"),
  `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <title>Page not found — ${name}</title>
  <link rel="icon" href="/images/favicons/favicon.ico" sizes="any" />
  <style>
    :root { color-scheme: light dark; --bg: #fafafa; --fg: #18181b; --muted: #52525b; --accent: #4f46e5; }
    @media (prefers-color-scheme: dark) { :root { --bg: #09090b; --fg: #fafafa; --muted: #a1a1aa; --accent: #a5b4fc; } }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: var(--bg); color: var(--fg);
      font: 16px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif; text-align: center; padding: 2rem; box-sizing: border-box; }
    h1 { font-size: 2rem; letter-spacing: -0.03em; margin: 0 0 0.5rem; }
    p { color: var(--muted); margin: 0.25rem 0; }
    a { color: var(--accent); }
  </style>
</head>
<body>
  <main>
    <h1>Page not found</h1>
    <p>This page doesn't exist. <a href="/">Go to the home page</a></p>
    <p lang="de">Diese Seite gibt es nicht. <a href="/">Zur Startseite</a></p>
  </main>
</body>
</html>
`,
);

for (const page of pages) {
  console.log(`prerender: dist/${page} is ${(fs.statSync(path.join(dist, page)).size / 1024).toFixed(1)} kB`);
}
