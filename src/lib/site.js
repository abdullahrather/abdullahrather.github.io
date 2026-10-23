// Facts shared across sections. Translatable copy lives in src/languages/*.json.

export const EMAIL = "abdullahrather19@gmail.com";
export const TIMEZONE = "Europe/Berlin";

export const SOCIALS = [
  { id: "github", name: "GitHub", url: "https://github.com/abdullahrather", handle: "@abdullahrather" },
  { id: "linkedin", name: "LinkedIn", url: "https://linkedin.com/in/abdullahrather", handle: "in/abdullahrather" },
  { id: "xing", name: "Xing", url: "https://www.xing.com/profile/Abdullah_Rather", handle: "Abdullah_Rather" },
];

export const STACK = [
  "PHP", "Yii", "Laravel", "Symfony", "MySQL", "MariaDB", "PostgreSQL", "LLM APIs", "REST APIs", "DATEV",
  "Docker", "GitHub Actions", "PHPUnit", "PHPStan", "JavaScript", "TypeScript", "React", "Python", "FastAPI",
];

export const SECTIONS = [
  { id: "about", key: "ui.nav.about" },
  { id: "experience", key: "ui.nav.experience" },
  { id: "expertise", key: "ui.nav.expertise" },
  { id: "projects", key: "ui.nav.projects" },
  { id: "contact", key: "ui.nav.contact" },
];

export const getResume = (lang) =>
  lang === "de"
    ? { href: "/assets/Resume_de.pdf", fileName: "Abdullah_Rather_Lebenslauf.pdf" }
    : { href: "/assets/Resume.pdf", fileName: "Abdullah_Rather_Resume.pdf" };

/** A project repo is private when it has no public GitHub link. */
export const isPrivateRepo = (url) => !url || url === "#" || url === "https://github.com/abdullahrather";
