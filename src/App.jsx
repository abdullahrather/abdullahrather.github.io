import React, { lazy, Suspense } from "react";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import WorkExperience from "./components/WorkExperience";
import Expertise from "./components/Expertise";
import Contact from "./components/Contact";
import { ProjectsSkeleton } from "./components/SkeletonLoaders";
import "./styles.css";

// Code-split Projects — it's the heaviest section (14 cards, modal, flip logic).
// The browser won't download or parse it until Suspense triggers the load.
const Projects = lazy(() => import("./components/Projects"));

function App() {
  return (
    <Layout>
      <Hero />
      <Skills />
      <WorkExperience />
      <Expertise />
      <Suspense fallback={<ProjectsSkeleton />}>
        <Projects />
      </Suspense>
      <Contact />
    </Layout>
  );
}

export default App;

