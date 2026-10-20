import React, { useMemo } from "react";
import SectionHeader from "./SectionHeader";
import { Icon } from "./Icons";
import { useTranslation } from "../lib/i18n";
import { useNow, useReveal } from "../lib/hooks";

const formatDuration = (startDate, endDate, now, labels) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : now;

  // UTC fields keep durations identical across time zones (dates are UTC-midnight strings)
  let years = end.getUTCFullYear() - start.getUTCFullYear();
  let months = end.getUTCMonth() - start.getUTCMonth();
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const parts = [];
  if (years > 0) parts.push(`${years} ${years > 1 ? labels.years : labels.year}`);
  if (months > 0) parts.push(`${months} ${months > 1 ? labels.months : labels.month}`);
  return parts.length ? parts.join(" ") : labels.less_than_month;
};

const Role = ({ experience, index, now, formatter, labels, present, impactLabel }) => {
  const reveal = useReveal();
  const isCurrent = !experience.endDate;
  const period = `${formatter.format(new Date(experience.startDate))} — ${
    experience.endDate ? formatter.format(new Date(experience.endDate)) : present
  }`;

  return (
    <li ref={reveal} style={{ "--delay": `${index * 40}ms` }} className="group relative grid gap-4 py-10 md:grid-cols-[13rem_1fr] md:gap-12">
      {/* Timeline rail dot */}
      <span
        aria-hidden="true"
        className={`absolute -left-1.25 top-12 hidden size-2.5 rounded-full ring-4 ring-bg md:block ${
          isCurrent ? "bg-ok" : "bg-line-strong group-hover:bg-accent"
        } transition-colors`}
      />

      <div className="md:pl-8">
        <p className="font-mono text-xs tabular-nums text-muted">{period}</p>
        <p className="mt-1 font-mono text-xs text-subtle">{formatDuration(experience.startDate, experience.endDate, now, labels)}</p>
        <span className="chip mt-3">{experience.tag}</span>
      </div>

      <div>
        <h3 className="text-2xl font-semibold tracking-tight">{experience.role}</h3>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <a
            href={experience.website}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1 font-medium text-fg underline-offset-4 hover:underline"
          >
            {experience.company}
            <Icon name="arrowUpRight" className="size-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </a>
          <span aria-hidden="true" className="text-subtle">·</span>
          <span>{experience.location}</span>
        </p>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">{experience.summary}</p>

        <details className="group/details mt-5 max-w-2xl" open={index === 0}>
          <summary className="inline-flex cursor-pointer list-none items-center gap-2 text-sm font-medium text-fg/80 transition-colors hover:text-fg [&::-webkit-details-marker]:hidden">
            <Icon name="chevronDown" className="size-4 -rotate-90 transition-transform duration-300 group-open/details:rotate-0" />
            {impactLabel}
            <span className="font-mono text-xs text-subtle">({experience.highlights.length})</span>
          </summary>
          <ul className="mt-4 space-y-3 border-l border-line pl-5">
            {experience.highlights.map((h) => (
              <li key={h} className="text-sm leading-relaxed text-muted">
                {h}
              </li>
            ))}
          </ul>
        </details>
      </div>
    </li>
  );
};

const WorkExperience = () => {
  const { t, lang } = useTranslation();
  const now = useNow();

  const formatter = useMemo(
    () => new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-US", { month: "short", year: "numeric", timeZone: "UTC" }),
    [lang]
  );

  const labels = useMemo(
    () => ({
      year: t("workExperience.year"),
      years: t("workExperience.years"),
      month: t("workExperience.month"),
      months: t("workExperience.months"),
      less_than_month: t("workExperience.less_than_month"),
    }),
    [t]
  );

  const experiences = t("workExperience.entries") || [];

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container-x">
        <SectionHeader
          id="experience-title"
          eyebrow={t("ui.experience.eyebrow")}
          before={t("workExperience.heading")}
          lead={t("workExperience.description")}
        />

        <ol className="relative divide-y divide-line border-y border-line md:border-l md:border-y-0 md:divide-y-0">
          {experiences.map((experience, index) => (
            <Role
              key={`${experience.company}-${experience.role}`}
              experience={experience}
              index={index}
              now={now}
              formatter={formatter}
              labels={labels}
              present={t("workExperience.present")}
              impactLabel={t("workExperience.key_impact")}
            />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default WorkExperience;
