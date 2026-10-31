import facts from "../data/facts.json";

/**
 * Adds language-independent facts (dates, links, images, icons) to a locale, so they are
 * edited once in src/data/facts.json. Lists match by position; projects match by id.
 */
export const withFacts = (locale) => ({
  ...locale,
  workExperience: {
    ...locale.workExperience,
    entries: locale.workExperience.entries.map((entry, i) => ({ ...entry, ...facts.experience[i] })),
  },
  expertise: {
    ...locale.expertise,
    items: locale.expertise.items.map((item, i) => ({ ...item, ...facts.expertise[i] })),
  },
  contact: {
    ...locale.contact,
    contact_info: locale.contact.contact_info.map((item, i) => ({ ...item, ...facts.contactInfo[i] })),
  },
  projects: {
    ...locale.projects,
    items: locale.projects.items.map((item) => ({ ...item, ...facts.projects.find((p) => p.id === item.id) })),
  },
});
