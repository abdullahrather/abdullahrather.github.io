import React, { useCallback, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import WorkExperience from "./components/WorkExperience";
import Expertise from "./components/Expertise";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import Toaster from "./components/Toaster";
import { useTranslation } from "./lib/i18n";

/** Fixed decorative backdrop: fading grid, accent glow and film grain. */
const Backdrop = () => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="bg-grid absolute inset-0" />
    <div className="absolute -top-48 left-1/2 h-144 w-240 -translate-x-1/2 rounded-full bg-accent/20 blur-[120px] dark:bg-accent/15" />
    <div className="absolute -top-24 -right-40 h-96 w-120 rounded-full bg-accent-2/15 blur-[120px] dark:bg-accent-2/10" />
    <div className="bg-noise absolute inset-0" />
  </div>
);

function App() {
  const { t } = useTranslation();
  const [commandOpen, setCommandOpen] = useState(false);
  const openCommand = useCallback(() => setCommandOpen(true), []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        {t("ui.skip")}
      </a>
      <Backdrop />
      <Nav onOpenCommand={openCommand} />
      <main id="main">
        <Hero />
        <About />
        <WorkExperience />
        <Expertise />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
      <Toaster />
    </>
  );
}

export default App;
