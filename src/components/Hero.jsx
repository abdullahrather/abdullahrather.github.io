import React, { useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { gsap } from "gsap";
import { ScrollTrigger, TextPlugin } from "gsap/all";
import Lenis from "lenis";
import SplitType from "split-type";

const Hero = () => {
  useEffect(() => {
    // Initialize GSAP animations when component mounts
    const initializeAnimations = () => {
      if (typeof gsap !== "undefined" && typeof SplitType !== "undefined") {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger, TextPlugin);

        // Initialize Lenis smooth scrolling
        const lenis = new Lenis({
          lerp: 0.01,
          wheelMultiplier: 1.2,
          smoothWheel: false,
          smoothTouch: false,
          syncTouch: true,
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Hero headline animation with SplitType
        const heroHeadline = document.getElementById("heroHeadline");
        const heroSubline = document.getElementById("heroSubline");
        const heroButtons = document.getElementById("heroButtons");

        if (heroHeadline && heroSubline && heroButtons) {
          setTimeout(() => {
            const headlineSplit = new SplitType(heroHeadline, {
              types: "words, chars",
            });

            gsap.set(heroHeadline, { opacity: 1 });
            gsap.from(headlineSplit.chars, {
              opacity: 0,
              y: 100,
              rotateX: -90,
              stagger: 0.02,
              duration: 0.8,
              ease: "back.out(1.7)",
            });

            // Subline typing animation
            gsap.to(heroSubline, {
              delay: 0.5,
              opacity: 1,
              duration: 0.5,
            });

            gsap.to(heroSubline, {
              delay: 0.7,
              text: {
                value:
                  "Full-Stack Developer & AI Enthusiast building scalable solutions with modern technologies.",
                delimiter: "",
              },
              duration: 2,
              ease: "none",
            });

            // Button fade in
            gsap.to(heroButtons, {
              delay: 2.5,
              opacity: 1,
              duration: 0.8,
            });
          }, 300);
        }

        // Enhanced floating animation for background shapes
        gsap.to(".shape-1", {
          x: "20%",
          y: "15%",
          rotation: 25,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });

        gsap.to(".shape-2", {
          x: "-18%",
          y: "-16%",
          rotation: -20,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: 0.2,
        });

        gsap.to(".shape-3", {
          x: "16%",
          y: "-12%",
          rotation: 18,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: 0.4,
        });

        // Mobile additional shapes
        if (window.innerWidth <= 768) {
          gsap.to(".shape-4", {
            x: "-15%",
            y: "12%",
            rotation: 15,
            duration: 2.4,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: 0.3,
          });

          gsap.to(".shape-5", {
            x: "12%",
            y: "-10%",
            rotation: -12,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: 0.5,
          });
        }
      }
    };

    // Wait for external scripts to load
    const checkScripts = () => {
      if (typeof gsap !== "undefined" && typeof SplitType !== "undefined") {
        initializeAnimations();
      } else {
        setTimeout(checkScripts, 100);
      }
    };

    checkScripts();
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 text-center"
    >
      {/* Animated background shapes */}
      <div className="animated-background absolute inset-0 -z-10 overflow-hidden w-full">
        <div className="animated-shape shape-1"></div>
        <div className="animated-shape shape-2"></div>
        <div className="animated-shape shape-3"></div>
        <div className="animated-shape shape-4 hidden md:block"></div>
        <div className="animated-shape shape-5 hidden md:block"></div>
      </div>

      {/* Content container */}
      <div className="mx-auto max-w-7xl">
        <h1
          id="heroHeadline"
          className="max-w-5xl mx-auto overflow-hidden text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl opacity-0"
        >
          Transform your vision into
          <br />
          <span className="text-indigo-600 dark:text-indigo-400">
            intelligent
          </span>{" "}
          solutions
        </h1>

        <p
          id="heroSubline"
          className="mt-6 max-w-xl mx-auto text-lg text-slate-600 dark:text-slate-300 opacity-0"
        ></p>

        <div
          id="heroButtons"
          className="mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-4 opacity-0"
        >
          <ScrollLink
            to="projects"
            smooth
            duration={500}
            className="btn-primary group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 hover:translate-y-[-2px] cursor-pointer"
          >
            <span className="absolute inset-0 rounded-full bg-indigo-700 opacity-0 transition-opacity group-hover:opacity-10"></span>
            View My Work
          </ScrollLink>
          <ScrollLink
            to="about"
            smooth
            duration={500}
            className="rounded-full bg-white/60 px-8 py-3 text-base font-semibold text-slate-800 ring-1 ring-slate-300 backdrop-blur transition-all duration-300 hover:bg-white/80 hover:shadow-lg hover:translate-y-[-2px] dark:bg-slate-800/60 dark:text-slate-100 dark:ring-slate-600 cursor-pointer"
          >
            Learn More
          </ScrollLink>
        </div>
      </div>
    </section>
  );
};

export default Hero;
