# Abdullah Rather — Portfolio

Personal portfolio of Abdullah Rather, AI Software Engineer based in Germany.
Live at **[abdullahrather.com](https://abdullahrather.com)**.

## Stack

| Area      | Choice                                                                 |
| --------- | ---------------------------------------------------------------------- |
| Framework | React 19 + Vite 8, pre-rendered to static HTML at build time and hydrated |
| Styling   | Tailwind CSS 4 (CSS-first `@theme` tokens in `src/index.css`)          |
| Fonts     | Geist, Geist Mono, Instrument Serif — self-hosted via Fontsource       |
| Contact   | EmailJS + reCAPTCHA v2 (both lazy-loaded on first form interaction)    |
| i18n      | English / German JSON locales, German fetched on demand                |
| Hosting   | GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)       |

## Features

- Pre-rendered HTML with inlined CSS: content paints before JavaScript loads, is indexable, and works with JS disabled
- Dark-first design with light mode; theme switches with a View Transitions circle reveal and no flash on load
- `⌘K` / `Ctrl+K` command palette: jump to sections, toggle theme or language, copy email, get the resume
- Bento-style About section, count-up stats, live Germany local time
- Filterable project grid (cards glide between filters via View Transitions) with native `<dialog>` case-study modal
- Scroll reveals via a single shared `IntersectionObserver`; CSS scroll-driven progress bar
- Respects `prefers-reduced-motion`, skip link, focus-visible styles, semantic landmarks
- No animation libraries — all motion is CSS

## Project structure

```
src/
  components/      Nav, Hero, About, WorkExperience, Expertise, Projects, Contact, Footer, CommandPalette
  languages/       en.json, de.json — all copy and content (projects, experience, …)
  lib/             i18n, theme, hooks (reveal, spotlight, count-up, clock), toast, site constants, analytics
  entry-server.jsx Server render used by the build-time pre-render
  index.css        Design tokens + Tailwind theme
scripts/
  build.mjs        Client build + pre-render + CSS inlining (`npm run build`)
public/
  assets/          Resume PDFs (EN / DE)
  images/          Optimized AVIF/WebP images (projects have -640 thumbnails), favicons, OG image
```

Editing content: translated text lives in `src/languages/en.json` **and** `src/languages/de.json`.
Dates, links, images, icons and tech lists live once in `src/data/facts.json`; its lists match the
language files by position, and projects match by `id`.
Section headings and UI strings live under the `ui` key in each file.
New project images: add `name.webp` (1200px wide) and `name-640.webp` (640px wide).

Date-based text (years of experience, durations) is rendered from the build time and refreshed in
the browser, so redeploying is not required for it to stay current.

## Development

```bash
npm install
cp .env.example .env   # EmailJS + reCAPTCHA keys; the form shows a notice when they are missing
npm run dev
npm run build && npm run preview
```

Pushing to `main` builds and deploys to the `gh-pages` branch. The EmailJS / reCAPTCHA values are
read from repository secrets at build time.

## Continuous integration

Every pull request runs `.github/workflows/ci.yml`:

| Check | What it does | Run locally |
| ----- | ------------ | ----------- |
| Lint | ESLint with no warnings allowed | `npm run lint` |
| Content | Matching EN/DE keys, placeholders, images and facts | `npm run check:content` |
| Build | Production build and pre-render | `npm run build` |
| Dependency audit | Fails on high or critical vulnerabilities | `npm audit --audit-level=high` |
| Smoke & accessibility | Browser checks and axe in both themes | `npm run build && npm run test:smoke` |
| Workflow lint | Checks the GitHub Actions files | Runs in CI only |

## Versioning & releases

Versions follow `vMAJOR.MINOR.PATCH` and are created automatically by
`.github/workflows/release.yml` whenever a pull request is merged into `main`:

| PR label        | Result                                | Use for                            |
| --------------- | ------------------------------------- | ---------------------------------- |
| _(none)_        | patch — `v2.0.1` → `v2.0.2`           | fixes, text/content updates        |
| `release:minor` | minor — `v2.0.1` → `v2.1.0`           | new section, feature or project    |
| `release:major` | major — `v2.0.1` → `v3.0.0`           | redesign / rebuild                 |
| `skip-release`  | no tag                                | changes not worth a version        |

Each release gets a tag and a GitHub Release with auto-generated notes. Dependabot PRs are
skipped. `v1.0.0` is the original (pre-2026) site; `v2.0.0` is the redesign.
