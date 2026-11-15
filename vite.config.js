import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { contentDir, publicDir, readContent, root } from "./scripts/content.mjs";

const site = readContent("site.json");
const text = readContent("en.json");

// The dev server sends /privacy/ to the app; serve the static page as production does.
const privacyPageInDev = {
  name: "privacy-page-in-dev",
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (/^\/privacy\/?(\?|$)/.test(req.url)) req.url = "/privacy/index.html";
      next();
    });
  },
};

// index.html holds no personal details: its {{placeholders}} are filled from the content folder.
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.person.jobTitle,
  worksFor: { "@type": "Organization", name: site.person.employer },
  description: site.shortDescription,
  url: `${site.url}/`,
  image: site.url + site.socialImage,
  email: `mailto:${site.email}`,
  sameAs: site.socials.map((social) => social.url),
  knowsAbout: site.person.knowsAbout,
  address: { "@type": "PostalAddress", addressLocality: site.person.locality, addressCountry: site.person.country },
};
const head = {
  title: text.ui.meta.title,
  description: text.ui.meta.description,
  shortDescription: site.shortDescription,
  name: site.name,
  email: site.email,
  url: `${site.url}/`,
  socialImage: site.url + site.socialImage,
  // The AVIF copy when there is one: browsers that cannot show it skip a preload of that type.
  portrait: site.portraitAvif || site.portrait,
  portraitType: {
    avif: "image/avif",
    webp: "image/webp",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    svg: "image/svg+xml",
  }[(site.portraitAvif || site.portrait).split(".").pop().toLowerCase()],
};
const escapeHtml = (value) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const siteDetailsInHtml = {
  name: "site-details-in-html",
  transformIndexHtml: (html) =>
    html
      // "<" is escaped so nothing in the content can close the script tag.
      .replace("{{personJson}}", () => JSON.stringify(person, null, 2).replace(/</g, "\\u003c"))
      .replace(/\{\{(\w+)\}\}/g, (match, key) => (key in head ? escapeHtml(head[key]) : match)),
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), privacyPageInDev, siteDetailsInHtml],
  base: "/",
  publicDir,
  resolve: {
    alias: { "@content": contentDir },
  },
  server: {
    // The content folder may be outside this repository.
    fs: { allow: [root, contentDir] },
  },
  define: {
    // react-google-recaptcha still references `global`
    global: "globalThis",
    // Shared by the client and pre-render builds so date-based text hydrates identically
    "import.meta.env.VITE_BUILD_TIME": JSON.stringify(process.env.VITE_BUILD_TIME || new Date().toISOString()),
  },
  build: {
    target: "es2022",
  },
});
