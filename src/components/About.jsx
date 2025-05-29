import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

const About = () => {
  const stats = [
    { number: "5+", label: "Years Experience" },
    { number: "20+", label: "Projects Completed" },
    { number: "10+", label: "Technologies Mastered" },
    { number: "24/7", label: "Support" },
  ];

  const skills = [
    { name: "PHP & Laravel", level: 95 },
    { name: "Python & Flask", level: 88 },
    { name: "JavaScript & React", level: 85 },
    { name: "MySQL & Database Design", level: 90 },
    { name: "API Development & Integration", level: 88 },
    { name: "Git", level: 85 },
    { name: "System Architecture", level: 90 },
    { name: "Team Leadership", level: 85 },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const initializeTextReveal = () => {
      if (typeof gsap !== "undefined") {
        // Text reveal effect for the mission statement
        const textReveal = document.querySelector("#aboutTextReveal");

        if (textReveal) {
          // Add scroll trigger for initial reveal animation
          gsap.to("#aboutTextReveal", {
            scrollTrigger: {
              trigger: "#aboutTextReveal",
              start: "top 80%",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
          });

          // Get all words
          const words = textReveal.querySelectorAll("span");
          const totalWords = words.length;

          // Create ScrollTrigger for sequential word reveal
          ScrollTrigger.create({
            trigger: ".text-reveal-container",
            start: "top 80%",
            end: "bottom 20%",
            onUpdate: (self) => {
              const wordIndex = Math.round(self.progress * totalWords);
              words.forEach((word, i) => {
                if (i < wordIndex) {
                  word.classList.add("text-reveal-visible");
                } else {
                  word.classList.remove("text-reveal-visible");
                }
              });
            },
            markers: false,
          });
        }

        // Card animations
        gsap.utils.toArray(".about-card").forEach((card, i) => {
          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            onComplete: function () {
              card.classList.add("animation-complete");
            },
          });
        });
      }
    };

    const checkGSAP = () => {
      if (typeof gsap !== "undefined") {
        initializeTextReveal();
      } else {
        setTimeout(checkGSAP, 100);
      }
    };

    checkGSAP();
  }, []);

  return (
    <>
      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Full-Stack Software Engineer with 5+ years of experience designing
              and implementing enterprise solutions. Currently pursuing M.Sc. in
              Artificial Intelligence in Germany.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
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
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="about-card text-center p-4 bg-white/60 dark:bg-slate-800/60 rounded-lg shadow-lg backdrop-blur ring-1 ring-white/20 opacity-0 transform translate-y-12"
                  >
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {stat.number}
                    </div>
                    <div className="text-slate-600 dark:text-slate-300 text-sm">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Technical Expertise</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-slate-600 dark:text-slate-300">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Statement with Text Reveal */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-reveal-container">
            <p
              id="aboutTextReveal"
              className="text-reveal text-3xl md:text-4xl font-medium leading-relaxed opacity-0 transform translate-y-8"
            >
              <span>I</span>&nbsp;<span>specialize</span>&nbsp;<span>in</span>{" "}
              <span>designing</span>&nbsp;
              <span>and</span>&nbsp;<span>implementing</span>{" "}
              <span>enterprise-grade</span>&nbsp;
              <span>software</span>&nbsp;<span>solutions</span>&nbsp;<span>that</span>{" "}
              <span>solve</span>&nbsp;
              <span>complex</span>&nbsp;<span>business</span>{" "}
              <span>challenges,</span>&nbsp;<span>combining</span>&nbsp;
              <span>modern</span>&nbsp;<span>development</span>{" "}
              <span>practices</span>&nbsp;<span>with</span>&nbsp;
              <span>AI</span>&nbsp;<span>technologies</span>&nbsp;<span>to</span>{" "}
              <span>deliver</span>&nbsp;
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
