// Refreshes activity.json in the content folder from GitHub's public API: commits per day, and
// each recently active public repository's latest release and latest commit, for the GitHub user
// named in site.json. The deploy workflow runs this before each build. Nothing is fetched in the
// visitor's browser.
//
// If GitHub can't be reached, the file is left as it is and the build carries on.
import fs from "node:fs";
import path from "node:path";
import { contentDir, readContent } from "./content.mjs";

const USER = readContent("site.json").github;
const WEEKS = 26;
const LIST_LENGTH = 5;
const file = path.join(contentDir, "activity.json");

const DAY = 24 * 60 * 60 * 1000;
const day = (date) => new Date(date).toISOString().slice(0, 10);

// The grid starts on the Monday WEEKS - 1 weeks before this week's Monday (UTC).
const today = new Date(`${day(Date.now())}T00:00:00Z`);
const monday = new Date(today.getTime() - ((today.getUTCDay() + 6) % 7) * DAY);
const start = new Date(monday.getTime() - (WEEKS - 1) * 7 * DAY);

const api = async (url) => {
  const response = await fetch(`https://api.github.com${url}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "portfolio-build",
      "X-GitHub-Api-Version": "2022-11-28",
      // Set in the deploy workflow for a higher rate limit. Public data needs no token.
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    },
  });
  if (!response.ok) throw new Error(`${response.status} for ${url}`);
  return response.json();
};

const firstLine = (message) => message.split("\n")[0].trim();

/** My commits to one repository since the grid's first day, newest first. */
const commitsSince = async (repo) => {
  const all = [];
  for (let page = 1; ; page += 1) {
    const batch = await api(
      `/repos/${USER}/${repo}/commits?author=${USER}&since=${start.toISOString()}&per_page=100&page=${page}`,
    );
    all.push(...batch);
    if (batch.length < 100) return all;
  }
};

const collect = async () => {
  // The public list only: private repositories never appear here, with or without a token.
  const repos = (await api(`/users/${USER}/repos?type=owner&sort=pushed&per_page=30`)).filter(
    (repo) => !repo.private && !repo.fork && !repo.archived && new Date(repo.pushed_at) >= start,
  );

  const perDay = new Map();
  const commits = [];
  const releases = [];
  const active = new Set();

  for (const repo of repos) {
    const [repoCommits, repoReleases] = await Promise.all([
      commitsSince(repo.name),
      api(`/repos/${USER}/${repo.name}/releases?per_page=5`),
    ]);

    for (const { commit } of repoCommits) {
      perDay.set(day(commit.author.date), (perDay.get(day(commit.author.date)) ?? 0) + 1);
      active.add(repo.name);
    }
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
  const days = [];
  for (let time = start.getTime(); time <= today.getTime(); time += DAY) {
    days.push({ date: day(time), count: perDay.get(day(time)) ?? 0 });
  }

  return {
    updatedAt: new Date().toISOString(),
    total: days.reduce((sum, entry) => sum + entry.count, 0),
    repos: active.size,
    days,
    releases: releases.sort(newest).slice(0, LIST_LENGTH),
    commits: commits.sort(newest).slice(0, LIST_LENGTH),
  };
};

try {
  const activity = await collect();
  fs.writeFileSync(file, `${JSON.stringify(activity, null, 2)}\n`);
  console.log(
    `activity: ${activity.total} commits in ${activity.repos} repositories, ${activity.releases.length} releases listed`,
  );
} catch (error) {
  console.warn(`activity: kept the saved copy (${error.message})`);
}
