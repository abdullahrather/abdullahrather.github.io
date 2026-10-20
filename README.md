# Abdullah Rather — Portfolio

Personal portfolio of Abdullah Rather, Backend / Full-Stack Engineer based in Germany.
Live at **[abdullahrather.com](https://abdullahrather.com)**.

## Stack

| Area      | Choice                                                                 |
| --------- | ---------------------------------------------------------------------- |
| Framework | React 19 + Vite 8                                                      |
| Styling   | Tailwind CSS 4 (CSS-first `@theme` tokens in `src/index.css`)          |
| Fonts     | Geist, Geist Mono, Instrument Serif — self-hosted via Fontsource       |
| Contact   | EmailJS + reCAPTCHA v2 (both lazy-loaded on first form interaction)    |
| i18n      | English / German JSON locales, German fetched on demand                |
| Hosting   | GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)       |

## Features

- Dark-first design with light mode; theme switches with a View Transitions circle reveal and no flash on load
- `⌘K` / `Ctrl+K` command palette: jump to sections, toggle theme or language, copy email, get the resume
- Bento-style About section, count-up stats, live Germany local time
- Filterable project grid with native `<dialog>` case-study modal
- Scroll reveals via a single shared `IntersectionObserver`; CSS scroll-driven progress bar
- Respects `prefers-reduced-motion`, skip link, focus-visible styles, semantic landmarks
- No animation libraries — all motion is CSS

## Project structure

```
src/
  components/      Nav, Hero, About, WorkExperience, Expertise, Projects, Contact, Footer, CommandPalette
  languages/       en.json, de.json — all copy and content (projects, experience, …)
  lib/             i18n, theme, hooks (reveal, spotlight, count-up, clock), site constants, analytics
  index.css        Design tokens + Tailwind theme
public/
  assets/          Resume PDFs (EN / DE)
  images/          Optimized AVIF/WebP images, favicons, OG image
```

Editing content: change `src/languages/en.json` **and** `src/languages/de.json`.
Section headings and UI strings live under the `ui` key in each file.

## Development

```bash
npm install
cp .env.example .env   # EmailJS + reCAPTCHA keys; the form shows a notice when they are missing
npm run dev
npm run build && npm run preview
```

Pushing to `main` builds and deploys to the `gh-pages` branch. The EmailJS / reCAPTCHA values are
read from repository secrets at build time.
