import React, { useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

const Services = () => {
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window === "undefined") {
      return 3;
    }

    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 2;
  });
  const [showAll, setShowAll] = useState(false);

  const services = useMemo(
    () => [
      {
        icon: (
          <svg
            className='mb-6 h-8 w-8 stroke-indigo-600'
            fill='none'
            strokeWidth='2'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
            />
          </svg>
        ),
        title: "Enterprise Platforms & Workflow Systems",
        description:
          "Internal platforms for operations, project tracking, document handling, and multi-role workflows.",
        features: [
          "Workflow & Ticket Modules",
          "Document Management",
          "Role-based Access Control (RBAC)",
          "Multi-language Support",
        ],
      },
      {
        icon: (
          <svg
            className='mb-6 h-8 w-8 stroke-indigo-600'
            fill='none'
            strokeWidth='2'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
        ),
        title: "API Integrations & Automation",
        description:
          "Integrations and automation for third-party systems, including German accounting standards.",
        features: [
          "REST API Integrations",
          "DATEV & ZUGFeRD Compliance",
          "Data Sync & Automation",
          "Secure Webhooks",
        ],
      },
      {
        icon: (
          <svg
            className='mb-6 h-8 w-8 stroke-indigo-600'
            fill='none'
            strokeWidth='2'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
            />
          </svg>
        ),
        title: "PHP Backend Engineering",
        description:
          "Backend services with clean architecture, testing, and scalable APIs.",
        features: [
          "Laravel / Yii / Symfony",
          "REST API Design",
          "Authentication & RBAC",
          "PHPUnit Testing",
        ],
      },
      {
        icon: (
          <svg
            className='mb-6 h-8 w-8 stroke-indigo-600'
            fill='none'
            strokeWidth='2'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
            />
          </svg>
        ),
        title: "Full-Stack Web Delivery",
        description:
          "Modern front ends connected to reliable APIs for data-heavy apps.",
        features: [
          "React UI Development",
          "Admin Dashboards",
          "State Management",
          "Performance Tuning",
        ],
      },
      {
        icon: (
          <svg
            className='mb-6 h-8 w-8 stroke-indigo-600'
            fill='none'
            strokeWidth='2'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
            />
          </svg>
        ),
        title: "Legacy Modernization & Performance",
        description:
          "Upgrade and refactor legacy PHP systems for stability, security, and speed.",
        features: [
          "PHP 7.4 to 8.2 Upgrades",
          "Legacy Refactors",
          "OOP Design Patterns",
          "Performance Optimization",
        ],
      },
      {
        icon: (
          <svg
            className='mb-6 h-8 w-8 stroke-indigo-600'
            fill='none'
            strokeWidth='2'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
            />
          </svg>
        ),
        title: "Technical Leadership",
        description:
          "Lead teams and deliver predictable releases with clear standards.",
        features: [
          "Team Mentoring",
          "Code Reviews",
          "Release Planning",
          "Agile Delivery",
        ],
      },
    ],
    []
  );

  const visibleServices = useMemo(() => {
    if (showAll) return services;
    return services.slice(0, visibleCount);
  }, [services, showAll, visibleCount]);

  const canToggleServices = services.length > visibleCount;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
        return;
      }

      if (window.innerWidth >= 768) {
        setVisibleCount(2);
        return;
      }

      setVisibleCount(2);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Mobile detection
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
      // Desktop: animated loading
      gsap.to("#servicesTitle", {
        scrollTrigger: {
          trigger: "#servicesTitle",
          start: "top 95%",
        },
        opacity: 1,
        y: 0,
        duration: 0.3,
      });

      gsap.utils.toArray(".service-card").forEach((card, i) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
          },
          opacity: 1,
          y: 0,
          duration: 0.3,
          delay: i * 0.05,
          onComplete: function () {
            card.classList.add("animation-complete");
          },
        });
      });
    } else {
      // Mobile: show everything immediately
      gsap.set("#servicesTitle", { opacity: 1, y: 0 });
      gsap.set(".service-card", { opacity: 1, y: 0 });
      gsap.utils.toArray(".service-card").forEach((card) => {
        card.classList.add("animation-complete");
      });
    }
    gsap.utils.toArray(".service-card svg").forEach((icon, index) => {
      // Continuous gentle float
      gsap.to(icon, {
        y: -8,
        duration: 2 + index * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.3, // Stagger start times
      });

      // Hover enhancement
      const card = icon.closest(".service-card");
      card.addEventListener("mouseenter", () => {
        gsap.to(icon, {
          scale: 1.1,
          rotation: 5,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }, [visibleServices.length]);

  return (
    <section id='services' className='mx-auto max-w-7xl px-6 py-28'>
      <h2
        id='servicesTitle'
        className='mb-16 text-center text-4xl font-extrabold transform opacity-0 translate-y-6'
      >
        Core Focus
      </h2>

      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {visibleServices.map((service, index) => (
          <div
            key={index}
            className='service-card rounded-3xl bg-white/60 dark:bg-slate-800/60 p-8 shadow-xl backdrop-blur ring-1 ring-white/20 dark:ring-slate-700/20 opacity-0 transform translate-y-12 transition-all duration-300 hover:transform hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-indigo-500/10'
          >
            {service.icon}
            <h3 className='mb-3 text-xl font-semibold'>{service.title}</h3>
            <p className='text-sm text-slate-600 dark:text-slate-300 mb-4'>
              {service.description}
            </p>
            <ul className='space-y-2'>
              {service.features.map((feature, featureIndex) => (
                <li
                  key={featureIndex}
                  className='flex items-center text-sm text-slate-700 dark:text-slate-400'
                >
                  <span className='w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3 flex-shrink-0'></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {canToggleServices && (
        <div className='mt-12 flex flex-col items-center gap-3'>
          <button
            type='button'
            onClick={() => setShowAll((prev) => !prev)}
            className='btn-primary rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95'
          >
            {showAll ? "Show Less" : "View All Focus Areas"}
          </button>
          <p className='text-sm text-slate-500 dark:text-slate-400'>
            Showing {visibleServices.length} of {services.length}
          </p>
        </div>
      )}
    </section>
  );
};

export default Services;
