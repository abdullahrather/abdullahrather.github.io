import { useEffect, useMemo, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import { Icon } from "./Icons";
import activity from "@content/activity.json";
import { useTranslation } from "../lib/i18n";
import { spotlight, useReveal } from "../lib/hooks";
import { SITE, SOCIALS } from "../lib/site";

const GITHUB = SOCIALS.find((s) => s.id === "github")?.url ?? `https://github.com/${SITE.github}`;

// GitHub's five shading levels, from no contributions to the busiest days.
const LEVELS = ["bg-fg/6", "bg-accent/30", "bg-accent/55", "bg-accent/80", "bg-accent"];
const DAY = 24 * 60 * 60 * 1000;

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

/** Lays out one calendar as GitHub does: a column per week, Sunday at the top. */
const layout = (calendar) => {
  const start = Date.parse(`${calendar.start}T00:00:00Z`);
  const offset = new Date(start).getUTCDay();
  const days = calendar.counts.map((count, i) => {
    const date = new Date(start + i * DAY);
    return {
      date,
      count,
      level: Number(calendar.levels[i]),
      column: Math.floor((offset + i) / 7),
      row: (offset + i) % 7,
    };
  });
  // A month's name goes above the week holding its first day, and the first month's above the
  // first week. A name too close to the one before it is left out, so they never overlap.
  const months = [];
  for (const day of days) {
    if (day !== days[0] && day.date.getUTCDate() !== 1) continue;
    if (months.length && day.column < months.at(-1).column + 3) {
      if (months.length === 1 && day !== days[0]) months.pop();
      else continue;
    }
    months.push({ date: day.date, column: day.column });
  }
  return { days, months, weeks: days.at(-1).column + 1 };
};

/**
 * Contributions, releases and commits from GitHub: a contribution calendar like the one on a
 * GitHub profile, for the last 12 months or any year, and each recently active public
 * repository's latest release and commit. The data is saved at build time
 * (scripts/fetch-activity.mjs), so nothing is requested from GitHub in the visitor's browser.
 * Shown only when site.json names a GitHub user and a calendar has been saved.
 */
const Activity = () => {
  const { t, lang } = useTranslation();
  const calendars = useMemo(() => activity.calendars ?? [], []);
  const [selected, setSelected] = useState("recent");
  const [hovered, setHovered] = useState(null);
  const scroller = useRef(null);

  const locale = lang === "de" ? "de-DE" : "en-GB";
  const formats = useMemo(
    () => ({
      date: new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }),
      month: new Intl.DateTimeFormat(locale, { month: "short", timeZone: "UTC" }),
      weekday: new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }),
    }),
    [locale],
  );
  const format = (value) => formats.date.format(new Date(value));

  const calendar = calendars.find((c) => c.id === selected) ?? calendars[0];
  const grid = useMemo(() => (calendar ? layout(calendar) : null), [calendar]);

  // The newest weeks are on the right; on a narrow screen, start there.
  useEffect(() => {
    if (scroller.current) scroller.current.scrollLeft = scroller.current.scrollWidth;
  }, [selected]);

  if (!SITE.github || !grid) return null;

  const totalLabel =
    calendar.id === "recent" ? t("ui.activity.total_recent") : t("ui.activity.total_year", { year: calendar.id });
  const describe = (day) =>
    t(day.count === 0 ? "ui.activity.day_none" : day.count === 1 ? "ui.activity.day_one" : "ui.activity.day", {
      count: day.count,
      date: formats.date.format(day.date),
    });
  const choices = [
    { id: "recent", name: t("ui.activity.recent") },
    ...calendars.filter((c) => c.id !== "recent").map((c) => ({ id: c.id, name: String(c.id) })),
  ];
  // Sunday 2 Jan 2000, for the names of Monday, Wednesday and Friday.
  const weekday = (row) => formats.weekday.format(new Date(Date.UTC(2000, 0, 2 + row)));

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

        <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-5">
          <Tile className="lg:col-span-5">
            <div className="flex items-start justify-between gap-6">
              <p className="text-sm leading-snug text-muted">
                <span className="block text-5xl font-semibold tracking-tighter text-fg tabular-nums sm:text-6xl">
                  {calendar.total}
                </span>
                <span className="mt-3 block">{totalLabel}</span>
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

            <div className="mt-8 flex flex-col gap-6 lg:flex-row-reverse lg:gap-8">
              {/* Which calendar to show: a list on the right, as on GitHub, or a row on a phone. */}
              <div
                role="group"
                aria-label={t("ui.activity.years")}
                className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 lg:mx-0 lg:w-36 lg:shrink-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0 lg:pb-0"
              >
                {choices.map((choice) => {
                  const isActive = choice.id === calendar.id;
                  return (
                    <button
                      key={choice.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => {
                        setSelected(choice.id);
                        setHovered(null);
                      }}
                      className={`shrink-0 rounded-full px-3.5 py-1.5 text-left text-sm transition-colors lg:rounded-lg lg:py-1 ${
                        isActive ? "bg-fg text-bg" : "text-muted hover:bg-fg/6 hover:text-fg"
                      }`}
                    >
                      {choice.name}
                    </button>
                  );
                })}
              </div>

              <div className="min-w-0 flex-1">
                <div ref={scroller} className="overflow-x-auto pb-2">
                  <div className="grid min-w-[40rem] grid-cols-[2.25rem_1fr] gap-x-2">
                    <span aria-hidden="true" />
                    <div
                      aria-hidden="true"
                      className="grid h-5 font-mono text-[11px] text-subtle"
                      style={{ gridTemplateColumns: `repeat(${grid.weeks}, minmax(0, 1fr))` }}
                    >
                      {grid.months.map((month) => (
                        <span
                          key={month.date.toISOString()}
                          className="whitespace-nowrap"
                          style={{ gridColumn: month.column + 1 }}
                        >
                          {formats.month.format(month.date)}
                        </span>
                      ))}
                    </div>

                    <div
                      aria-hidden="true"
                      className="grid grid-rows-7 gap-0.75 font-mono text-[10px] text-subtle sm:gap-1"
                    >
                      {[1, 3, 5].map((row) => (
                        <span key={row} className="flex items-center" style={{ gridRow: row + 1 }}>
                          {weekday(row)}
                        </span>
                      ))}
                    </div>
                    <div
                      role="img"
                      aria-label={`${calendar.total} ${totalLabel}`}
                      className="grid grid-rows-7 gap-0.75 sm:gap-1"
                      style={{ gridTemplateColumns: `repeat(${grid.weeks}, minmax(0, 1fr))` }}
                      onPointerOver={(event) => {
                        const i = event.target.dataset?.i;
                        if (i !== undefined) setHovered(Number(i));
                      }}
                      onPointerLeave={() => setHovered(null)}
                    >
                      {grid.days.map((day, i) => (
                        <span
                          key={day.date.toISOString()}
                          data-i={i}
                          title={describe(day)}
                          style={{ gridColumn: day.column + 1, gridRow: day.row + 1 }}
                          className={`aspect-square rounded-[3px] ${LEVELS[day.level]} ${hovered === i ? "ring-2 ring-fg/40" : ""}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono text-[11px] text-subtle">
                  <span aria-live="polite">
                    {hovered === null ? t("ui.activity.hint") : describe(grid.days[hovered])}
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

          <Tile delay={60} className="lg:col-span-3">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className={label}>{t("ui.activity.commits")}</h3>
              <p className="font-mono text-[11px] text-subtle">
                {t("ui.activity.updated", { date: format(activity.updatedAt) })}
              </p>
            </div>
            <ul className="mt-4 divide-y divide-line">
              {activity.commits.map((commit) => (
                <li key={commit.url}>
                  <a href={commit.url} target="_blank" rel="noopener noreferrer" className="group block py-4 text-sm">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="truncate font-mono text-xs text-subtle">{commit.repo}</span>
                      <span className="shrink-0 font-mono text-[11px] text-subtle">{format(commit.date)}</span>
                    </span>
                    <span className="mt-1.5 block leading-snug text-muted transition-colors group-hover:text-fg">
                      {commit.message}
                    </span>
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
