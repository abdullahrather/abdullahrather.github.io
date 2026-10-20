import React, { useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import SectionHeader from "./SectionHeader";
import { Icon } from "./Icons";
import { trackEvent } from "../lib/analytics";
import { useTranslation } from "../lib/i18n";
import { spotlight, useReveal } from "../lib/hooks";
import { isPrivateRepo } from "../lib/site";

const INITIAL_COUNT = 6;

const hasDemo = (p) => p.demo && p.demo !== "#";

/**
 * Runs a grid update inside a View Transition so cards glide to their new positions.
 * Card names are only applied (via .vt-cards) for the duration of the transition so they
 * do not interfere with the root-level theme transition.
 */
const withGridTransition = (grid, update) => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduce || !grid) {
    update();
    return;
  }
  grid.classList.add("vt-cards");
  const transition = document.startViewTransition(() => flushSync(update));
  transition.ready.catch(() => {}); // skipped by a newer transition — the update still applies
  transition.finished.finally(() => grid.classList.remove("vt-cards"));
};

const ProjectCard = ({ project, index, onOpen }) => {
  const { t } = useTranslation();
  const reveal = useReveal();
  const isPrivate = isPrivateRepo(project.github);
  const extra = project.technologies.length - 4;

  return (
    <article
      ref={reveal}
      onPointerMove={spotlight}
      style={{ "--delay": `${(index % 3) * 70}ms`, "--vt": `project-${project.id}` }}
      className="project-card card spotlight group flex flex-col overflow-hidden p-2 transition-colors duration-300 hover:border-line-strong"
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="relative block aspect-16/10 overflow-hidden rounded-[1.1rem] bg-fg/5"
        aria-label={`${t("ui.projects.details")}: ${project.title}`}
      >
        <img
          src={project.image}
          srcSet={`${project.image.replace(/\.webp$/, "-640.webp")} 640w, ${project.image} 1200w`}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          alt=""
          loading="lazy"
          decoding="async"
          width="1200"
          height="800"
          className="size-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
        />
        <span className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute bottom-3 right-3 flex size-10 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-lg transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
          <Icon name="arrowUpRight" />
        </span>
      </button>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-snug tracking-tight">{project.title}</h3>
          {isPrivate ? (
            <span className="mt-1 shrink-0 text-subtle" title={t("ui.projects.private")}>
              <Icon name="lock" className="size-4" />
            </span>
          ) : (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn -mr-2 -mt-1 size-8 shrink-0"
              aria-label={`${project.title} on GitHub`}
              title={t("projects.card.github_title")}
            >
              <Icon name="github" className="size-4" />
            </a>
          )}
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {project.technologies.slice(0, 4).map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
          {extra > 0 && <li className="chip">+{extra}</li>}
        </ul>
      </div>
    </article>
  );
};

const ProjectDialog = ({ project, onClose }) => {
  const { t } = useTranslation();
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (project && dialog && !dialog.open) dialog.showModal();
  }, [project]);

  if (!project) return null;
  const isPrivate = isPrivateRepo(project.github);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
      aria-labelledby="project-dialog-title"
      className="m-auto max-h-[min(92dvh,56rem)] w-[min(100%-1.5rem,52rem)] overflow-y-auto overscroll-contain rounded-3xl border border-line bg-card-solid p-0 text-fg shadow-2xl backdrop:bg-transparent"
    >
      <div className="relative">
        <img src={project.image} alt="" className="aspect-16/8 w-full object-cover" />
        <span className="absolute inset-0 bg-linear-to-t from-card-solid via-card-solid/10 to-transparent" />
        <button
          type="button"
          onClick={() => ref.current.close()}
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
          aria-label={t("projects.modal.close")}
          autoFocus
        >
          <Icon name="x" className="size-5" />
        </button>
      </div>

      <div className="-mt-12 relative px-6 pb-8 sm:px-10 sm:pb-10">
        <span className="chip bg-card-solid">{(t("projects.filters") || []).find((f) => f.id === project.category)?.name}</span>
        <h3 id="project-dialog-title" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {!isPrivate && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary"
              onClick={() => trackEvent("project_source", { project: project.title })}>
              <Icon name="github" />
              {t("projects.modal.view_github")}
            </a>
          )}
          {hasDemo(project) && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <Icon name="arrowUpRight" />
              {t("ui.projects.live")}
            </a>
          )}
          {isPrivate && (
            <span className="btn btn-ghost pointer-events-none text-muted">
              <Icon name="lock" />
              {t("projects.modal.private_repo")}
            </span>
          )}
        </div>

        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">{t("projects.modal.technologies")}</h4>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <li key={tech} className="chip text-fg">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">{t("projects.modal.key_features")}</h4>
            <ul className="mt-4 space-y-2">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                  <Icon name="check" className="mt-0.5 size-4 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {project.developmentDetails?.length > 0 && (
          <div className="mt-10">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">{t("projects.modal.dev_details")}</h4>
            <dl className="mt-4 divide-y divide-line rounded-2xl border border-line">
              {project.developmentDetails.map((d) => (
                <div key={d.label} className="grid gap-1 p-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="text-sm font-medium">{d.label}</dt>
                  <dd className="text-sm leading-relaxed text-muted">{d.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </dialog>
  );
};

const Projects = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const gridRef = useRef(null);
  const [selected, setSelected] = useState(null);

  const projects = useMemo(() => t("projects.items") || [], [t]);
  const filters = t("projects.filters") || [];

  const matches = (p, id) =>
    id === "all" ? true : id === "public" ? !isPrivateRepo(p.github) : p.category === id;

  const filtered = useMemo(() => projects.filter((p) => matches(p, filter)), [projects, filter]);
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

  const openProject = (project) => {
    setSelected(project);
    trackEvent("project_open", { project: project.title });
  };

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container-x">
        <SectionHeader
          id="projects-title"
          eyebrow={t("ui.projects.eyebrow")}
          before={t("projects.heading")}
          lead={t("projects.subheading")}
        />

        <div role="group" aria-label="Filter projects" className="-mx-5 mb-8 flex gap-1.5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
          {filters.map((f) => {
            const count = projects.filter((p) => matches(p, f.id)).length;
            const isActive = filter === f.id;
            return (
              <button
                key={f.id}
                aria-pressed={isActive}
                type="button"
                onClick={() => {
                  withGridTransition(gridRef.current, () => {
                    setFilter(f.id);
                    setShowAll(false);
                  });
                }}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                  isActive
                    ? "border-fg bg-fg text-bg"
                    : "border-line text-muted hover:border-line-strong hover:text-fg"
                }`}
              >
                {f.name}
                <span className={`font-mono text-[11px] ${isActive ? "text-bg/60" : "text-subtle"}`}>{count}</span>
              </button>
            );
          })}
        </div>

        <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onOpen={openProject} />
          ))}
        </div>

        {filtered.length > INITIAL_COUNT && (
          <div className="mt-12 flex flex-col items-center gap-3">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                if (showAll) document.getElementById("projects")?.scrollIntoView();
                setShowAll((v) => !v);
              }}
            >
              {showAll ? t("projects.toggle.show_less") : t("projects.toggle.view_all")}
              <Icon name="chevronDown" className={`size-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
            </button>
            <p className="font-mono text-xs text-subtle">
              {t("projects.toggle.showing", { visible: visible.length, total: filtered.length })}
            </p>
          </div>
        )}
      </div>

      <ProjectDialog key={selected?.id} project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default Projects;
