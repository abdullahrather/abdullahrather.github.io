// Catches content mistakes that lint and the build can't see.
import fs from "node:fs";
import path from "node:path";

const read = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const en = read("src/languages/en.json");
const de = read("src/languages/de.json");
const facts = read("src/data/facts.json");
const errors = [];

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

const placeholders = (text) => [...String(text).matchAll(/\{\s*(\w+)\s*\}/g)].map((m) => m[1]).sort().join();
for (const [key, value] of enLeaves) {
  if (deLeaves.has(key) && placeholders(value) !== placeholders(deLeaves.get(key))) {
    errors.push(`Different placeholders at ${key}`);
  }
}

// Every translation key used in the code must exist.
const source = walk("src").filter((file) => /\.jsx?$/.test(file));
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

const ids = new Set(en.projects.items.map((project) => project.id));
for (const project of facts.projects) {
  if (!ids.has(project.id)) errors.push(`Project ${project.id} has no translated text`);
  for (const image of [project.image, project.image.replace(/\.webp$/, "-640.webp")]) {
    if (!fs.existsSync(path.join("public", image))) errors.push(`Missing image: public${image}`);
  }
}

for (const entry of facts.experience) {
  for (const date of [entry.startDate, entry.endDate]) {
    if (date !== null && !/^\d{4}-\d{2}-\d{2}$/.test(date)) errors.push(`Bad date for ${entry.company}: ${date}`);
  }
}

for (const file of ["public/assets/Resume.pdf", "public/assets/Resume_de.pdf"]) {
  if (!fs.existsSync(file)) errors.push(`Missing file: ${file}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`\n${errors.length} content problem(s) found.`);
  process.exit(1);
}
console.log(`Content OK: ${enLeaves.size} translated values, ${facts.projects.length} projects.`);
