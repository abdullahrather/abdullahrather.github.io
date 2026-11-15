// Refreshes activity.json in the content folder from GitHub, for the GitHub user named in
// site.json: the contribution calendar for the last 12 months and for every year with
// contributions (the same numbers as the user's GitHub profile), and each recently active public
// repository's latest release and latest commit. The deploy workflow runs this before each build.
// Nothing is fetched in the visitor's browser.
//
// The calendar comes from GitHub's GraphQL API, which needs a token: the deploy passes its own
// GITHUB_TOKEN. If GitHub can't be reached, the file is left as it is and the build carries on.
import fs from "node:fs";
import path from "node:path";
import { contentDir, readContent } from "./content.mjs";

const USER = readContent("site.json").github;
const LIST_LENGTH = 5;
const RECENT_DAYS = 183;
const file = path.join(contentDir, "activity.json");

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "portfolio-build",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

const api = async (url) => {
  const response = await fetch(`https://api.github.com${url}`, { headers });
  if (!response.ok) throw new Error(`${response.status} for ${url}`);
  return response.json();
};

const graphql = async (query, variables) => {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });
  const body = await response.json();
  if (!response.ok || body.errors) throw new Error(`calendar: ${body.message ?? body.errors?.[0]?.message}`);
  return body.data;
};

const CALENDAR = `
  query ($login: String!, $from: DateTime, $to: DateTime) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionYears
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount contributionLevel } }
        }
      }
    }
  }`;

const LEVELS = ["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"];

/**
 * One calendar, stored compactly: the first day (a Sunday, as on GitHub), then one count and one
 * shading level (0 to 4) per day from there.
 */
const calendar = async (id, from, to) => {
  const data = await graphql(CALENDAR, { login: USER, from, to });
  const { contributionYears, contributionCalendar } = data.user.contributionsCollection;
  const days = contributionCalendar.weeks.flatMap((week) => week.contributionDays);
  return {
    years: contributionYears,
    calendar: {
      id,
      total: contributionCalendar.totalContributions,
      start: days[0].date,
      counts: days.map((d) => d.contributionCount),
      levels: days.map((d) => LEVELS.indexOf(d.contributionLevel)).join(""),
    },
  };
};

const firstLine = (message) => message.split("\n")[0].trim();

/** Each recently active public repository's latest release and latest commit. */
const lists = async () => {
  const since = new Date(Date.now() - RECENT_DAYS * 24 * 60 * 60 * 1000);
  // The public list only: private repositories never appear here, with or without a token.
  const repos = (await api(`/users/${USER}/repos?type=owner&sort=pushed&per_page=30`)).filter(
    (repo) => !repo.private && !repo.fork && !repo.archived && new Date(repo.pushed_at) >= since,
  );
  const commits = [];
  const releases = [];
  for (const repo of repos) {
    const [repoCommits, repoReleases] = await Promise.all([
      api(`/repos/${USER}/${repo.name}/commits?author=${USER}&since=${since.toISOString()}&per_page=20`),
      api(`/repos/${USER}/${repo.name}/releases?per_page=5`),
    ]);
    // One entry per repository, so a busy one doesn't fill both lists.
    const latest = repoCommits.find(({ commit }) => !commit.message.startsWith("Merge "));
    if (latest) {
      const message = firstLine(latest.commit.message);
      commits.push({ repo: repo.name, message, url: latest.html_url, date: latest.commit.author.date });
    }
    const release = repoReleases.find((entry) => !entry.draft && !entry.prerelease);
    if (release) {
      // Release titles here start with their tag ("v1.2.0 — What changed").
      const name = (release.name || "").replace(release.tag_name, "").replace(/^[\s—–:-]+/, "");
      releases.push({
        repo: repo.name,
        tag: release.tag_name,
        name,
        url: release.html_url,
        date: release.published_at,
      });
    }
  }
  const newest = (a, b) => new Date(b.date) - new Date(a.date);
  return { releases: releases.sort(newest).slice(0, LIST_LENGTH), commits: commits.sort(newest).slice(0, LIST_LENGTH) };
};

const collect = async () => {
  // The last 12 months, as on a GitHub profile, which also lists the years with contributions.
  const recent = await calendar("recent");
  const now = new Date();
  const calendars = [recent.calendar];
  for (const year of recent.years) {
    const end = new Date(`${year}-12-31T23:59:59Z`);
    calendars.push((await calendar(year, `${year}-01-01T00:00:00Z`, (end < now ? end : now).toISOString())).calendar);
  }
  return { updatedAt: now.toISOString(), calendars, ...(await lists()) };
};

if (!USER) {
  console.log("activity: no GitHub user in site.json, so the section stays hidden");
  process.exit(0);
}

try {
  const activity = await collect();
  // One line per calendar keeps the file short; it's written by this script, not by hand.
  const json = JSON.stringify(activity, null, 2).replace(
    /\[\s+([\d,\s]+?)\s+\]/g,
    (_, list) => `[${list.replace(/\s+/g, "")}]`,
  );
  fs.writeFileSync(file, `${json}\n`);
  const [recent, ...years] = activity.calendars;
  console.log(
    `activity: ${recent.total} contributions in the last 12 months, ${years.length} years, ${activity.releases.length} releases listed`,
  );
} catch (error) {
  console.warn(`activity: kept the saved copy (${error.message})`);
}
