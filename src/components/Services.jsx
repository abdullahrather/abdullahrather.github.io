import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

const Services = () => {
  const services = [
    {
      icon: (
        <svg
          className="mb-6 h-8 w-8 stroke-indigo-600"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      title: "Enterprise Management Systems",
      description:
        "Comprehensive enterprise solutions including project management, document handling, and complex workflow systems using modern PHP frameworks.",
      features: [
        "Project Management Modules",
        "Document Management Systems",
        "Workflow & Ticket Systems",
        "Role-based Access Control (RBAC)",
      ],
    },
    {
      icon: (
        <svg
          className="mb-6 h-8 w-8 stroke-indigo-600"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "DATEV Integration & Financial Systems",
      description:
        "Specialized integration with German accounting standards including DATEV systems and ZUGFeRD-compliant invoice generation.",
      features: [
        "DATEV API Integration",
        "ZUGFeRD XML Generation",
        "Financial Data Processing",
        "German Accounting Compliance",
      ],
    },
    {
      icon: (
        <svg
          className="mb-6 h-8 w-8 stroke-indigo-600"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Full-Stack Web Development",
      description:
        "Modern web applications using PHP (Laravel, Yii), JavaScript (React, Node.js), and Python (Flask, FastAPI) with responsive design.",
      features: [
        "PHP Frameworks (Laravel, Yii)",
        "JavaScript (React, TypeScript)",
        "Python (Flask, FastAPI)",
        "RESTful API Development",
      ],
    },
    {
      icon: (
        <svg
          className="mb-6 h-8 w-8 stroke-indigo-600"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
      title: "Team Leadership & Project Management",
      description:
        "Technical team leadership with experience managing teams of 5+ developers, ensuring timely delivery and high-quality solutions.",
      features: [
        "Technical Team Leadership",
        "Project Planning & Delivery",
        "Code Review & Mentoring",
        "Agile Development Practices",
      ],
    },
    {
      icon: (
        <svg
          className="mb-6 h-8 w-8 stroke-indigo-600"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Legacy System Migration",
      description:
        "Expert in modernizing legacy systems, including PHP version migrations (7.4 to 8.2) and implementing modern OOP design patterns.",
      features: [
        "PHP Version Migrations",
        "Legacy Code Modernization",
        "OOP Design Pattern Implementation",
        "Performance Optimization",
      ],
    },
    {
      icon: (
        <svg
          className="mb-6 h-8 w-8 stroke-indigo-600"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
      title: "Education & Management Systems",
      description:
        "Specialized development of Education Management Information Systems (EMIS) with comprehensive student, teacher, and administrative modules.",
      features: [
        "Student Management Systems",
        "Teacher & Staff Management",
        "Financial Transaction Modules",
        "Parent Portal Development",
      ],
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Services title
    gsap.to("#servicesTitle", {
      scrollTrigger: {
        trigger: "#servicesTitle",
        start: "top 80%",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
    });

    // Card animations with enhanced hover effects
    gsap.utils.toArray(".service-card").forEach((card, i) => {
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
  }, []);

  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-28">
      <h2
        id="servicesTitle"
        className="mb-16 text-center text-4xl font-extrabold transform opacity-0 translate-y-6"
      >
        Technical Expertise
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card rounded-3xl bg-white/60 dark:bg-slate-800/60 p-8 shadow-xl backdrop-blur ring-1 ring-white/20 dark:ring-slate-700/20 opacity-0 transform translate-y-12 transition-all duration-300 hover:transform hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-indigo-500/10"
          >
            {service.icon}
            <h3 className="mb-3 text-xl font-semibold">{service.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              {service.description}
            </p>
            <ul className="space-y-2">
              {service.features.map((feature, featureIndex) => (
                <li
                  key={featureIndex}
                  className="flex items-center text-sm text-slate-700 dark:text-slate-400"
                >
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3 flex-shrink-0"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
