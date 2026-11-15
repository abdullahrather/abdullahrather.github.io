import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icons";
import { trackEvent } from "../lib/analytics";
import { useExperienceYears } from "../lib/experience";
import { useTranslation } from "../lib/i18n";
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

/** The portrait, set into the headline as a pill the height of a letter. */
const Portrait = () => {
  const { t } = useTranslation();
  return (
    <span className="mx-[0.06em] inline-block h-[0.86em] w-[1.5em] rounded-full bg-linear-to-r from-accent to-accent-2 p-[0.03em] align-[-0.1em] shadow-[0_0_3rem_-0.25rem_var(--glow)]">
      <picture>
        <source srcSet="/images/profile-avatar.avif" type="image/avif" />
        <img
          src="/images/profile-avatar.webp"
          alt={t("ui.a11y.portrait")}
          width="640"
          height="640"
          fetchPriority="high"
          decoding="async"
          className="size-full rounded-full object-cover object-[50%_22%]"
        />
      </picture>
    </span>
  );
};

const Hero = () => {
  const { t } = useTranslation();
  const years = useExperienceYears();

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-32 sm:pt-44 lg:pb-24">
      <div className="container-x text-center">
        <a
          href="#experience"
          className="enter group inline-flex items-center gap-2.5 rounded-full border border-line bg-card py-1.5 pl-2 pr-3.5 text-xs text-muted backdrop-blur transition-colors hover:border-line-strong hover:text-fg"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-ok opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-ok" />
          </span>
          {t("ui.available")}
          <Icon name="arrowRight" className="size-3 transition-transform group-hover:translate-x-0.5" />
        </a>

        <p className="enter mt-8 font-mono text-sm text-muted" style={delay(60)}>
          {t("ui.hero.greeting")}
          <span className="hidden sm:inline"> — {t("hero.role")}</span>
        </p>

        <h1
          className="enter mx-auto mt-5 max-w-5xl text-[clamp(1.9rem,9.6vw,2.6rem)] font-semibold leading-[1.04] tracking-[-0.045em] sm:text-7xl lg:text-[5.5rem]"
          style={delay(120)}
        >
          {t("ui.hero.headline_a")} <Portrait /> <span className="serif-em">{t("ui.hero.headline_em")}</span>{" "}
          {t("ui.hero.headline_b")}
        </h1>

        <p className="enter mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg" style={delay(200)}>
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

      {/* Stack marquee */}
      <div className="enter mt-20 sm:mt-28" style={delay(400)}>
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
