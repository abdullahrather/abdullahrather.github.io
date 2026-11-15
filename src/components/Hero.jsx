import { useEffect, useRef, useState } from "react";
import { Screen, Window } from "./Cover";
import { Icon } from "./Icons";
import { trackEvent } from "../lib/analytics";
import { useExperienceYears } from "../lib/experience";
import { useTranslation } from "../lib/i18n";
import { studyPath } from "../lib/route";
import { SOCIALS, STACK, getResume } from "../lib/site";

const delay = (ms) => ({ "--delay": `${ms}ms` });

const ResumeMenu = () => {
  const { t, lang } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const resume = getResume(lang);

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const item =
    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-fg/5 hover:text-fg";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className="btn btn-ghost"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name="file" />
        {t("hero.buttons.resume")}
        <Icon name="chevronDown" className={`size-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        role="menu"
        className={`absolute left-0 top-full z-30 mt-2 w-56 origin-top-left rounded-2xl border border-line bg-card-solid/95 p-1.5 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-out-expo ${
          open ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"
        }`}
      >
        <a
          role="menuitem"
          href={resume.href}
          target="_blank"
          rel="noopener noreferrer"
          className={item}
          onClick={() => {
            trackEvent("resume_view");
            setOpen(false);
          }}
        >
          <Icon name="arrowUpRight" />
          {t("hero.buttons.view_resume")}
        </a>
        <a
          role="menuitem"
          href={resume.href}
          download={resume.fileName}
          className={item}
          onClick={() => {
            trackEvent("resume_download");
            setOpen(false);
          }}
        >
          <Icon name="download" />
          {t("hero.buttons.download_resume")}
        </a>
      </div>
    </div>
  );
};

const Portrait = () => {
  const { t } = useTranslation();
  return (
    <div className="enter relative mx-auto size-24 sm:size-28">
      {/* Glow */}
      <div aria-hidden="true" className="absolute -inset-4 -z-10 rounded-full bg-accent/30 blur-2xl" />

      <div className="ring-conic relative size-full rounded-full p-0.5">
        <div className="size-full rounded-full bg-bg p-1">
          <picture>
            <source srcSet="/images/profile-avatar.avif" type="image/avif" />
            <img
              src="/images/profile-avatar.webp"
              alt={t("ui.a11y.portrait")}
              width="640"
              height="640"
              fetchPriority="high"
              decoding="async"
              className="size-full rounded-full object-cover"
            />
          </picture>
        </div>
      </div>
    </div>
  );
};

const side =
  "absolute top-[16%] w-[44%] opacity-70 transition-all duration-700 ease-out-expo hover:z-20 hover:-translate-y-2 hover:rotate-0 hover:opacity-100 focus-visible:z-20 focus-visible:opacity-100 sm:w-[38%]";

/** The three case studies as a fan of windows under the buttons: one in front, two behind. */
const Showcase = () => {
  const { t } = useTranslation();
  // In the order of the project list: the private platform (a schematic), then the two with screenshots.
  const [right, left, front] = (t("projects.items") || []).filter((p) => p.caseStudy);
  if (!front) return null;

  const window = (project, className, sizes, eager) => (
    <a
      href={studyPath(project.slug)}
      aria-label={`${t("ui.study.eyebrow")}: ${project.title}`}
      className={`block ${className}`}
    >
      <Window className="aspect-16/10">
        <Screen project={project} sizes={sizes} eager={eager} />
      </Window>
    </a>
  );

  return (
    <div
      className="enter relative mx-auto mt-14 max-w-4xl px-5 mask-[linear-gradient(to_bottom,#000_55%,transparent)] sm:mt-20"
      style={delay(360)}
    >
      {window(left, `${side} left-5 -rotate-3`, "(min-width: 896px) 325px, 40vw")}
      {window(right, `${side} right-5 rotate-3`, "(min-width: 896px) 325px, 40vw")}
      {window(
        front,
        "relative z-10 mx-auto w-[68%] transition-transform duration-700 ease-out-expo hover:-translate-y-2 sm:w-[54%]",
        "(min-width: 896px) 460px, 62vw",
        true,
      )}
    </div>
  );
};

const Hero = () => {
  const { t } = useTranslation();
  const years = useExperienceYears();

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 sm:pt-36 lg:pb-24">
      <div className="container-x text-center">
        <Portrait />

        <a
          href="#experience"
          className="enter group mt-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-card py-1.5 pl-2 pr-3.5 text-xs text-muted backdrop-blur transition-colors hover:border-line-strong hover:text-fg"
          style={delay(60)}
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-ok opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-ok" />
          </span>
          {t("ui.available")}
          <Icon name="arrowRight" className="size-3 transition-transform group-hover:translate-x-0.5" />
        </a>

        <p className="enter mt-6 font-mono text-sm text-muted" style={delay(100)}>
          {t("ui.hero.greeting")}
          <span className="hidden sm:inline"> — {t("hero.role")}</span>
        </p>

        <h1
          className="enter mx-auto mt-4 max-w-4xl text-[clamp(1.9rem,9.6vw,2.6rem)] font-semibold leading-[1.04] tracking-[-0.045em] sm:text-6xl lg:text-[4.75rem]"
          style={delay(140)}
        >
          {t("ui.hero.headline_a")} <span className="serif-em">{t("ui.hero.headline_em")}</span>{" "}
          {t("ui.hero.headline_b")}
        </h1>

        <p className="enter mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg" style={delay(200)}>
          {t("hero.summary", { years })}
        </p>

        <div className="enter mt-9 flex flex-wrap items-center justify-center gap-3" style={delay(280)}>
          <a href="#projects" className="btn btn-primary group">
            {t("ui.hero.cta_work")}
            <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <ResumeMenu />
          <div className="ml-1 flex items-center gap-1">
            {SOCIALS.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label={s.name}
                title={s.name}
              >
                <Icon name={s.id} className="size-4.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <Showcase />

      {/* Stack marquee */}
      <div className="enter mt-12 sm:mt-16" style={delay(440)}>
        <p className="container-x mb-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-subtle">
          {t("ui.hero.stack_label")}
        </p>
        <p className="sr-only">{STACK.join(", ")}</p>
        <div className="mask-x group flex overflow-hidden" aria-hidden="true">
          <ul className="flex shrink-0 animate-marquee items-center gap-10 pr-10 group-hover:[animation-play-state:paused]">
            {[...STACK, ...STACK].map((name, i) => (
              <li
                key={i}
                className="flex items-center gap-10 whitespace-nowrap text-lg font-medium tracking-tight text-subtle sm:text-xl"
              >
                {name}
                <Icon name="sparkle" className="size-3 text-accent/60" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;
