// Catches content mistakes that lint and the build can't see, in the content folder
// (content/, or the folder CONTENT_DIR names).
import fs from "node:fs";
import path from "node:path";
import { contentDir, publicDir, readContent, root } from "./content.mjs";

const en = readContent("en.json");
const de = readContent("de.json");
const facts = readContent("facts.json");
const site = readContent("site.json");
const errors = [];

/** Whether a site address such as /images/a.webp exists in the content folder's public files. */
const published = (address) => fs.existsSync(path.join(publicDir, address));

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });

const leaves = (value, prefix = "") => {
  if (value === null || typeof value !== "object") return [[prefix, value]];
  return Object.entries(value).flatMap(([key, child]) => leaves(child, prefix ? `${prefix}.${key}` : key));
};

// Both languages must have the same keys, list lengths and {placeholders}.
const enLeaves = new Map(leaves(en));
const deLeaves = new Map(leaves(de));
for (const key of enLeaves.keys()) if (!deLeaves.has(key)) errors.push(`Missing in de.json: ${key}`);
for (const key of deLeaves.keys()) if (!enLeaves.has(key)) errors.push(`Missing in en.json: ${key}`);

const placeholders = (text) =>
  [...String(text).matchAll(/\{\s*(\w+)\s*\}/g)]
    .map((m) => m[1])
    .sort()
    .join();
for (const [key, value] of enLeaves) {
  if (deLeaves.has(key) && placeholders(value) !== placeholders(deLeaves.get(key))) {
    errors.push(`Different placeholders at ${key}`);
  }
}

// Every translation key used in the code must exist.
const source = walk(path.join(root, "src")).filter((file) => /\.jsx?$/.test(file));
for (const file of source) {
  const code = fs.readFileSync(file, "utf8");
  const used = [...code.matchAll(/\bt\("([\w.]+)"/g), ...code.matchAll(/\bkey: "(ui\.[\w.]+)"/g)];
  for (const [, key] of used) {
    const found = key.split(".").reduce((node, part) => node?.[part], en);
    if (found === undefined) errors.push(`${file} uses a missing key: ${key}`);
  }
}

// Shared facts must line up with the translated lists.
const compare = (name, factList, textList) => {
  if (factList.length !== textList.length) {
    errors.push(`${name}: ${factList.length} facts but ${textList.length} translated entries`);
  }
};
compare("experience", facts.experience, en.workExperience.entries);
compare("expertise", facts.expertise, en.expertise.items);
compare("contact info", facts.contactInfo, en.contact.contact_info);
compare("projects", facts.projects, en.projects.items);

// A project is shown as a screenshot (`shot`) or as a drawn schematic (`cover`).
const covers = new Set(
  [...fs.readFileSync(path.join(root, "src/components/Cover.jsx"), "utf8").matchAll(/^ {2}(\w+): \($/gm)].map(
    (match) => match[1],
  ),
);
const slugs = new Set();
for (const project of facts.projects) {
  const text = en.projects.items.find((item) => item.id === project.id);
  if (!text) errors.push(`Project ${project.id} has no translated text`);
  if (!project.slug || slugs.has(project.slug)) errors.push(`Project ${project.id} needs its own slug`);
  slugs.add(project.slug);

  if (!project.shot && !covers.has(project.cover)) errors.push(`Project ${project.slug} has no picture`);
  for (const image of [project.shot, ...(project.screens ?? [])].filter(Boolean)) {
    for (const file of [image, image.replace(/\.webp$/, "-640.webp")]) {
      if (!published(file)) errors.push(`Missing image: public${file}`);
    }
  }

  // A case study is its own page: it needs its text and a caption per screenshot.
  if (Boolean(project.caseStudy) !== Boolean(text?.study)) {
    errors.push(`Project ${project.slug}: caseStudy and its study text must go together`);
  } else if (project.caseStudy) {
    if (project.screens.length !== text.study.screens.length) {
      errors.push(
        `Project ${project.slug}: ${project.screens.length} screenshots but ${text.study.screens.length} captions`,
      );
    }
  }
}

for (const entry of facts.experience) {
  for (const date of [entry.startDate, entry.endDate]) {
    if (date !== null && !/^\d{4}-\d{2}-\d{2}$/.test(date)) errors.push(`Bad date for ${entry.company}: ${date}`);
  }
}

// Site settings: the address, the files they point to, and the parts the code relies on.
if (!/^https:\/\/[^/]+$/.test(site.url)) errors.push(`site.json: url must look like https://example.com: ${site.url}`);
if (!/^\d{4}-\d{2}-\d{2}$/.test(site.careerStart)) errors.push(`site.json: bad careerStart: ${site.careerStart}`);
if (site.stats?.length !== 3) errors.push("site.json: stats needs three numbers");
try {
  new Intl.DateTimeFormat("en", { timeZone: site.timezone });
} catch {
  errors.push(`site.json: unknown timezone: ${site.timezone}`);
}
for (const file of [site.portrait, site.socialImage, ...Object.values(site.resume).map((resume) => resume.href)]) {
  if (!published(file)) errors.push(`Missing file: public${file}`);
}
for (const file of ["site.webmanifest", "privacy/index.html"]) {
  if (!published(`/${file}`)) errors.push(`Missing file: public/${file}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`\n${errors.length} content problem(s) found.`);
  process.exit(1);
}
console.log(
  `Content OK in ${path.relative(root, contentDir) || "."}: ${enLeaves.size} translated values, ${facts.projects.length} projects.`,
);
