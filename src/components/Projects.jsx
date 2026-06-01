import React, { useState, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useTranslation } from "../lib/i18n";

const isPrivateRepo = (githubUrl) =>
  githubUrl === "https://github.com/abdullahrather" || githubUrl === "#";

const Projects = () => {
  const { t } = useTranslation();

  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth >= 1024) return 3;
    return 2;
  });
  const [showAll, setShowAll] = useState(false);

  const {
    projects,
    categories,
    card,
    toggle,
    modal,
  } = useMemo(
    () => ({
      projects:   t("projects.items")   || [],
      categories: t("projects.filters") || [],
      card:       t("projects.card")    || {},
      toggle:     t("projects.toggle")  || {},
      modal:      t("projects.modal")   || {},
    }),
    [t]
  );

  const filteredProjects = useMemo(() => {
    if (filter === "all") return projects;
    if (filter === "public") return projects.filter((p) => p.github && !isPrivateRepo(p.github));
    return projects.filter((p) => p.category === filter);
  }, [filter, projects]);

  const visibleProjects = useMemo(() => {
    if (showAll) return filteredProjects;
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, showAll, visibleCount]);

  const canToggleProjects = filteredProjects.length > visibleCount;

  const openModal = (project) => {
    setSelectedProject(project);
    const scrollY = window.scrollY || window.pageYOffset;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
  };

  const closeModal = () => {
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
    setSelectedProject(null);
  };

  useEffect(() => {
    if (!selectedProject) return;
    const modalBody = document.querySelector(".modal-body");
    if (!modalBody) return;
    const stop = (e) => e.stopPropagation();
    modalBody.addEventListener("wheel", stop, { passive: false });
    return () => modalBody.removeEventListener("wheel", stop);
  }, [selectedProject]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (selectedProject) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [selectedProject]);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth >= 1024 ? 3 : 2);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setShowAll(false);
  }, [filter]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
      gsap.to("#projectsTitle", {
        scrollTrigger: { trigger: "#projectsTitle", start: "top 95%" },
        opacity: 1,
        y: 0,
        duration: 0.3,
      });
      gsap.utils.toArray(".project-card").forEach((card, i) => {
        gsap.to(card, {
          scrollTrigger: { trigger: card, start: "top 95%" },
          opacity: 1,
          y: 0,
          duration: 0.3,
          delay: i * 0.05,
        });
      });
    } else {
      gsap.set("#projectsTitle", { opacity: 1, y: 0 });
      gsap.set(".project-card", { opacity: 1, y: 0 });
    }
  }, [visibleProjects.length, filter]);

  return (
    <>
      <section
        id="projects"
        className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              id="projectsTitle"
              className="text-4xl font-bold mb-4 transform opacity-0 translate-y-6"
            >
              {t("projects.heading")}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {t("projects.subheading")}
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap justify-center gap-3 bg-white/60 dark:bg-slate-800/60 p-2 rounded-lg shadow-md backdrop-blur ring-1 ring-white/20">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`px-6 py-2 rounded-md transition-all duration-300 ${
                    filter === category.id
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleProjects.map((project) => (
              <div
                key={project.id}
                className="project-card bg-white/60 dark:bg-slate-800/60 rounded-xl shadow-lg backdrop-blur ring-1 ring-white/20 dark:ring-slate-700/20 opacity-0 transform translate-y-12 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="project-card-inner" id={`card-${project.id}`}>
                  <button
                    className="flip-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const cardInner = document.getElementById(`card-${project.id}`);
                      const cardEl = cardInner.closest(".project-card");
                      cardInner.classList.toggle("flipped");
                      if (cardInner.classList.contains("flipped")) {
                        const handleMouseLeave = () => {
                          setTimeout(() => {
                            if (!cardEl.matches(":hover")) {
                              cardInner.classList.remove("flipped");
                            }
                          }, 300);
                          cardEl.removeEventListener("mouseleave", handleMouseLeave);
                        };
                        cardEl.addEventListener("mouseleave", handleMouseLeave);
                      }
                    }}
                    title={card.flip_title}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>

                  {/* FRONT SIDE */}
                  <div className="project-card-front">
                    <div className="relative group">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-48 object-cover rounded-t-xl"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex space-x-4">
                          {isPrivateRepo(project.github) ? (
                            <div className="p-3 bg-gray-600/90 text-white rounded-md backdrop-blur cursor-not-allowed flex items-center justify-center">
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                            </div>
                          ) : (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 bg-white/90 text-gray-800 rounded-md hover:bg-white transition-colors backdrop-blur flex items-center justify-center"
                              title={card.github_title}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                              </svg>
                            </a>
                          )}

                          <button
                            onClick={(e) => { e.stopPropagation(); openModal(project); }}
                            className="p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
                            title={card.details_title}
                          >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                        {project.description.length > 120
                          ? `${project.description.substring(0, 120)}...`
                          : project.description}
                      </p>

                      <div className="mb-4">
                        <h4 className="font-semibold text-sm mb-2">{card.key_features}</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.features.slice(0, 3).map((feature, i) => (
                            <span key={i} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                          {project.features.length > 3 && (
                            <span className="text-xs text-slate-500 dark:text-slate-400 px-2 py-1">
                              +{project.features.length - 3} {card.more}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <div key={i} className="tech-stack-item relative group" onClick={(e) => e.stopPropagation()}>
                            <span className="text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 px-2 py-1 rounded cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-md">
                              {tech}
                            </span>
                            <div className="tech-tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20">
                              {tech}
                              <div className="tooltip-arrow absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div className="project-card-back">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-4">{project.title}</h3>

                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span>{card.category_label}</span>
                          <span className="font-semibold capitalize">{project.category}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>{card.technologies_label}</span>
                          <span className="font-semibold">{project.technologies.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>{card.features_label}</span>
                          <span className="font-semibold">{project.features.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>{card.repository_label}</span>
                          <span className="font-semibold">
                            {isPrivateRepo(project.github) ? card.private : card.public}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 space-y-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); openModal(project); }}
                          className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white py-2 px-4 rounded-lg transition-all duration-300 font-medium"
                        >
                          {card.view_full_details}
                        </button>
                        {!isPrivateRepo(project.github) && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="block w-full bg-white text-indigo-600 hover:bg-gray-100 py-2 px-4 rounded-lg transition-all duration-300 font-medium"
                          >
                            {card.view_source}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {canToggleProjects && (
            <div className="mt-12 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className="btn-primary rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95"
              >
                {showAll ? toggle.show_less : toggle.view_all}
              </button>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t("projects.toggle.showing", { visible: visibleProjects.length, total: filteredProjects.length })}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeModal}
          onWheel={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {selectedProject.title}
              </h2>
              <button onClick={closeModal} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <svg className="h-6 w-6 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-140px)] modal-body">
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 md:h-80 object-contain bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600"
                />
              </div>

              <div className="p-6 space-y-6">
                {/* Overview */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">{modal.overview}</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{selectedProject.description}</p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">{modal.technologies}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">{modal.key_features}</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {selectedProject.features.map((feature, i) => (
                      <div key={i} className="flex items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3 flex-shrink-0"></span>
                        <span className="text-slate-700 dark:text-slate-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Development Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">{modal.dev_details}</h3>
                    <div className="space-y-3">
                      {(selectedProject.developmentDetails || []).map((detail, index) => (
                        <div key={index} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                          <h4 className="font-medium text-slate-900 dark:text-white mb-2">{detail.label}</h4>
                          <p className="text-slate-600 dark:text-slate-300 text-sm">{detail.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  {isPrivateRepo(selectedProject.github) ? (
                    <div className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg text-center font-medium cursor-not-allowed flex items-center justify-center">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      {modal.private_repo}
                    </div>
                  ) : (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-slate-800 dark:bg-slate-700 text-white py-3 px-6 rounded-lg hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors text-center font-medium flex items-center justify-center"
                    >
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                      {modal.view_github}
                    </a>
                  )}
                  <button
                    onClick={closeModal}
                    className="flex-1 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 py-3 px-6 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-medium flex items-center justify-center"
                  >
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {modal.close}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
