import React, { useEffect } from "react";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  useEffect(() => {
    // Initialize navbar scroll effect
    const navbar = document.getElementById("navbar");

    function updateNavbar() {
      if (window.scrollY > 20) {
        navbar?.classList.add("nav-scrolled");
      } else {
        navbar?.classList.remove("nav-scrolled");
      }
    }

    window.addEventListener("scroll", updateNavbar);
    updateNavbar(); // Initialize state

    return () => {
      window.removeEventListener("scroll", updateNavbar);
    };
  }, []);

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
