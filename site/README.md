# nattapatee.github.io — resume site

A neo-brutalist bento resume built with Vite + React + TypeScript.

## Editing content

All resume content lives in `src/data/resume.ts`. Look for `TODO(mark)` markers in that file — they flag fields that still need confirmation or updating (summary text, framework list, current job end date, etc.) before the content is considered final.

## Commands

```bash
npm run dev       # start the local dev server
npm run build      # production build
npm run test:e2e   # run the Playwright end-to-end tests
```

## Deploy

Pushes to `master` build via `.github/workflows/deploy.yml` and publish to GitHub Pages. The repository's Pages source must be set to "GitHub Actions" for this to work.
