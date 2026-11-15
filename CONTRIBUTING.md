# Contributing

Thanks for your interest. This repository is a portfolio template, and the code behind my own site.
Fixes and improvements to the template are welcome.

## What helps

- **Bug reports:** something broken, a layout problem on your device, or an accessibility barrier.
- **Corrections:** typos and translation mistakes in the interface text or the demo content.
- **Small fixes** as pull requests, for any of the above.

Large changes such as new sections or a redesign are unlikely to be merged. Open an issue first if
you're unsure.

## Getting started

You need Node.js 22 or newer.

```bash
npm install
npm run dev
```

The contact form shows a notice when its keys are missing. That's expected, and nothing else needs them.

## Before you open a pull request

Run these checks, which CI also runs:

```bash
npm run lint
npm run format:check
npm run check:content
npm run build
npm run test:smoke
```

`npm run test:smoke` needs the build first, and a browser: run `npx playwright install chromium`
once, or set `PW_CHANNEL=msedge` to use an installed Edge.

## Guidelines

- Keep each pull request to one change, and explain why it's needed.
- Text lives in `content/en.json` and `content/de.json`. Change both; `npm run check:content`
  finds anything missed.
- Add or update a smoke check when behaviour changes.
- Keep the site free of animation libraries and trackers.

## Releases

Merging a pull request creates a version automatically. It's a patch by default. The labels
`release:minor`, `release:major` and `skip-release` change that.

## Reporting a security problem

Please don't open a public issue. See the [security policy](./SECURITY.md).
