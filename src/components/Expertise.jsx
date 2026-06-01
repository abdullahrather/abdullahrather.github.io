import React, { useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useTranslation } from "../lib/i18n";

// Renders an SVG icon from a single path string or an array of path strings.
const ServiceIcon = ({ item }) => {
  const paths = item.iconPaths ?? (item.iconPath ? [item.iconPath] : []);
  return (
    <svg className="mb-6 h-8 w-8 stroke-indigo-600" fill="none" strokeWidth="2" viewBox="0 0 24 24">
      {paths.map((d, i) => (
        <path key={i} strokeLinecap="round" strokeLinejoin="round" d={d} />
      ))}
    </svg>
  );
};

const Expertise = () => {
  const { t } = useTranslation();

  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth >= 1024) return 3;
    return 2;
  });
  const [showAll, setShowAll] = useState(false);

  const expertise = useMemo(() => t("expertise.items") || [], [t]);

  const visibleExpertise = useMemo(() => {
    if (showAll) return expertise;
    return expertise.slice(0, visibleCount);
  }, [expertise, showAll, visibleCount]);

  const canToggleExpertise = expertise.length > visibleCount;

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth >= 1024 ? 3 : 2);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
      gsap.to("#expertiseTitle", {
        scrollTrigger: { trigger: "#expertiseTitle", start: "top 95%" },
        opacity: 1,
        y: 0,
        duration: 0.3,
      });

      gsap.utils.toArray(".service-card").forEach((card, i) => {
        gsap.to(card, {
          scrollTrigger: { trigger: card, start: "top 95%" },
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
      gsap.set("#expertiseTitle", { opacity: 1, y: 0 });
      gsap.set(".service-card", { opacity: 1, y: 0 });
      gsap.utils.toArray(".service-card").forEach((card) => {
        card.classList.add("animation-complete");
      });
    }

    gsap.utils.toArray(".service-card svg").forEach((icon, index) => {
      gsap.to(icon, {
        y: -8,
        duration: 2 + index * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.3,
      });

      const card = icon.closest(".service-card");
      card.addEventListener("mouseenter", () => {
        gsap.to(icon, { scale: 1.1, rotation: 5, duration: 0.3, ease: "back.out(1.7)" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
      });
    });
  }, [visibleExpertise.length]);

  return (
    <section id="expertise" className="mx-auto max-w-7xl px-6 py-28">
      <h2
        id="expertiseTitle"
        className="mb-16 text-center text-4xl font-extrabold transform opacity-0 translate-y-6"
      >
        {t("expertise.heading")}
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visibleExpertise.map((service, index) => (
          <div
            key={index}
            className="service-card rounded-3xl bg-white/60 dark:bg-slate-800/60 p-8 shadow-xl backdrop-blur ring-1 ring-white/20 dark:ring-slate-700/20 opacity-0 transform translate-y-12 transition-all duration-300 hover:transform hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-indigo-500/10"
          >
            <ServiceIcon item={service} />
            <h3 className="mb-3 text-xl font-semibold">{service.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{service.description}</p>
            <ul className="space-y-2">
              {service.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center text-sm text-slate-700 dark:text-slate-400">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3 flex-shrink-0"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {canToggleExpertise && (
        <div className="mt-12 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="btn-primary rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95"
          >
            {showAll ? t("expertise.show_less") : t("expertise.view_all")}
          </button>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("expertise.showing", { visible: visibleExpertise.length, total: expertise.length })}
          </p>
        </div>
      )}
    </section>
  );
};

export default Expertise;
