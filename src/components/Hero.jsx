import React, { useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { gsap } from "gsap";
import { ScrollTrigger, TextPlugin } from "gsap/all";
import Lenis from "lenis";
import SplitType from "split-type";

const Hero = () => {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Better mobile detection
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth <= 768;

    let lenis = null;

    // Only initialize Lenis on desktop
    if (!isMobile) {
      lenis = new Lenis({
        lerp: 0.06,
        wheelMultiplier: 0.8,
        smoothWheel: true,
        smoothTouch: false,
        syncTouch: false,
        touchMultiplier: 1,
        infinite: false,
        orientation: "vertical",
        gestureOrientation: "vertical",
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    // Much faster Hero animations
    const heroHeadline = document.getElementById("heroHeadline");
    const heroSubline = document.getElementById("heroSubline");
    const heroButtons = document.getElementById("heroButtons");

    if (heroHeadline && heroSubline && heroButtons) {
      // Show elements immediately without opacity animations
      gsap.set([heroHeadline, heroSubline, heroButtons], { opacity: 1 });

      // Faster split text animation (reduced from 0.8s to 0.4s)
      setTimeout(() => {
        const split = new SplitType(heroHeadline, {
          types: "chars",
          tagName: "span",
        });

        gsap.fromTo(
          split.chars,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.01, // Reduced from 0.02
            duration: 0.4, // Reduced from 0.8
            ease: "power2.out", // Faster ease
          }
        );

        // Faster typing effect (reduced from 2.5s to 1.2s)
        gsap.to(heroSubline, {
          delay: 0.6, // Reduced from 1.2
          text: {
            value:
              "Bridging the gap between complex business requirements and scalable software solutions with expertise in enterprise systems and AI integration.",
            delimiter: "",
          },
          duration: 1.2, // Reduced from 2.5
          ease: "none",
        });

        // Faster buttons animation
        gsap.fromTo(
          heroButtons,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4, // Reduced from 0.8
            delay: 1.8, // Reduced from 2.5
          }
        );
      }, 100); // Reduced from 300ms
    }

    // Reduced animation intensity for better performance
    const animationIntensity = isMobile ? 0.3 : 0.6; // Reduced intensity

    gsap.to(".shape-1", {
      x: `${15 * animationIntensity}%`,
      y: `${12 * animationIntensity}%`,
      rotation: 20 * animationIntensity,
      duration: 3, // Slower, less distracting
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    gsap.to(".shape-2", {
      x: `${-12 * animationIntensity}%`,
      y: `${-10 * animationIntensity}%`,
      rotation: -15 * animationIntensity,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 0.2,
    });

    gsap.to(".shape-3", {
      x: `${10 * animationIntensity}%`,
      y: `${-8 * animationIntensity}%`,
      rotation: 12 * animationIntensity,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 0.4,
    });

    // Cleanup function
    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
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
      </div>

      {/* Content container */}
      <div className="mx-auto max-w-7xl">
        <h1
          id="heroHeadline"
          className="max-w-5xl mx-auto overflow-hidden text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
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
          className="mt-6 max-w-xl mx-auto text-lg text-slate-600 dark:text-slate-300"
        ></p>

        <div
          id="heroButtons"
          className="mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-4"
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
