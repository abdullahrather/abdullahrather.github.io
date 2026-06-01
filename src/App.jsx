import Layout from "./components/Layout";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import WorkExperience from "./components/WorkExperience";
import Expertise from "./components/Expertise";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import "./styles.css";

function App() {
  return (
    <Layout>
      <Hero />
      <Skills />
      <WorkExperience />
      <Expertise />
      <Projects />
      <Contact />
    </Layout>
  );
}

export default App;
