import { createContext, useContext } from "react";
import facts from "@content/facts.json";

// Each case study is its own pre-rendered page at /work/<slug>/ (see scripts/build.mjs).
export const STUDY_SLUGS = facts.projects.filter((p) => p.caseStudy).map((p) => p.slug);

export const studyPath = (slug) => `/work/${slug}/`;

const HOME = { page: "home" };

export const getRoute = (pathname) => {
  const slug = /^\/work\/([\w-]+)\/?$/.exec(pathname)?.[1];
  return STUDY_SLUGS.includes(slug) ? { page: "study", slug } : HOME;
};

export const RouteContext = createContext(HOME);

/** Link to a section of the home page: in place on the home page, a page load elsewhere. */
export const useSectionHref = () => {
  const { page } = useContext(RouteContext);
  return (id) => (page === "home" ? `#${id}` : id === "top" ? "/" : `/#${id}`);
};
