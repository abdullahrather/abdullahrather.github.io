import React, { useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, TextPlugin } from "gsap/all";

const About = () => {
  const stats = [
    { number: "5+", label: "Years Experience" },
    { number: "20+", label: "Projects Completed" },
    { number: "10+", label: "Technologies Mastered" },
    { number: "24/7", label: "Support" },
  ];

  const skills = useMemo(
    () => [
      { name: "PHP & Laravel", level: 95 },
      { name: "Python & Flask", level: 88 },
      { name: "JavaScript & React", level: 85 },
      { name: "MySQL & Database Design", level: 90 },
      { name: "API Development & Integration", level: 88 },
      { name: "Git", level: 85 },
      { name: "System Architecture", level: 90 },
      { name: "Team Leadership", level: 85 },
    ],
    []
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Mobile detection
    const isMobile = window.innerWidth <= 768;

    // 🔥 ADD: About title animation (replacing motion)
    gsap.to("#aboutTitle", {
      scrollTrigger: {
        trigger: "#aboutTitle",
        start: isMobile ? "top 95%" : "top 90%",
      },
      opacity: 1,
      y: 0,
      duration: 0.4,
    });

    // 🎯 KEEP: About description typing effect
    const aboutDescription = document.getElementById("aboutDescription");
    if (aboutDescription) {
      gsap.set(aboutDescription, { opacity: 1 });

      gsap.to(aboutDescription, {
        scrollTrigger: {
          trigger: aboutDescription,
          start: isMobile ? "top 95%" : "top 90%",
        },
        delay: 0.1,
        text: {
          value:
            "Full-Stack Software Engineer with 5+ years of experience designing and implementing enterprise solutions. Currently pursuing M.Sc. in Artificial Intelligence in Germany.",
          delimiter: "",
        },
        duration: isMobile ? 1.0 : 1.5,
        ease: "none",
      });
    }

    // 🔥 ADD: Left content animation (replacing motion)
    gsap.to(".about-content-left", {
      scrollTrigger: {
        trigger: ".about-content-left",
        start: isMobile ? "top 95%" : "top 90%",
      },
      opacity: 1,
      x: 0,
      duration: 0.4,
    });

    // 🔥 ADD: Skills section animation (replacing motion)
    gsap.to(".skills-section", {
      scrollTrigger: {
        trigger: ".skills-section",
        start: isMobile ? "top 95%" : "top 90%",
      },
      opacity: 1,
      x: 0,
      duration: 0.4,
    });

    // 🔥 FIX: Replace Framer Motion with GSAP for progress bars
    gsap.utils.toArray(".skill-progress-bar").forEach((bar, index) => {
      const skillLevel = skills[index].level;

      // Set initial state
      gsap.set(bar, { width: "0%" });

      // Animate with ScrollTrigger
      gsap.to(bar, {
        scrollTrigger: {
          trigger: bar,
          start: isMobile ? "top 95%" : "top 85%", // Earlier trigger
          toggleActions: "play none none reverse", // Play on enter, reverse on leave
          refreshPriority: -1, // Lower priority to ensure it runs after other animations
        },
        width: `${skillLevel}%`,
        duration: 0.8,
        delay: index * 0.1, // Stagger animation
        ease: "power2.out",
      });
    });

    // 🔥 FIXED: Text reveal animation with consistent reveal/unreveal behavior
    const textReveal = document.querySelector("#aboutTextReveal");
    if (textReveal) {
      // Set initial state
      gsap.set("#aboutTextReveal", { opacity: 1, y: 0 });

      const words = textReveal.querySelectorAll("span");
      const totalWords = words.length;

      // 🔥 FIX: Create consistent reveal/unreveal animation
      ScrollTrigger.create({
        trigger: ".text-reveal-container",
        start: "top 80%", // Start revealing when 80% from top
        end: "bottom 20%", // Continue until 20% from bottom
        scrub: 1, // 🔥 IMPORTANT: This makes it smooth and consistent
        onUpdate: (self) => {
          const progress = self.progress;
          const wordIndex = Math.round(progress * totalWords);

          words.forEach((word, i) => {
            if (i < wordIndex) {
              word.classList.add("text-reveal-visible");
            } else {
              word.classList.remove("text-reveal-visible");
            }
          });
        },
        refreshPriority: 0, // Normal priority
        markers: false,
      });
    }

    // Stats cards - show immediately
    gsap.set(".stats-card", { opacity: 1, y: 0 });
    gsap.utils.toArray(".stats-card").forEach((card) => {
      card.classList.add("animation-complete");
    });

    // 🔥 IMPORTANT: Refresh ScrollTrigger after a short delay to handle page load scenarios
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [skills]);

  return (
    <>
      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900"
      >
        <div className="container mx-auto px-6">
          {/* 🔥 REPLACE: motion.div with regular div + GSAP animations */}
          <div className="text-center mb-16">
            <h2
              id="aboutTitle"
              className="text-4xl font-bold mb-4 opacity-0 transform translate-y-6"
            >
              About Me
            </h2>
            <p
              id="aboutDescription"
              className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
            ></p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 🔥 REPLACE: motion.div with regular div + GSAP animations */}
            <div className="about-content-left opacity-0 transform translate-x-[-30px]">
              <h3 className="text-2xl font-bold mb-6">My Journey</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                I'm a passionate Full-Stack Software Engineer specializing in
                PHP (Laravel, Yii Framework), JavaScript (React, Node.js), and
                Python (Flask, FastAPI). My expertise spans enterprise
                management systems, educational platforms, and complex API
                integrations including DATEV for German accounting standards.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Currently working as a Full-Stack Software Engineer in Germany
                while pursuing my Master's in Artificial Intelligence. I have
                led teams of 5+ developers and delivered high-quality solutions
                across diverse domains with comprehensive documentation and
                training.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="stats-card group text-center p-4 bg-white/60 dark:bg-slate-800/60 rounded-lg shadow-lg backdrop-blur ring-1 ring-white/20 dark:ring-slate-700/20 transition-all duration-300 hover:bg-slate-100/80 dark:hover:bg-slate-700/60 hover:shadow-xl hover:scale-105 cursor-pointer"
                  >
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="text-slate-600 dark:text-slate-300 text-sm group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 🔥 REPLACE: motion.div with regular div + GSAP animations */}
            <div className="skills-section opacity-0 transform translate-x-[30px]">
              <h3 className="text-2xl font-bold mb-6">Technical Expertise</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-slate-600 dark:text-slate-300">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      {/* 🔥 FIX: Replace Framer Motion with div + GSAP */}
                      <div
                        className="skill-progress-bar bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                        style={{ width: "0%" }} // Start at 0%
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-reveal-container">
            <p
              id="aboutTextReveal"
              className="text-reveal text-3xl md:text-4xl font-medium leading-relaxed"
            >
              <span>I</span>&nbsp;<span>specialize</span>&nbsp;<span>in</span>{" "}
              <span>designing</span>&nbsp;
              <span>and</span>&nbsp;<span>implementing</span>{" "}
              <span>enterprise-grade</span>&nbsp;
              <span>software</span>&nbsp;<span>solutions</span>&nbsp;
              <span>that</span> <span>solve</span>&nbsp;
              <span>complex</span>&nbsp;<span>business</span>{" "}
              <span>challenges,</span>&nbsp;<span>combining</span>&nbsp;
              <span>modern</span>&nbsp;<span>development</span>{" "}
              <span>practices</span>&nbsp;<span>with</span>&nbsp;
              <span>AI</span>&nbsp;<span>technologies</span>&nbsp;
              <span>to</span> <span>deliver</span>&nbsp;
              <span>exceptional</span>&nbsp;<span>user</span>{" "}
              <span>experiences.</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
