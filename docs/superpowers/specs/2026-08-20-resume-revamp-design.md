# Resume Site Revamp — Neo-Brutalist Bento Design

**Date:** 2026-08-20
**Repo:** nattapatee.github.io, branch `nattapatee/revamp`
**Status:** Approved by user

## Goal

Full rewrite of the personal resume site. Replace the legacy Parcel 1 + React 16 +
antd/Semantic UI build (2.4MB bundle, hardcoded content, stale data) with a modern,
lightweight, data-driven site with a distinctive visual identity.

## Decisions (user-confirmed)

| Decision | Choice |
|---|---|
| Approach | Full rewrite; old site kept only in git history |
| Content | Modernize wording from old resume; mark uncertain facts with `TODO` for user to fill |
| Visual style | Neo-brutalism (bold colors, thick borders, hard shadows, playful) |
| Layout | Bento grid |
| Stack | Vite + React + TypeScript, custom CSS only (no UI library) |
| Print | Yes — dedicated print stylesheet with clean single-column layout |

## Architecture

### Repo structure

```
/                      # repo root (GitHub Pages serves from master root)
├── site/              # new Vite project (replaces source/)
│   ├── src/
│   │   ├── data/resume.ts        # ALL resume content, typed; single file to edit
│   │   ├── components/
│   │   │   ├── BentoGrid.tsx
│   │   │   ├── tiles/
│   │   │   │   ├── HeroTile.tsx
│   │   │   │   ├── ContactTile.tsx
│   │   │   │   ├── SkillsTile.tsx
│   │   │   │   ├── ExperienceTile.tsx
│   │   │   │   ├── EducationTile.tsx
│   │   │   │   └── LinksTile.tsx
│   │   │   └── PrintResume.tsx   # hidden on screen, visible in @media print
│   │   ├── styles/
│   │   │   ├── tokens.css        # design tokens as CSS custom properties
│   │   │   ├── global.css
│   │   │   └── print.css
│   │   └── hooks/useReducedMotion.ts
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
├── .github/workflows/deploy.yml  # build site/ → publish to Pages
└── docs/superpowers/specs/       # this spec
```

Old `source/` directory and old build artifacts at repo root are deleted as part of
the rewrite (recoverable from git history).

### Data model (`site/src/data/resume.ts`)

Typed object exported from one file:

- `name`, `nickname`, `role`, `summary`
- `contact`: email, phone, line
- `links`: github, linkedin
- `skills`: array of `{ category, items[] }` (Languages / Technologies / Frameworks / Tools)
- `experience`: array of `{ company, role, period, bullets[] }`
- `education`: `{ degree, faculty, university, period, gpa }`
- `personal`: nationality, languages, date of birth (height/weight from old resume dropped — not standard for dev resumes)

Content drafted by modernizing the old `Info.tsx` copy (typos fixed: "Persernal",
"Solfware"). Facts that cannot be verified from the old resume (current employment
status, end date at B Circle, newer skills/projects) get a `// TODO` comment for the
user to fill.

## Visual system

- Background: yellow `#ffde59`; ink: `#111`
- Tile colors: pink `#ff5c8a`, cyan `#5ce1e6`, lime `#b4ff5c`, purple `#c99cff`, white
- Borders `3px solid #111`; hard shadows `6px 6px 0 #111`; no/tiny border-radius
- Typography: Space Grotesk for display, system-ui fallback; monospace accents
- All palette/spacing/duration values as CSS custom properties in `tokens.css`

## Layout

- Desktop: CSS grid, ~4 columns. Hero tile (name/photo/role) spans 2×2;
  Experience is a wide full-width tile; Skills, Contact, Education, Links are
  smaller tiles.
- Mobile: single-column stack ordered by reading priority (hero, contact,
  experience, skills, education, links).
- Breakpoints tested at 320 / 768 / 1024 / 1440.

## Animation (subtle, compositor-friendly only)

- Load: tiles stagger-pop in (scale + translate + opacity, ~60ms stagger)
- Hover: tile lift — shadow grows 6px→10px, translateY(-2px)
- Hero accent: typing effect on role text (blinking block cursor, types once on load)
- Every animation gated behind `prefers-reduced-motion` via `useReducedMotion`
- Animate only `transform`, `opacity`, `box-shadow`

## Print

- `@media print`: bento grid hidden; `PrintResume` renders clean single-column
  black-and-white A4 resume from the same `resume.ts` data
- On-screen Print button triggers `window.print()`

## Deployment

- GitHub Actions workflow: on push to `master`, build `site/`, publish output via
  GitHub Pages (actions/deploy-pages). Root-level legacy build artifacts removed.
- `revamp` branch merges to `master` when the user is satisfied.

## Testing

- Playwright: visual screenshots at 320 / 768 / 1440; print-emulation snapshot;
  h1 visibility smoke test
- Accessibility: keyboard navigation on links/buttons, color-contrast check on
  tile text, reduced-motion verification
- Performance targets per user web rules: LCP < 2.5s, JS < 150kb gzipped (expected
  well under — React + app code only)

## Out of scope

- Blog, multi-page routing, CMS, dark mode (single deliberate visual direction),
  i18n (English only, as before)
