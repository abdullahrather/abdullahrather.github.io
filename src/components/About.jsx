import React, { useMemo } from "react";
import SectionHeader from "./SectionHeader";
import { Icon } from "./Icons";
import { useExperienceYears } from "../lib/experience";
import { useTranslation } from "../lib/i18n";
import { spotlight, useClock, useCountUp, useReveal } from "../lib/hooks";
import { TIMEZONE } from "../lib/site";

const SKILLS = [
  { key: "backend_stack", level: 95 },
  { key: "databases", level: 90 },
  { key: "api_integrations", level: 90 },
  { key: "architecture", level: 88 },
  { key: "python", level: 86 },
  { key: "frontend", level: 85 },
  { key: "git_ci", level: 85 },
  { key: "leadership", level: 85 },
  { key: "devops", level: 82 },
];

const Tile = ({ className = "", delay = 0, children }) => {
  const reveal = useReveal();
  return (
    <div
      ref={reveal}
      onPointerMove={spotlight}
      style={{ "--delay": `${delay}ms` }}
      className={`card spotlight overflow-hidden p-6 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
};

const Stat = ({ value, label }) => {
  const [ref, current] = useCountUp(value);
  return (
    <div ref={ref} className="flex flex-col justify-between gap-6 p-6 sm:p-7">
      <span className="text-5xl font-semibold tracking-tighter tabular-nums sm:text-6xl">
        {current}
        <span className="text-accent">+</span>
      </span>
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
};

const About = () => {
  const { t, lang } = useTranslation();
  const years = useExperienceYears();
  const time = useClock(TIMEZONE, lang === "de" ? "de-DE" : "en-GB");
  const current = useMemo(() => (t("workExperience.entries") || [])[0], [t]);

  const stats = [
    { value: years, label: t("skills.stats.years_experience") },
    { value: 20, label: t("skills.stats.enterprise_integrations") },
    { value: 15, label: t("skills.stats.production_deployments") },
    { value: 10, label: t("skills.stats.core_technologies") },
  ];

  const levelLabel = (level) =>
    level >= 90 ? t("skills.levels.expert") : level >= 80 ? t("skills.levels.advanced") : t("skills.levels.intermediate");

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container-x">
        <SectionHeader
          id="about-title"
          eyebrow={t("ui.about.eyebrow")}
          before={t("ui.about.heading_a")}
          em={t("ui.about.heading_em")}
        />

        <div className="grid gap-4 lg:grid-cols-6">
          {/* Intro */}
          <Tile className="lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">{t("skills.headings.experience_snapshot")}</p>
            <p className="mt-5 text-xl leading-relaxed tracking-tight sm:text-2xl">
              {t("skills.intro.paragraph1", { years })}
            </p>
            <p className="mt-5 leading-relaxed text-muted">{t("skills.intro.paragraph2")}</p>
          </Tile>

          {/* Location + clock */}
          <Tile className="flex flex-col justify-between gap-10 lg:col-span-2" delay={80}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">{t("ui.about.location")}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight">{t("ui.about.location_value")}</p>
                <p className="mt-1 text-sm text-muted">{t("ui.about.relocation")}</p>
              </div>
              <Icon name="globe" className="size-10 text-accent/70" strokeWidth={1.2} />
            </div>
            <div className="flex items-end justify-between border-t border-line pt-5">
              <span className="text-sm text-muted">{t("ui.about.local_time")}</span>
              <span className="font-mono text-2xl tabular-nums">{time}</span>
            </div>
          </Tile>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-6 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Tile key={s.label} className="p-0! sm:p-0!" delay={i * 60}>
                <Stat {...s} />
              </Tile>
            ))}
          </div>

          {/* Skills */}
          <Tile className="lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">{t("ui.about.skills")}</p>
            <ul className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {SKILLS.map(({ key, level }) => (
                <li key={key}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="font-medium">{t(`skills.items.${key}`)}</span>
                    <span className="font-mono text-[11px] text-subtle">{levelLabel(level)}</span>
                  </div>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-fg/7">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-accent to-accent-2"
                      style={{ width: `${level}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Tile>

          {/* Current role */}
          {current && (
            <Tile delay={80} className="flex flex-col justify-between gap-10 lg:col-span-2">
              <div>
                <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-subtle">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-ok opacity-60" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-ok" />
                  </span>
                  {t("ui.hero.now")}
                </p>
                <p className="mt-5 text-2xl font-semibold tracking-tight">{current.company}</p>
                <p className="mt-1 text-sm text-muted">{current.role}</p>
                <p className="mt-5 text-sm leading-relaxed text-muted">{current.summary}</p>
              </div>
              <a href="#experience" className="group inline-flex items-center gap-2 text-sm font-medium">
                {t("hero.buttons.experience")}
                <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Tile>
          )}

          {/* Mission */}
          <Tile delay={60} className="bg-linear-to-br from-accent/10 via-transparent to-accent-2/10 lg:col-span-6">
            <div className="grid gap-6 lg:grid-cols-[12rem_1fr] lg:gap-10">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">{t("ui.about.mission")}</p>
              <p className="font-serif text-2xl italic leading-snug sm:text-3xl lg:text-[2.1rem]">“{t("skills.mission")}”</p>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
};

export default About;
