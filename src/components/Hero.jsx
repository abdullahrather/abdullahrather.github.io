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

    // 🎯 KEEP: Hero animations on BOTH desktop and mobile
    const heroHeadline = document.getElementById("heroHeadline");
    const heroSubline = document.getElementById("heroSubline");
    const heroButtons = document.getElementById("heroButtons");

    if (heroHeadline && heroSubline && heroButtons) {
      // Show elements immediately
      gsap.set([heroHeadline, heroSubline, heroButtons], { opacity: 1 });

      // 🎯 KEEP: Run animations on BOTH desktop AND mobile
      setTimeout(() => {
        // Split text animation - "Transform your vision into intelligent solutions"
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
            stagger: 0.01,
            duration: 0.4,
            ease: "power2.out",
          }
        );

        gsap.to(heroSubline, {
          delay: 0.6,
          text: {
            value:
              "Bridging the gap between complex business requirements and scalable software solutions with expertise in enterprise systems and AI integration.",
            delimiter: "",
          },
          duration: 1.2,
          ease: "none",
          onComplete: () => {
            // Add blinking cursor after typing is complete
            const cursor = document.createElement("span");
            cursor.textContent = "|";
            cursor.className = "typing-cursor";
            heroSubline.appendChild(cursor);

            // Animate cursor blinking
            gsap.to(cursor, {
              opacity: 0,
              duration: 0.8,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
            });
          },
        });

        // Buttons animation
        gsap.fromTo(
          heroButtons,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            delay: 1.8,
          }
        );
      }, 100);
    }

    const animationIntensity = isMobile ? 0.5 : 1;

    // Create parallax effect on scroll
    ScrollTrigger.create({
      trigger: "#hero",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const shapes = document.querySelectorAll(".animated-shape");

        shapes.forEach((shape, index) => {
          const speed = (index + 1) * 0.5;
          const yMovement = progress * 100 * speed;

          gsap.set(shape, {
            y: `${yMovement}px`,
            rotation: progress * 360 * (index + 1) * 0.2,
          });
        });
      },
    });

    gsap.to(".shape-1", {
      x: `${15 * animationIntensity}%`,
      y: `${12 * animationIntensity}%`,
      rotation: 20 * animationIntensity,
      duration: 3,
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

    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "particle";

      // Random size between 2-6px
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Random horizontal position
      particle.style.left = `${Math.random() * 100}%`;

      // Random animation duration
      particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;

      return particle;
    };

    // Create particles container if it doesn't exist
    let particlesContainer = document.querySelector(".particles-container");
    if (!particlesContainer) {
      particlesContainer = document.createElement("div");
      particlesContainer.className = "particles-container";
      document
        .querySelector("#hero .animated-background")
        .appendChild(particlesContainer);
    }

    // Create initial particles
    for (let i = 0; i < 50; i++) {
      particlesContainer.appendChild(createParticle());
    }

    // Continuously add particles
    const particleInterval = setInterval(() => {
      if (particlesContainer.children.length < 50) {
        particlesContainer.appendChild(createParticle());
      }

      // Remove old particles
      Array.from(particlesContainer.children).forEach((particle) => {
        if (particle.offsetTop < -100) {
          particle.remove();
        }
      });
    }, 2000);

    // Cleanup function
    return () => {
      if (lenis) {
        lenis.destroy();
      }
      // Clean up particle interval
      if (particleInterval) {
        clearInterval(particleInterval);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const headline = document.getElementById("heroHeadline");
      if (!headline) return;

      headline.innerHTML = `
      Transform your vision into
      <br />
      <span class='text-indigo-600 dark:text-indigo-400'>
        intelligent
      </span> solutions
    `;

      if (window.innerWidth <= 640) {
        headline.innerHTML = `
        <span style="display: inline-block; white-space: nowrap;">Transform your</span>
        <span style="display: inline-block; white-space: nowrap;"> vision into</span>
        <br />
        <span class='text-indigo-600 dark:text-indigo-400' style="display: inline-block; white-space: nowrap;">intelligent</span>
        <span style="display: inline-block; white-space: nowrap;"> solutions</span>
      `;
      }
    };

    // Run on mount and resize
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id='hero'
      className='relative min-h-[85vh] flex flex-col items-center justify-center px-6 text-center'
    >
      {/* 🎯 KEEP: Animated background shapes */}
      <div className='animated-background absolute inset-0 -z-10 overflow-hidden w-full'>
        <div className='animated-shape shape-1'></div>
        <div className='animated-shape shape-2'></div>
        <div className='animated-shape shape-3'></div>
      </div>

      {/* Content container */}
      <div className='mx-auto max-w-7xl'>
        <h1
          id='heroHeadline'
          className='max-w-5xl mx-auto text-5xl font-extrabold leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl pb-2'
        >
          Transform your vision into
          <br />
          <span className='text-indigo-600 dark:text-indigo-400'>
            intelligent
          </span>{" "}
          solutions
        </h1>

        <p
          id='heroSubline'
          className='mt-6 max-w-xl mx-auto text-lg text-slate-600 dark:text-slate-300'
        ></p>

        <div
          id='heroButtons'
          className='mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-4'
        >
          <ScrollLink
            to='projects'
            smooth
            duration={500}
            className='btn-primary group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 hover:translate-y-[-2px] cursor-pointer'
          >
            <span className='absolute inset-0 rounded-full bg-indigo-700 opacity-0 transition-opacity group-hover:opacity-10'></span>
            View My Work
          </ScrollLink>
          <ScrollLink
            to='about'
            smooth
            duration={500}
            className='rounded-full bg-white/60 px-8 py-3 text-base font-semibold text-slate-800 ring-1 ring-slate-300 backdrop-blur transition-all duration-300 hover:bg-white/80 hover:shadow-lg hover:translate-y-[-2px] dark:bg-slate-800/60 dark:text-slate-100 dark:ring-slate-600 cursor-pointer'
          >
            Learn More
          </ScrollLink>
        </div>
      </div>
    </section>
  );
};

export default Hero;
