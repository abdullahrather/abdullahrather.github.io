import { useCallback, useEffect, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import WorkExperience from "./components/WorkExperience";
import Expertise from "./components/Expertise";
import Projects from "./components/Projects";
import Activity from "./components/Activity";
import Contact from "./components/Contact";
import CaseStudy from "./components/CaseStudy";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import Toaster from "./components/Toaster";
import ConsentBanner from "./components/ConsentBanner";
import { useSectionTracking } from "./lib/analytics";
import { useTranslation } from "./lib/i18n";
import { RouteContext } from "./lib/route";
import { NAME, SECTIONS } from "./lib/site";

const TRACKED_SECTIONS = ["top", ...SECTIONS.map((s) => s.id), "activity"];

/** Fixed decorative backdrop: fading grid, accent glow and film grain. */
const Backdrop = () => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="bg-grid absolute inset-0" />
    <div className="absolute -top-48 left-1/2 h-144 w-240 -translate-x-1/2 rounded-full bg-accent/20 blur-[120px] dark:bg-accent/15" />
    <div className="absolute -top-24 -right-40 h-96 w-120 rounded-full bg-accent-2/15 blur-[120px] dark:bg-accent-2/10" />
    <div className="bg-noise absolute inset-0" />
  </div>
);

const HOME = { page: "home" };
const SOFT_HYPHEN = String.fromCharCode(0xad);

function App({ route = HOME }) {
  const { t } = useTranslation();
  const [commandOpen, setCommandOpen] = useState(false);
  const openCommand = useCallback(() => setCommandOpen(true), []);
  useSectionTracking(TRACKED_SECTIONS);

  const study = route.page === "study" ? (t("projects.items") || []).find((p) => p.slug === route.slug) : null;

  // The tab title and description follow the page and language; the built HTML holds the English ones.
  // Long German titles carry soft hyphens for the page; the tab title is plain text.
  const title = study ? `${study.title.replaceAll(SOFT_HYPHEN, "")} — ${NAME}` : t("ui.meta.title");
  const description = study ? study.study.tagline : t("ui.meta.description");
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);

  return (
    <RouteContext value={route}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        {t("ui.skip")}
      </a>
      <Backdrop />
      <Nav onOpenCommand={openCommand} />
      <main id="main">
        {study ? (
          <CaseStudy project={study} />
        ) : (
          <>
            <Hero />
            <About />
            <WorkExperience />
            <Expertise />
            <Projects />
            <Activity />
            <Contact />
          </>
        )}
      </main>
      <Footer />
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
      <Toaster />
      <ConsentBanner />
    </RouteContext>
  );
}

export default App;
