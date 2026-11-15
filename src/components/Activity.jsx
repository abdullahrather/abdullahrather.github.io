import { useMemo } from "react";
import SectionHeader from "./SectionHeader";
import { Icon } from "./Icons";
import activity from "../data/activity.json";
import { useTranslation } from "../lib/i18n";
import { spotlight, useReveal } from "../lib/hooks";
import { SOCIALS } from "../lib/site";

const GITHUB = SOCIALS.find((s) => s.id === "github").url;

// Fixed steps, so one very busy day doesn't flatten the rest of the grid.
const level = (count) => (count === 0 ? 0 : count < 3 ? 1 : count < 10 ? 2 : count < 25 ? 3 : 4);
const LEVELS = ["bg-fg/6", "bg-accent/30", "bg-accent/55", "bg-accent/80", "bg-accent"];

const label = "font-mono text-xs uppercase tracking-[0.2em] text-subtle";

const Tile = ({ className = "", delay = 0, children }) => {
  const reveal = useReveal();
  return (
    <div
      ref={reveal}
      onPointerMove={spotlight}
      style={{ "--delay": `${delay}ms` }}
      className={`card spotlight p-6 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
};

/**
 * Commits, releases and a six-month commit grid from my public GitHub repositories.
 * The data is saved at build time (scripts/fetch-activity.mjs), so nothing is requested
 * from GitHub in the visitor's browser.
 */
const Activity = () => {
  const { t, lang } = useTranslation();
  const format = useMemo(() => {
    const locale = lang === "de" ? "de-DE" : "en-GB";
    const date = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
    return (value) => date.format(new Date(value));
  }, [lang]);
  const summary = t("ui.activity.summary", { repos: activity.repos });
  const { days } = activity;

  return (
    <section id="activity" className="section" aria-labelledby="activity-title">
      <div className="container-x">
        <SectionHeader
          id="activity-title"
          eyebrow={t("ui.activity.eyebrow")}
          before={t("ui.activity.heading_a")}
          em={t("ui.activity.heading_em")}
          lead={t("ui.activity.lead")}
        />

        <div className="grid gap-4 lg:grid-cols-5">
          <Tile className="flex flex-col justify-between gap-8 lg:col-span-3">
            <div className="flex items-start justify-between gap-6">
              <p className="max-w-xs text-sm leading-snug text-muted">
                <span className="block text-5xl font-semibold tracking-tighter text-fg tabular-nums sm:text-6xl">
                  {activity.total}
                </span>
                <span className="mt-3 block">{summary}</span>
              </p>
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium"
              >
                <Icon name="github" className="size-4" />
                <span className="sr-only sm:not-sr-only">{t("ui.activity.profile")}</span>
                <Icon
                  name="arrowUpRight"
                  className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>

            <div>
              <div
                role="img"
                aria-label={`${activity.total} ${summary}`}
                className="grid auto-cols-fr grid-flow-col grid-rows-7 gap-0.75 sm:gap-1"
              >
                {days.map((day) => (
                  <span
                    key={day.date}
                    title={`${format(day.date)}: ${day.count}`}
                    className={`aspect-square rounded-[3px] sm:rounded-[5px] ${LEVELS[level(day.count)]}`}
                  />
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 font-mono text-[11px] text-subtle">
                <span>
                  {format(days[0].date)} – {format(days[days.length - 1].date)}
                </span>
                <span className="flex items-center gap-1" aria-hidden="true">
                  {t("ui.activity.less")}
                  {LEVELS.map((color) => (
                    <span key={color} className={`size-2.5 rounded-[3px] ${color}`} />
                  ))}
                  {t("ui.activity.more")}
                </span>
              </div>
            </div>
          </Tile>

          <Tile delay={80} className="lg:col-span-2">
            <h3 className={label}>{t("ui.activity.releases")}</h3>
            <ul className="mt-4 divide-y divide-line">
              {activity.releases.map((release) => (
                <li key={release.url}>
                  <a href={release.url} target="_blank" rel="noopener noreferrer" className="group block py-4">
                    <span className="flex items-center justify-between gap-3">
                      <span className="truncate text-sm font-medium">{release.repo}</span>
                      <span className="chip shrink-0 text-fg">{release.tag}</span>
                    </span>
                    <span className="mt-1.5 line-clamp-2 text-sm leading-snug text-muted transition-colors group-hover:text-fg">
                      {release.name}
                    </span>
                    <span className="mt-2 block font-mono text-[11px] text-subtle">{format(release.date)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Tile>

          <Tile delay={60} className="lg:col-span-5">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className={label}>{t("ui.activity.commits")}</h3>
              <p className="font-mono text-[11px] text-subtle">
                {t("ui.activity.updated", { date: format(activity.updatedAt) })}
              </p>
            </div>
            <ul className="mt-4 divide-y divide-line">
              {activity.commits.map((commit) => (
                <li key={commit.url}>
                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid gap-x-6 gap-y-1 py-3.5 text-sm sm:grid-cols-[14rem_1fr_auto] sm:items-baseline"
                  >
                    <span className="truncate font-mono text-xs text-subtle">{commit.repo}</span>
                    <span className="text-muted transition-colors group-hover:text-fg">{commit.message}</span>
                    <span className="font-mono text-[11px] text-subtle">{format(commit.date)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Tile>
        </div>
      </div>
    </section>
  );
};

export default Activity;
