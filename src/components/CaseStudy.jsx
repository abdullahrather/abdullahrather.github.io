import Cover, { Window } from "./Cover";
import { Icon } from "./Icons";
import { trackEvent } from "../lib/analytics";
import { useTranslation } from "../lib/i18n";
import { useReveal } from "../lib/hooks";
import { studyPath } from "../lib/route";
import { isPrivateRepo } from "../lib/site";

const label = "font-mono text-xs uppercase tracking-[0.2em] text-subtle";

/** One numbered part of the page: the heading on the left, the content on the right. */
const Block = ({ index, title, children }) => {
  const reveal = useReveal();
  return (
    <section ref={reveal} className="grid gap-6 border-t border-line py-14 sm:py-20 lg:grid-cols-[16rem_1fr] lg:gap-12">
      <div>
        <p className="font-mono text-xs text-accent">{String(index).padStart(2, "0")}</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
};

const CaseStudy = ({ project }) => {
  const { t } = useTranslation();
  const { study } = project;
  const isPrivate = isPrivateRepo(project.github);
  const studies = (t("projects.items") || []).filter((p) => p.caseStudy);
  const next = studies[(studies.findIndex((p) => p.id === project.id) + 1) % studies.length];
  // Numbered in the order shown; a project without screenshots has one part fewer.
  let part = 0;

  return (
    <article id="top" className="pt-28 sm:pt-36">
      <div className="container-x">
        <a
          href="/#projects"
          className="enter group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <Icon name="arrowRight" className="size-4 rotate-180 transition-transform group-hover:-translate-x-0.5" />
          {t("ui.study.back")}
        </a>

        <header className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <div className="enter min-w-0" style={{ "--delay": "60ms" }}>
            <p className="eyebrow">{t("ui.study.eyebrow")}</p>
            <h1 className="mt-5 hyphens-auto text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] wrap-break-word sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{study.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {isPrivate ? (
                <span className="chip px-3.5 py-2 text-xs">
                  <Icon name="lock" className="size-3.5" />
                  {t("projects.modal.private_repo")}
                </span>
              ) : (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  onClick={() => trackEvent("project_source", { project: project.slug })}
                >
                  <Icon name="github" />
                  {t("projects.modal.view_github")}
                </a>
              )}
            </div>
          </div>

          <dl className="enter grid gap-x-8 gap-y-5 sm:grid-cols-3 lg:grid-cols-1" style={{ "--delay": "140ms" }}>
            {study.meta.map((item) => (
              <div key={item.label} className="border-t border-line pt-4">
                <dt className={label}>{item.label}</dt>
                <dd className="mt-1.5 text-sm">{item.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <Cover
          project={project}
          eager
          sizes="(min-width: 1152px) 930px, 86vw"
          className="enter mt-14 aspect-16/10 rounded-3xl border border-line sm:aspect-2/1"
          style={{ "--delay": "220ms", viewTransitionName: `cover-${project.slug}` }}
        />

        {study.numbers.length > 0 && (
          <dl className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {study.numbers.map((item) => (
              <div key={item.label} className="card flex flex-col-reverse justify-end gap-3 p-6">
                <dt className="text-sm leading-snug text-muted">{item.label}</dt>
                <dd className="text-4xl font-semibold tracking-tighter sm:text-5xl">{item.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-14 sm:mt-20">
          <Block index={++part} title={study.problem.title}>
            <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
              {study.problem.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <h3 className={`${label} mt-10`}>{t("ui.study.stack")}</h3>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <li key={tech} className="chip text-fg">
                  {tech}
                </li>
              ))}
            </ul>
          </Block>

          <Block index={++part} title={t("ui.study.built")}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {study.built.map((item) => (
                <li key={item.title} className="card p-6">
                  <h3 className="font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block index={++part} title={study.flow.title}>
            <ol className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
              {study.flow.lanes.map((lane, i) => (
                <li key={lane.title} className="card relative p-5">
                  <p className="font-mono text-[11px] text-subtle">{i + 1}</p>
                  <h3 className="mt-2 font-semibold tracking-tight">{lane.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-snug text-muted">
                    {lane.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {i < study.flow.lanes.length - 1 && (
                    <Icon
                      name="arrowRight"
                      className={`flow-arrow absolute size-4 text-accent ${i % 2 ? "flow-arrow-wrap" : ""}`}
                    />
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-6 max-w-2xl font-serif text-2xl italic leading-snug">{study.flow.note}</p>
          </Block>

          <Block index={++part} title={t("ui.study.hard")}>
            <ol className="divide-y divide-line">
              {study.hard.map((item, i) => (
                <li key={item.title} className="grid gap-2 py-6 first:pt-0 last:pb-0 sm:grid-cols-[3rem_1fr]">
                  <p className="font-mono text-sm text-subtle">{String(i + 1).padStart(2, "0")}</p>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-2 max-w-2xl leading-relaxed text-muted">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Block>

          {project.screens.length > 0 && (
            <Block index={++part} title={t("ui.study.screens")}>
              <ul className="grid gap-8 sm:grid-cols-2">
                {project.screens.map((src, i) => (
                  <li key={src}>
                    <figure>
                      {/* Opens the full-size picture: the page shows it small. */}
                      <a
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block transition-transform duration-500 ease-out-expo hover:-translate-y-1"
                      >
                        <Window className="shadow-xl">
                          <img
                            src={src}
                            srcSet={`${src.replace(/\.webp$/, "-640.webp")} 640w, ${src} 1200w`}
                            sizes="(min-width: 1152px) 400px, (min-width: 640px) 43vw, 90vw"
                            alt={study.screens[i]}
                            loading="lazy"
                            decoding="async"
                            width="1200"
                            height="750"
                            className="w-full"
                          />
                        </Window>
                      </a>
                      <figcaption className="mt-3 text-sm leading-snug text-muted">{study.screens[i]}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </Block>
          )}
        </div>

        <div className="grid gap-4 border-t border-line py-14 sm:py-20 lg:grid-cols-2">
          <a
            href={studyPath(next.slug)}
            className="card group flex flex-col justify-between gap-10 p-6 transition-colors hover:border-line-strong sm:p-8"
          >
            <p className={label}>{t("ui.study.next")}</p>
            <p className="flex items-end justify-between gap-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              {next.title}
              <Icon name="arrowRight" className="mb-1 size-6 shrink-0 transition-transform group-hover:translate-x-1" />
            </p>
          </a>
          <div className="card flex flex-col justify-between gap-10 bg-linear-to-br from-accent/10 via-transparent to-accent-2/10 p-6 sm:p-8">
            <p className="font-serif text-2xl italic leading-snug sm:text-3xl">{t("ui.study.cta_title")}</p>
            <a href="/#contact" className="btn btn-primary self-start">
              {t("ui.study.cta")}
              <Icon name="arrowRight" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CaseStudy;
