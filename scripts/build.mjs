// Production build: client bundle + build-time pre-render of the English page.
// The pre-rendered HTML gives an instant first paint, indexable content and a
// no-JS fallback; src/main.jsx then hydrates it.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "dist", "index.html");
const ssrDir = path.join(root, "node_modules", ".prerender");
const marker = '<div id="root"></div>';

// One timestamp for both builds so date-based text hydrates identically.
process.env.VITE_BUILD_TIME ||= new Date().toISOString();

await build({ root });
await build({
  root,
  logLevel: "warn",
  build: { ssr: "src/entry-server.jsx", outDir: ssrDir, emptyOutDir: true, copyPublicDir: false },
});

const { render } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
let html = fs.readFileSync(indexPath, "utf8");
if (!html.includes(marker)) throw new Error(`prerender: ${marker} not found in dist/index.html`);
// Replacer function: a string replacement would interpret $&, $' etc. inside the content.
const rendered = render();
html = html.replace(marker, () => `<div id="root">${rendered}</div>`);

// Inline the (single, ~12 kB gzipped) stylesheet to save a render-blocking round trip.
html = html.replace(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/, (_, href) => {
  const css = fs.readFileSync(path.join(root, "dist", href), "utf8");
  return `<style>${css}</style>`;
});

fs.writeFileSync(indexPath, html);
fs.rmSync(ssrDir, { recursive: true, force: true });

console.log(`prerender: dist/index.html is ${(fs.statSync(indexPath).size / 1024).toFixed(1)} kB`);
