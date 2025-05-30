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

    // Hero headline animation with SplitType
    const heroHeadline = document.getElementById("heroHeadline");
    const heroSubline = document.getElementById("heroSubline");
    const heroButtons = document.getElementById("heroButtons");

    if (heroHeadline && heroSubline && heroButtons) {
      // Ensure elements are visible before animation
      gsap.set([heroHeadline, heroSubline, heroButtons], { opacity: 1 });

      setTimeout(() => {
        // Split text animation
        const split = new SplitType(heroHeadline, {
          types: "chars",
          tagName: "span",
        });

        gsap.fromTo(
          split.chars,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.02,
            duration: 0.8,
            ease: "back.out(1.4)",
          }
        );

        // Subline typing effect
        gsap.set(heroSubline, { opacity: 1 });

        gsap.to(heroSubline, {
          delay: 1.2,
          text: {
            value:
              "Bridging the gap between complex business requirements and scalable software solutions with expertise in enterprise systems and AI integration.",
            delimiter: "",
          },
          duration: 2.5,
          ease: "none",
        });

        // Buttons animation
        gsap.fromTo(
          heroButtons,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 2.5,
          }
        );
      }, 300);
    }

    // Enhanced floating animation for background shapes (reduced intensity for mobile)
    const animationIntensity = isMobile ? 0.5 : 1;

    gsap.to(".shape-1", {
      x: `${20 * animationIntensity}%`,
      y: `${15 * animationIntensity}%`,
      rotation: 25 * animationIntensity,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    gsap.to(".shape-2", {
      x: `${-18 * animationIntensity}%`,
      y: `${-16 * animationIntensity}%`,
      rotation: -20 * animationIntensity,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: 0.2,
    });

    gsap.to(".shape-3", {
      x: `${16 * animationIntensity}%`,
      y: `${-12 * animationIntensity}%`,
      rotation: 18 * animationIntensity,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: 0.4,
    });

    // Desktop-only additional animations
    if (!isMobile) {
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
        <div className="animated-shape shape-4 hidden md:block"></div>
        <div className="animated-shape shape-5 hidden md:block"></div>
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
