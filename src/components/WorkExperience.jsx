import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "../lib/i18n";

const EXPERIENCE_DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});

const formatDuration = (startDate, endDate = new Date(), labels) => {
  const start = new Date(startDate);
  const end = endDate instanceof Date ? endDate : new Date(endDate);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const parts = [];
  if (years > 0) {
    parts.push(`${years} ${years > 1 ? labels.years : labels.year}`);
  }
  if (months > 0) {
    parts.push(`${months} ${months > 1 ? labels.months : labels.month}`);
  }

  if (!parts.length) {
    parts.push(labels.less_than_month);
  }

  return parts.join(" ");
};

const formatPeriodLabel = (startDate, endDate, presentLabel) => {
  const startLabel = EXPERIENCE_DATE_FORMAT.format(new Date(startDate));
  const endLabel = endDate ? EXPERIENCE_DATE_FORMAT.format(new Date(endDate)) : presentLabel;
  return `${startLabel} - ${endLabel}`;
};

const WorkExperience = () => {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const { t } = useTranslation();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentDate(new Date());
    }, 60 * 60 * 1000);

    return () => window.clearInterval(timer);
  }, []);

  const durationLabels = useMemo(
    () => ({
      year: t("workExperience.year"),
      years: t("workExperience.years"),
      month: t("workExperience.month"),
      months: t("workExperience.months"),
      less_than_month: t("workExperience.less_than_month"),
    }),
    [t]
  );

  const experiences = t("workExperience.entries");

  return (
    <section id="work-experience" className="mx-auto max-w-7xl px-6 py-28">
      <div className="mb-14 text-center">
        <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700 dark:border-indigo-800/60 dark:bg-indigo-950/50 dark:text-indigo-200">
          {t("workExperience.badge")}
        </span>
        <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          {t("workExperience.heading")}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
          {t("workExperience.description")}
        </p>
      </div>

      <div className="grid gap-6 lg:gap-8">
        {experiences.map((experience, index) => (
          <article
            key={`${experience.company}-${experience.role}-${index}`}
            className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg shadow-indigo-500/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 dark:border-slate-700/40 dark:bg-slate-900/70 sm:p-8"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${experience.accent}`} />

            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
              <div className="flex-1">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white dark:bg-white dark:text-slate-900">
                    {experience.tag || "Experience"}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                    {formatPeriodLabel(experience.startDate, experience.endDate, t("workExperience.present"))}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                    {t("workExperience.duration_label")}: {formatDuration(experience.startDate, experience.endDate || currentDate, durationLabels)}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">{experience.role}</h3>
                <div className="mt-2 flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
                  <a
                    href={experience.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 font-semibold text-slate-800 transition-colors hover:text-indigo-600 dark:text-slate-100 dark:hover:text-indigo-300"
                  >
                    <span>{experience.company}</span>
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                  <span>{experience.location}</span>
                </div>

                <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">{experience.summary}</p>
              </div>

              <div className="lg:w-80 lg:shrink-0">
                <div className="rounded-2xl border border-slate-200/70 bg-slate-50/90 p-4 dark:border-slate-700/70 dark:bg-slate-800/70">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${experience.accent}`} />
                    {t("workExperience.key_impact")}
                  </div>
                  <ul className="space-y-3">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WorkExperience;