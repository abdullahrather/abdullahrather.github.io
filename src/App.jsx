import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import LoadingScreen from "./components/LoadingScreen";
import "./styles.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simple, reliable loading timer - one loading experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds total for complete dynamic loading experience

    return () => clearTimeout(timer);
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadComplete={handleLoadComplete} />;
  }

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
