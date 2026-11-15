# Contributing

Thanks for your interest. This is my personal portfolio, so what it says about me is mine to
write, but fixes are welcome.

## What helps

- **Bug reports:** something broken, a layout problem on your device, or an accessibility barrier.
- **Corrections:** typos and translation mistakes in English or German.
- **Small fixes** as pull requests, for any of the above.

New sections, redesigns and changes to my own content are unlikely to be merged. Open an issue first
if you're unsure.

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
- Text lives in `src/languages/en.json` and `src/languages/de.json`. Change both; `npm run check:content`
  finds anything missed.
- Add or update a smoke check when behaviour changes.
- Keep the site free of animation libraries and trackers.

## Releases

Merging a pull request creates a version automatically. It's a patch by default. The labels
`release:minor`, `release:major` and `skip-release` change that.

## Reporting a security problem

Please don't open a public issue. See the [security policy](./SECURITY.md).
