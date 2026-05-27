import React, { useEffect, useMemo, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { gsap } from "gsap";
import { ScrollTrigger, TextPlugin } from "gsap/all";
import Lenis from "lenis";

const HERO_SUMMARY_TEXT =
  "Full-Stack Software Engineer with 5+ years of experience designing and implementing enterprise solutions. Currently pursuing M.Sc. in Artificial Intelligence in Germany.";

const Hero = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const professionalProfiles = useMemo(
    () => [
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/abdullahrather",
        description: "Professional network & career highlights",
        icon: (
          <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
          </svg>
        ),
        color: "bg-[#0077b5] hover:bg-[#005885]",
        textColor: "text-white",
      },
      {
        name: "GitHub",
        url: "https://github.com/abdullahrather",
        description: "Open source projects & code repositories",
        icon: (
          <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
          </svg>
        ),
        color: "bg-[#333] hover:bg-[#24292e]",
        textColor: "text-white",
      },
      {
        name: "Xing",
        url: "https://www.xing.com/profile/Abdullah_Rather",
        description: "German professional network",
        icon: (
          <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 90 90'>
            <path d='M 13.677 17.774 c -0.782 0 -1.44 0.274 -1.77 0.811 c -0.342 0.555 -0.289 1.269 0.074 1.991 l 8.776 15.193 c 0.015 0.029 0.015 0.047 0 0.074 L 6.966 60.181 c -0.36 0.717 -0.342 1.437 0 1.991 c 0.33 0.534 0.915 0.885 1.696 0.885 h 12.98 c 1.941 0 2.876 -1.31 3.54 -2.508 c 0 0 13.488 -23.854 14.013 -24.78 c -0.053 -0.086 -8.924 -15.561 -8.924 -15.561 c -0.646 -1.151 -1.623 -2.434 -3.614 -2.434 H 13.677 z' />
            <path d='M 68.208 0 c -1.938 0 -2.779 1.221 -3.475 2.472 c 0 0 -27.963 49.59 -28.884 51.219 c 0.047 0.089 18.444 33.837 18.444 33.837 C 54.936 88.678 55.93 90 57.919 90 h 12.966 c 0.782 0 1.392 -0.295 1.723 -0.829 c 0.345 -0.555 0.336 -1.286 -0.027 -2.006 L 54.281 53.732 c -0.018 -0.027 -0.018 -0.059 0 -0.085 L 83.02 2.832 c 0.36 -0.717 0.369 -1.449 0.027 -2.003 C 82.717 0.295 82.103 0 81.321 0 H 68.208 z' />
          </svg>
        ),
        color: "bg-[#026466] hover:bg-[#014a4c]",
        textColor: "text-white",
      },
      {
        name: "Email",
        url: "mailto:abdullahrather19@gmail.com",
        description: "Direct professional contact",
        icon: (
          <svg
            className='w-8 h-8'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
            />
          </svg>
        ),
        color: "bg-[#ea4335] hover:bg-[#d23924]",
        textColor: "text-white",
      },
    ],
    []
  );

  const openProfileModal = () => {
    setIsProfileModalOpen(true);

    const scrollY = window.scrollY || window.pageYOffset;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
  };

  const closeProfileModal = () => {
    const savedY = parseInt(document.body.style.top || "0", 10) * -1;
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    window.scrollTo(0, savedY);
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = "";
    });

    setIsProfileModalOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isProfileModalOpen) {
        closeProfileModal();
      }
    };

    if (isProfileModalOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isProfileModalOpen]);

  useEffect(() => {
    if (!isProfileModalOpen) return;
    const modalBody = document.querySelector(".modal-body");
    if (!modalBody) return;

    const stop = (e) => e.stopPropagation();
    modalBody.addEventListener("wheel", stop, { passive: false });

    return () => {
      modalBody.removeEventListener("wheel", stop);
    };
  }, [isProfileModalOpen]);

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

    const heroAvatar = document.getElementById("heroAvatar");
    const heroTitle = document.getElementById("heroTitle");
    const heroSummary = document.getElementById("heroSummary");
    const heroBadges = document.getElementById("heroBadges");

    const slideIn = (target, delay = 0) => {
      if (!target) return;
      gsap.to(target, {
        scrollTrigger: {
          trigger: target,
          start: isMobile ? "top 95%" : "top 90%",
        },
        opacity: 1,
        y: 0,
        duration: 0.4,
        delay,
      });
    };

    if (heroAvatar) {
      gsap.to(heroAvatar, {
        scrollTrigger: {
          trigger: heroAvatar,
          start: isMobile ? "top 95%" : "top 90%",
        },
        opacity: 1,
        x: 0,
        duration: 0.4,
      });
    }

    slideIn(heroTitle);
    slideIn(heroBadges, 0.2);

    if (heroSummary) {
      const summaryTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroSummary,
          start: isMobile ? "top 95%" : "top 90%",
        },
      });

      summaryTimeline.to(heroSummary, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });

      summaryTimeline.to(
        heroSummary,
        {
          text: {
            value: HERO_SUMMARY_TEXT,
            delimiter: "",
          },
          duration: isMobile ? 1.0 : 1.5,
          ease: "none",
        },
        "+=0.05"
      );
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

  return (
    <>
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
        <div className='mx-auto w-full max-w-6xl'>
          <div className='grid items-center gap-12 lg:grid-cols-2'>
            <div className='flex justify-center lg:justify-start'>
              <div
                id='heroAvatar'
                className='w-full max-w-xs sm:max-w-sm md:max-w-md opacity-0 transform -translate-x-6'
              >
                <div className='relative w-full rounded-3xl rounded-b-none border border-white/40 dark:border-slate-700/40 border-b-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-lg shadow-lg shadow-indigo-500/5 p-4 sm:p-6'>
                  <div className='relative flex items-center justify-center'>
                    <div
                      className='profile-avatar-large relative inline-block cursor-pointer group'
                      onClick={openProfileModal}
                      title='View Professional Profiles'
                    >
                      <div className='absolute -inset-6 rounded-full bg-indigo-200/40 dark:bg-indigo-800/30 blur-2xl -z-10'></div>
                      <div className='w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-50 to-purple-100 dark:from-indigo-900 dark:via-purple-900 dark:to-purple-800 p-2 shadow-2xl transition-all duration-300 group-hover:shadow-3xl'>
                        <div className='w-full h-full rounded-full overflow-hidden bg-white dark:bg-slate-800 ring-4 ring-white/50 dark:ring-slate-700/50 group-hover:ring-indigo-300 dark:group-hover:ring-indigo-600 transition-all duration-300'>
                          <img
                            src='/images/profile-avatar.png'
                            alt='Abdullah Rather'
                            className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div
                            className='w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold'
                            style={{ display: "none" }}
                          >
                            AR
                          </div>
                        </div>

                        <div className='absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
                          <div className='rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-2 shadow-lg ring-1 ring-white/70 dark:ring-slate-700/70'>
                            <svg
                              className='w-5 h-5 text-indigo-600 dark:text-indigo-400'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className='profile-status absolute bottom-2 right-2 md:bottom-4 md:right-4'>
                        <div className='relative'>
                          <div className='w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-slate-800'></div>
                          <div className='absolute inset-0 w-6 h-6 bg-green-400 rounded-full animate-ping opacity-75'></div>
                        </div>
                      </div>

                      <div className='absolute -inset-4 pointer-events-none'>
                        <div
                          className='absolute top-4 left-4 w-2 h-2 bg-indigo-400 rounded-full animate-bounce'
                          style={{ animationDelay: "0s", animationDuration: "2s" }}
                        ></div>
                        <div
                          className='absolute top-8 right-8 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce'
                          style={{
                            animationDelay: "0.5s",
                            animationDuration: "2.5s",
                          }}
                        ></div>
                        <div
                          className='absolute bottom-8 left-8 w-1 h-1 bg-indigo-300 rounded-full animate-bounce'
                          style={{ animationDelay: "1s", animationDuration: "3s" }}
                        ></div>
                        <div
                          className='absolute bottom-4 right-12 w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce'
                          style={{
                            animationDelay: "1.5s",
                            animationDuration: "2.8s",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='w-full rounded-3xl rounded-t-none border border-indigo-700 dark:border-indigo-200 border-t-0 bg-indigo-600 dark:bg-indigo-200 px-4 py-4 text-center shadow-lg shadow-indigo-500/10'>
                  <p className='text-lg font-semibold text-white dark:text-slate-900'>
                    Abdullah Rather
                  </p>
                  <p className='text-sm text-indigo-100 dark:text-slate-700'>
                    Full-Stack Software Engineer
                  </p>
                </div>
              </div>
            </div>

            <div className='space-y-6 text-center lg:text-left rounded-3xl border border-white/40 dark:border-slate-700/40 bg-white/40 dark:bg-slate-900/40 backdrop-blur-lg shadow-lg shadow-indigo-500/5 px-6 py-8 sm:px-8'>
              <h1
                id='heroTitle'
                className='text-4xl md:text-6xl font-extrabold mb-6 opacity-0 transform translate-y-6 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-white dark:via-indigo-100 dark:to-white bg-clip-text text-transparent'
              >
                About Me
              </h1>

              <div className='max-w-2xl mx-auto lg:mx-0'>
                <p
                  id='heroSummary'
                  className='text-lg md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium opacity-0 transform translate-y-4'
                >
                </p>
              </div>

              <div
                id='heroBadges'
                className='flex flex-wrap justify-center lg:justify-start gap-3 mt-8 opacity-0 transform translate-y-3'
              >
                <span className='inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200'>
                  <svg
                    className='w-4 h-4 mr-2'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                  5+ Years Experience
                </span>
                <span className='inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200'>
                  <svg
                    className='w-4 h-4 mr-2'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z' />
                  </svg>
                  M.Sc. AI Student
                </span>
                <span className='inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'>
                  <svg
                    className='w-4 h-4 mr-2'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Based in Germany
                </span>
              </div>

              <div className='mt-10 flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4'>
                <ScrollLink
                  to='projects'
                  smooth
                  duration={500}
                  className='btn-primary group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 hover:translate-y-[-2px] cursor-pointer'
                >
                  <span className='absolute inset-0 rounded-full bg-indigo-700 opacity-0 transition-opacity group-hover:opacity-10'></span>
                  View Projects
                </ScrollLink>
                <ScrollLink
                  to='about'
                  smooth
                  duration={500}
                  className='rounded-full bg-white/60 px-8 py-3 text-base font-semibold text-slate-800 ring-1 ring-slate-300 backdrop-blur transition-all duration-300 hover:bg-white/80 hover:shadow-lg hover:translate-y-[-2px] dark:bg-slate-800/60 dark:text-slate-100 dark:ring-slate-600 cursor-pointer'
                >
                  My Journey
                </ScrollLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isProfileModalOpen && (
        <div
          className='modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm'
          onClick={closeProfileModal}
          onWheel={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
        >
          <div
            className='bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700'>
              <div className='flex items-center space-x-4'>
                <div className='w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-800 p-1'>
                  <img
                    src='/images/profile-avatar.png'
                    alt='Abdullah Rather'
                    className='w-full h-full object-cover rounded-full'
                  />
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-slate-900 dark:text-white'>
                    Professional Profiles
                  </h2>
                  <p className='text-slate-600 dark:text-slate-300 text-sm'>
                    Connect with me on various platforms
                  </p>
                </div>
              </div>
              <button
                onClick={closeProfileModal}
                className='p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors'
              >
                <svg
                  className='h-6 w-6 text-slate-600 dark:text-slate-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            <div className='overflow-y-auto max-h-[calc(90vh-140px)] modal-body'>
              <div className='p-6'>
                <div className='grid gap-4'>
                  {professionalProfiles.map((profile, index) => (
                    <a
                      key={index}
                      href={profile.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={`group flex items-center p-4 rounded-xl transition-all duration-300 ${profile.color} ${profile.textColor} hover:scale-105 hover:shadow-lg transform`}
                    >
                      <div className='flex-shrink-0 mr-4'>{profile.icon}</div>
                      <div className='flex-1'>
                        <h3 className='text-lg font-semibold mb-1'>
                          {profile.name}
                        </h3>
                        <p className='text-sm opacity-90'>
                          {profile.description}
                        </p>
                      </div>
                      <div className='flex-shrink-0 ml-4'>
                        <svg
                          className='w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                          />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>

                <div className='mt-6 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl'>
                  <div className='flex items-start space-x-3'>
                    <svg
                      className='w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <div>
                      <h4 className='font-semibold text-slate-900 dark:text-white mb-1'>
                        Let's Connect!
                      </h4>
                      <p className='text-sm text-slate-600 dark:text-slate-300'>
                        I'm always open to discussing new opportunities,
                        collaborations, or just connecting with fellow
                        developers. Feel free to reach out through any of these
                        platforms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
