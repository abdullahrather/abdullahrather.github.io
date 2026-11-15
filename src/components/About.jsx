import { useMemo } from "react";
import SectionHeader from "./SectionHeader";
import { Icon } from "./Icons";
import { useExperienceYears } from "../lib/experience";
import { useTranslation } from "../lib/i18n";
import { spotlight, useClock, useCountUp, useReveal } from "../lib/hooks";
import { SITE, TIMEZONE } from "../lib/site";

const label = "font-mono text-xs uppercase tracking-[0.2em] text-subtle";

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

const Stat = ({ value, label: text }) => {
  const [ref, current] = useCountUp(value);
  return (
    <div ref={ref} className="flex flex-col-reverse gap-1.5">
      <dt className="text-xs leading-snug text-muted">{text}</dt>
      <dd className="text-3xl font-semibold tracking-tighter tabular-nums sm:text-4xl">
        {current}
        <span className="text-accent">+</span>
      </dd>
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
    { value: SITE.stats[0], label: t("skills.stats.enterprise_integrations") },
    { value: SITE.stats[1], label: t("skills.stats.production_deployments") },
    { value: SITE.stats[2], label: t("skills.stats.core_technologies") },
  ];

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
          {/* Intro and numbers */}
          <Tile className="flex flex-col justify-between gap-10 lg:col-span-4">
            <div>
              <p className={label}>{t("skills.headings.experience_snapshot")}</p>
              <p className="mt-5 text-xl leading-relaxed tracking-tight sm:text-2xl">
                {t("skills.intro.paragraph1", { years })}
              </p>
              <p className="mt-5 leading-relaxed text-muted">{t("skills.intro.paragraph2")}</p>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 sm:grid-cols-4">
              {stats.map((s) => (
                <Stat key={s.label} {...s} />
              ))}
            </dl>
          </Tile>

          <div className="flex flex-col gap-4 lg:col-span-2">
            {/* Current role */}
            {current && (
              <Tile delay={80} className="flex flex-1 flex-col justify-between gap-8">
                <div>
                  <p className={`flex items-center gap-2 ${label}`}>
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

            {/* Location and clock */}
            <Tile delay={140} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Icon name="globe" className="size-9 shrink-0 text-accent/70" strokeWidth={1.2} />
                <div>
                  <p className="font-semibold tracking-tight">
                    <span className="sr-only">{t("ui.about.location")}: </span>
                    {t("ui.about.location_value")}
                  </p>
                  <p className="text-sm text-muted">{t("ui.about.region")}</p>
                </div>
              </div>
              <p className="text-right">
                <span className="block font-mono text-xl tabular-nums">{time}</span>
                <span className="block text-xs text-subtle">{t("ui.about.local_time")}</span>
              </p>
            </Tile>
          </div>

          {/* Skills, grouped by what they are used for */}
          <Tile className="lg:col-span-6">
            <p className={label}>{t("ui.about.skills")}</p>
            <ul className="mt-2 divide-y divide-line">
              {(t("skills.groups") || []).map((group) => (
                <li key={group.title} className="grid gap-3 py-5 last:pb-0 lg:grid-cols-[19rem_1fr] lg:gap-10">
                  <div>
                    <h3 className="font-semibold tracking-tight">{group.title}</h3>
                    <p className="mt-1 text-sm leading-snug text-muted">{group.text}</p>
                  </div>
                  <ul className="flex flex-wrap content-center gap-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="chip px-3 py-1.5 text-xs text-fg">
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Tile>

          {/* Mission */}
          <Tile delay={60} className="bg-linear-to-br from-accent/10 via-transparent to-accent-2/10 lg:col-span-6">
            <div className="grid gap-6 lg:grid-cols-[12rem_1fr] lg:gap-10">
              <p className={label}>{t("ui.about.mission")}</p>
              <p className="font-serif text-2xl italic leading-snug sm:text-3xl lg:text-[2.1rem]">
                “{t("skills.mission")}”
              </p>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
};

export default About;
