// Facts shared across sections, from the content folder's site.json.
// Translatable copy lives in the content folder's en.json and de.json.
import site from "@content/site.json";

export const SITE = site;
export const NAME = site.name;
export const EMAIL = site.email;
export const TIMEZONE = site.timezone;
export const SOCIALS = site.socials;
export const STACK = site.stack;

export const SECTIONS = [
  { id: "about", key: "ui.nav.about" },
  { id: "experience", key: "ui.nav.experience" },
  { id: "expertise", key: "ui.nav.expertise" },
  { id: "projects", key: "ui.nav.projects" },
  { id: "contact", key: "ui.nav.contact" },
];

/** The resume in the visitor's language, or the English one when there is no other. */
export const getResume = (lang) => site.resume[lang] ?? site.resume.en;

/** A project repo is private when it has no public GitHub link of its own. */
export const isPrivateRepo = (url) => !url || url === "#" || url === `https://github.com/${site.github}`;
