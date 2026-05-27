import Layout from "./components/Layout";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import "./styles.css";

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
    </Layout>
  );
}

export default App;
