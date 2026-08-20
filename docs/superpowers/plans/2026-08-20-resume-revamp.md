# Resume Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite nattapatee.github.io as a neo-brutalist bento-grid resume site: Vite + React + TypeScript, data-driven content, subtle animations, print stylesheet, GitHub Pages deploy.

**Architecture:** New Vite project in `site/`. All resume content lives in one typed file `site/src/data/resume.ts`. Screen UI is a CSS-grid bento of tile components; print UI is a separate hidden component shown via `@media print`. No UI libraries — custom CSS with design tokens.

**Tech Stack:** Vite 5+, React 18, TypeScript 5, plain CSS (custom properties), Playwright for E2E, GitHub Actions + GitHub Pages for deploy.

**Spec:** `docs/superpowers/specs/2026-08-20-resume-revamp-design.md`

## Global Constraints

- All work on branch `nattapatee/revamp`; repo root `/Users/tee/orca/workspaces/nattapatee.github.io/revamp`
- Palette (exact): background `#ffde59`, ink `#111`, pink `#ff5c8a`, cyan `#5ce1e6`, lime `#b4ff5c`, purple `#c99cff`, white `#fff`
- Borders `3px solid #111`; hard shadow `6px 6px 0 #111` (hover `10px 10px 0 #111`); no border-radius
- Fonts: Space Grotesk (Google Fonts) display + `system-ui` fallback; monospace accents use `ui-monospace, monospace`
- Animate only `transform`, `opacity`, `box-shadow`; every animation gated by `prefers-reduced-motion`
- No `console.log`. No `any` in app code. Content edits happen ONLY in `site/src/data/resume.ts`
- Uncertain facts (current job status, newer skills) marked with `// TODO(tee):` comments — do not invent facts beyond the old resume
- JS budget < 150kb gzipped

---

### Task 1: Scaffold Vite project in `site/`

**Files:**
- Create: `site/` (via `npm create vite`), then prune boilerplate
- Modify: `site/index.html`, `site/src/main.tsx`, `site/src/App.tsx`
- Delete: `site/src/App.css`, `site/src/index.css`, `site/src/assets/react.svg`, `site/public/vite.svg`

**Interfaces:**
- Produces: running Vite app rendering `<App />` with `<h1>Nattapat Ekapobyothin</h1>` placeholder; `npm run build` green.

- [ ] **Step 1: Scaffold**

```bash
cd /Users/tee/orca/workspaces/nattapatee.github.io/revamp
npm create vite@latest site -- --template react-ts
cd site && npm install
```

- [ ] **Step 2: Prune boilerplate**

Delete `site/src/App.css`, `site/src/index.css`, `site/src/assets/react.svg`, `site/public/vite.svg`.

Replace `site/src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Replace `site/src/App.tsx`:

```tsx
export default function App() {
  return <h1>Nattapat Ekapobyothin</h1>
}
```

Replace `site/index.html` body/head content:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Nattapat Ekapobyothin — Software Developer resume" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet" />
    <title>Nattapat Ekapobyothin — Software Developer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Verify dev + build**

Run: `cd site && npm run build`
Expected: build succeeds, `dist/` created.

- [ ] **Step 4: Commit**

```bash
git add site && git commit -m "feat: scaffold Vite React TS project in site/"
```

---

### Task 2: Design tokens + global styles

**Files:**
- Create: `site/src/styles/tokens.css`, `site/src/styles/global.css`
- Modify: `site/src/main.tsx` (import both)

**Interfaces:**
- Produces: CSS custom properties `--color-bg`, `--color-ink`, `--color-pink`, `--color-cyan`, `--color-lime`, `--color-purple`, `--color-paper`, `--border-brutal`, `--shadow-brutal`, `--shadow-brutal-hover`, `--font-display`, `--font-mono`, `--duration-pop`, `--ease-pop`; class `.tile` used by all tile components.

- [ ] **Step 1: Write `site/src/styles/tokens.css`**

```css
:root {
  --color-bg: #ffde59;
  --color-ink: #111;
  --color-pink: #ff5c8a;
  --color-cyan: #5ce1e6;
  --color-lime: #b4ff5c;
  --color-purple: #c99cff;
  --color-paper: #fff;

  --border-brutal: 3px solid var(--color-ink);
  --shadow-brutal: 6px 6px 0 var(--color-ink);
  --shadow-brutal-hover: 10px 10px 0 var(--color-ink);

  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, monospace;

  --space-tile: clamp(16px, 2vw, 24px);
  --duration-pop: 350ms;
  --ease-pop: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

- [ ] **Step 2: Write `site/src/styles/global.css`**

```css
* {
  box-sizing: border-box;
  margin: 0;
}

body {
  background: var(--color-bg);
  color: var(--color-ink);
  font-family: var(--font-display);
  -webkit-font-smoothing: antialiased;
}

a {
  color: var(--color-ink);
}

.tile {
  background: var(--color-paper);
  border: var(--border-brutal);
  box-shadow: var(--shadow-brutal);
  padding: var(--space-tile);
  transition: box-shadow var(--duration-pop) var(--ease-pop),
    transform var(--duration-pop) var(--ease-pop);
}

.tile:hover {
  box-shadow: var(--shadow-brutal-hover);
  transform: translate(-2px, -2px);
}

.tile h2 {
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
  display: inline-block;
  background: var(--color-ink);
  color: var(--color-bg);
  padding: 2px 10px;
}

@media (prefers-reduced-motion: reduce) {
  .tile,
  .tile:hover {
    transition: none;
    transform: none;
  }
}
```

- [ ] **Step 3: Import in `site/src/main.tsx`** (above App import)

```tsx
import './styles/tokens.css'
import './styles/global.css'
```

- [ ] **Step 4: Verify**

Run: `cd site && npm run build`
Expected: PASS. `npm run dev`, open page: yellow background, Space Grotesk heading.

- [ ] **Step 5: Commit**

```bash
git add site/src && git commit -m "feat: add neo-brutalist design tokens and global styles"
```

---

### Task 3: Typed resume data

**Files:**
- Create: `site/src/data/resume.ts`

**Interfaces:**
- Produces (consumed by all tiles + PrintResume):

```ts
export interface SkillGroup { category: string; items: string[] }
export interface Experience { company: string; role: string; period: string; bullets: string[] }
export interface Education { degree: string; faculty: string; university: string; period: string; gpa: string }
export interface Resume {
  name: string; nickname: string; role: string; summary: string
  contact: { email: string; phone: string; line: string }
  links: { github: string; linkedin: string }
  skills: SkillGroup[]
  experience: Experience[]
  education: Education
  personal: { nationality: string; languages: string; dateOfBirth: string }
}
export const resume: Resume
```

- [ ] **Step 1: Write `site/src/data/resume.ts`**

```ts
export interface SkillGroup {
  category: string
  items: string[]
}

export interface Experience {
  company: string
  role: string
  period: string
  bullets: string[]
}

export interface Education {
  degree: string
  faculty: string
  university: string
  period: string
  gpa: string
}

export interface Resume {
  name: string
  nickname: string
  role: string
  summary: string
  contact: { email: string; phone: string; line: string }
  links: { github: string; linkedin: string }
  skills: SkillGroup[]
  experience: Experience[]
  education: Education
  personal: { nationality: string; languages: string; dateOfBirth: string }
}

export const resume: Resume = {
  name: 'Nattapat Ekapobyothin',
  nickname: 'Tee',
  role: 'Software Developer',
  // TODO(tee): confirm summary — drafted from old resume objective
  summary:
    'Software developer focused on frontend and document-management systems. ' +
    'Building web applications with React, TypeScript and .NET for enterprise clients.',
  contact: {
    email: 'nattapat.ek@gmail.com',
    phone: '087-549-5690',
    line: 'neogonn',
  },
  links: {
    github: 'https://github.com/nattapatee',
    linkedin: 'https://www.linkedin.com/in/nattapat-ekapobyothin-4967a3200/',
  },
  skills: [
    {
      category: 'Languages',
      items: ['TypeScript', 'JavaScript', 'C#', 'SQL', 'VB.NET'],
    },
    {
      category: 'Frameworks',
      // TODO(tee): add newer frameworks if any (e.g. Next.js?)
      items: ['React', 'Vue.js', 'ASP.NET Core', 'Entity Framework', 'SignalR', 'jQuery'],
    },
    {
      category: 'Technologies',
      items: ['Docker', 'Node.js', 'Keycloak', 'Alfresco', 'PDF.js', 'WebTwain'],
    },
    {
      category: 'Tools',
      items: ['Git', 'GitHub Actions', 'Azure DevOps', 'Figma', 'Jira', 'IIS', 'VS Code'],
    },
  ],
  experience: [
    {
      company: 'B Circle Co., Ltd.',
      role: 'Software Developer',
      // TODO(tee): confirm still current, or add end date + newer jobs above this one
      period: 'Mar 2019 — Present',
      bullets: [
        'Built frontend and UI design for E-Document (Sarabun) system for Kasetsart University.',
        'Built frontend and UI design for the document and records management system of the Civil Aviation Authority of Thailand.',
        'Developed scan-service report web apps for DHL, Isuzu and TIP Insure.',
        'Developed Alfresco custom UI for Ngern Tid Lor and Kasikorn Securities.',
        'Developed Alfresco workflow reports, mass-approve app and Keycloak login page for PTT OR.',
        'Developed a knowledge-management web app for Apollo (oil industry).',
        'Designed web applications in Figma for custom projects; mentored interns.',
      ],
    },
  ],
  education: {
    degree: 'B.B.A. Business Information Technology',
    faculty: 'Faculty of Business Administration',
    university: 'Rajamangala University of Technology Rattanakosin',
    period: '2015 — 2019',
    gpa: '2.76',
  },
  personal: {
    nationality: 'Thai',
    languages: 'Thai (native), English (upper-intermediate)',
    dateOfBirth: '11 October 1996',
  },
}
```

- [ ] **Step 2: Verify types compile**

Run: `cd site && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add site/src/data && git commit -m "feat: add typed resume data (content modernized from old site)"
```

---

### Task 4: Reduced-motion + typewriter hooks

**Files:**
- Create: `site/src/hooks/useReducedMotion.ts`, `site/src/hooks/useTypewriter.ts`

**Interfaces:**
- Produces: `useReducedMotion(): boolean`; `useTypewriter(text: string, msPerChar?: number): string` (returns full text immediately when reduced motion).

- [ ] **Step 1: Write `site/src/hooks/useReducedMotion.ts`**

```ts
import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return reduced
}
```

- [ ] **Step 2: Write `site/src/hooks/useTypewriter.ts`**

```ts
import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

export function useTypewriter(text: string, msPerChar = 60): string {
  const reduced = useReducedMotion()
  const [length, setLength] = useState(0)

  useEffect(() => {
    if (reduced) {
      setLength(text.length)
      return
    }
    setLength(0)
    const timer = setInterval(() => {
      setLength((current) => {
        if (current >= text.length) {
          clearInterval(timer)
          return current
        }
        return current + 1
      })
    }, msPerChar)
    return () => clearInterval(timer)
  }, [text, msPerChar, reduced])

  return text.slice(0, length)
}
```

- [ ] **Step 3: Verify**

Run: `cd site && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add site/src/hooks && git commit -m "feat: add reduced-motion and typewriter hooks"
```

---

### Task 5: Tile components + bento grid

**Files:**
- Create: `site/src/components/tiles/HeroTile.tsx`, `ContactTile.tsx`, `SkillsTile.tsx`, `ExperienceTile.tsx`, `EducationTile.tsx`, `LinksTile.tsx` (all under `site/src/components/tiles/`)
- Create: `site/src/components/BentoGrid.tsx`, `site/src/components/bento.css`
- Modify: `site/src/App.tsx`

**Interfaces:**
- Consumes: `resume` from `../../data/resume`, `useTypewriter` from `../../hooks/useTypewriter`.
- Produces: `<BentoGrid />` rendering all tiles; grid classes `bento`, `tile--hero`, `tile--experience` etc.

- [ ] **Step 1: Write `site/src/components/bento.css`**

```css
.bento {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(14px, 2vw, 24px);
  max-width: 1100px;
  margin: 0 auto;
  padding: clamp(20px, 4vw, 48px);
}

.tile--hero { grid-column: span 2; grid-row: span 2; background: var(--color-paper); }
.tile--contact { grid-column: span 2; background: var(--color-pink); }
.tile--skills { grid-column: span 2; background: var(--color-cyan); }
.tile--experience { grid-column: span 4; background: var(--color-paper); }
.tile--education { grid-column: span 2; background: var(--color-lime); }
.tile--links { grid-column: span 2; background: var(--color-purple); }

.hero-name {
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -1px;
  text-transform: uppercase;
}

.hero-role {
  font-family: var(--font-mono);
  font-size: clamp(1rem, 2vw, 1.25rem);
  margin-top: 12px;
  min-height: 1.5em;
}

.hero-role::after {
  content: '';
  display: inline-block;
  width: 0.6em;
  height: 1.1em;
  background: var(--color-ink);
  vertical-align: text-bottom;
  margin-left: 2px;
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-role::after { animation: none; }
}

.skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }

.skill-tag {
  background: var(--color-paper);
  border: 2px solid var(--color-ink);
  box-shadow: 3px 3px 0 var(--color-ink);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 3px 10px;
}

.xp-item + .xp-item { margin-top: 20px; }
.xp-head { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 6px; }
.xp-company { font-weight: 700; font-size: 1.05rem; }
.xp-period { font-family: var(--font-mono); font-size: 0.85rem; }
.xp-bullets { margin: 10px 0 0 20px; line-height: 1.6; font-size: 0.95rem; }

.contact-row { font-size: 0.95rem; line-height: 1.9; overflow-wrap: anywhere; }
.contact-row b { text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px; }

.links-buttons { display: flex; flex-direction: column; gap: 12px; }

.brutal-button {
  display: inline-block;
  background: var(--color-paper);
  border: var(--border-brutal);
  box-shadow: 4px 4px 0 var(--color-ink);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.95rem;
  padding: 10px 16px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: box-shadow 150ms ease, transform 150ms ease;
}

.brutal-button:hover {
  box-shadow: 7px 7px 0 var(--color-ink);
  transform: translate(-2px, -2px);
}

.brutal-button:active {
  box-shadow: 1px 1px 0 var(--color-ink);
  transform: translate(3px, 3px);
}

.brutal-button:focus-visible {
  outline: 3px dashed var(--color-ink);
  outline-offset: 3px;
}

@media (max-width: 767px) {
  .bento { grid-template-columns: 1fr; }
  .tile--hero, .tile--contact, .tile--skills,
  .tile--experience, .tile--education, .tile--links { grid-column: span 1; grid-row: auto; }
}
```

- [ ] **Step 2: Write tiles**

`site/src/components/tiles/HeroTile.tsx`:

```tsx
import { resume } from '../../data/resume'
import { useTypewriter } from '../../hooks/useTypewriter'

export function HeroTile() {
  const typedRole = useTypewriter(resume.role)

  return (
    <section className="tile tile--hero" aria-labelledby="hero-heading">
      <h1 id="hero-heading" className="hero-name">
        {resume.name}
      </h1>
      <p className="hero-role">{typedRole}</p>
      <p style={{ marginTop: 16, lineHeight: 1.6 }}>{resume.summary}</p>
    </section>
  )
}
```

`site/src/components/tiles/ContactTile.tsx`:

```tsx
import { resume } from '../../data/resume'

export function ContactTile() {
  const { email, phone, line } = resume.contact

  return (
    <section className="tile tile--contact" aria-labelledby="contact-heading">
      <h2 id="contact-heading">Contact</h2>
      <p className="contact-row"><b>Email</b> <a href={`mailto:${email}`}>{email}</a></p>
      <p className="contact-row"><b>Tel</b> <a href={`tel:${phone.replaceAll('-', '')}`}>{phone}</a></p>
      <p className="contact-row"><b>Line</b> {line}</p>
    </section>
  )
}
```

`site/src/components/tiles/SkillsTile.tsx`:

```tsx
import { resume } from '../../data/resume'

export function SkillsTile() {
  return (
    <section className="tile tile--skills" aria-labelledby="skills-heading">
      <h2 id="skills-heading">Skills</h2>
      <div className="skill-tags">
        {resume.skills.flatMap((group) =>
          group.items.map((item) => (
            <span className="skill-tag" key={`${group.category}-${item}`}>
              {item}
            </span>
          )),
        )}
      </div>
    </section>
  )
}
```

`site/src/components/tiles/ExperienceTile.tsx`:

```tsx
import { resume } from '../../data/resume'

export function ExperienceTile() {
  return (
    <section className="tile tile--experience" aria-labelledby="experience-heading">
      <h2 id="experience-heading">Experience</h2>
      {resume.experience.map((job) => (
        <article className="xp-item" key={`${job.company}-${job.period}`}>
          <div className="xp-head">
            <span className="xp-company">
              {job.role} @ {job.company}
            </span>
            <span className="xp-period">{job.period}</span>
          </div>
          <ul className="xp-bullets">
            {job.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  )
}
```

`site/src/components/tiles/EducationTile.tsx`:

```tsx
import { resume } from '../../data/resume'

export function EducationTile() {
  const { degree, faculty, university, period, gpa } = resume.education

  return (
    <section className="tile tile--education" aria-labelledby="education-heading">
      <h2 id="education-heading">Education</h2>
      <p style={{ fontWeight: 700 }}>{degree}</p>
      <p>{faculty}</p>
      <p>{university}</p>
      <p className="xp-period" style={{ marginTop: 6 }}>
        {period} · GPA {gpa}
      </p>
    </section>
  )
}
```

`site/src/components/tiles/LinksTile.tsx`:

```tsx
import { resume } from '../../data/resume'

export function LinksTile() {
  return (
    <section className="tile tile--links" aria-labelledby="links-heading">
      <h2 id="links-heading">Find me</h2>
      <div className="links-buttons">
        <a className="brutal-button" href={resume.links.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <a className="brutal-button" href={resume.links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <button className="brutal-button" type="button" onClick={() => window.print()}>
          Print resume 🖨
        </button>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Write `site/src/components/BentoGrid.tsx`**

```tsx
import './bento.css'
import { HeroTile } from './tiles/HeroTile'
import { ContactTile } from './tiles/ContactTile'
import { SkillsTile } from './tiles/SkillsTile'
import { ExperienceTile } from './tiles/ExperienceTile'
import { EducationTile } from './tiles/EducationTile'
import { LinksTile } from './tiles/LinksTile'

export function BentoGrid() {
  return (
    <main className="bento">
      <HeroTile />
      <ContactTile />
      <SkillsTile />
      <ExperienceTile />
      <EducationTile />
      <LinksTile />
    </main>
  )
}
```

Replace `site/src/App.tsx`:

```tsx
import { BentoGrid } from './components/BentoGrid'

export default function App() {
  return <BentoGrid />
}
```

- [ ] **Step 4: Verify**

Run: `cd site && npx tsc --noEmit && npm run build`
Expected: PASS. `npm run dev`: bento renders — hero 2×2, wide experience tile, colored tiles, hover lift works, role types out.

- [ ] **Step 5: Commit**

```bash
git add site/src && git commit -m "feat: add bento grid with neo-brutalist tiles"
```

---

### Task 6: Staggered load animation

**Files:**
- Modify: `site/src/components/bento.css`, `site/src/components/BentoGrid.tsx`

**Interfaces:**
- Produces: tiles animate in with staggered pop on first load; disabled under reduced motion.

- [ ] **Step 1: Append to `site/src/components/bento.css`**

```css
@media (prefers-reduced-motion: no-preference) {
  .bento > .tile {
    animation: tile-pop var(--duration-pop) var(--ease-pop) both;
    animation-delay: calc(var(--tile-index, 0) * 60ms);
  }

  @keyframes tile-pop {
    from {
      opacity: 0;
      transform: translateY(14px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
}
```

- [ ] **Step 2: Set `--tile-index` in `BentoGrid.tsx`**

Replace the `<main>` body:

```tsx
export function BentoGrid() {
  const tiles = [HeroTile, ContactTile, SkillsTile, ExperienceTile, EducationTile, LinksTile]

  return (
    <main className="bento">
      {tiles.map((Tile, index) => (
        <div key={Tile.name} style={{ display: 'contents', ['--tile-index' as string]: index }}>
          <Tile />
        </div>
      ))}
    </main>
  )
}
```

Note: `display: contents` wrapper keeps grid placement on the tile itself while letting us pass the index custom property down; the CSS var inherits.

- [ ] **Step 3: Verify**

Run: `cd site && npx tsc --noEmit && npm run build`
Expected: PASS. Dev server: tiles pop in one after another on reload. Toggle "reduce motion" in OS/devtools (`Rendering → Emulate prefers-reduced-motion`) — tiles appear instantly, no cursor blink, role text full immediately.

- [ ] **Step 4: Commit**

```bash
git add site/src && git commit -m "feat: staggered tile entrance animation with reduced-motion guard"
```

---

### Task 7: Print resume

**Files:**
- Create: `site/src/components/PrintResume.tsx`, `site/src/styles/print.css`
- Modify: `site/src/App.tsx`, `site/src/main.tsx` (import print.css)

**Interfaces:**
- Consumes: `resume` from `../data/resume`.
- Produces: `<PrintResume />` hidden on screen (`.print-only`), full clean A4 layout in print; bento hidden in print (`.screen-only`).

- [ ] **Step 1: Write `site/src/components/PrintResume.tsx`**

```tsx
import { resume } from '../data/resume'

export function PrintResume() {
  return (
    <div className="print-only print-resume">
      <header>
        <h1>{resume.name} ({resume.nickname})</h1>
        <p>{resume.role}</p>
        <p>
          {resume.contact.email} · {resume.contact.phone} · Line: {resume.contact.line}
        </p>
        <p>
          {resume.links.github} · {resume.links.linkedin}
        </p>
      </header>

      <section>
        <h2>Summary</h2>
        <p>{resume.summary}</p>
      </section>

      <section>
        <h2>Experience</h2>
        {resume.experience.map((job) => (
          <div key={`${job.company}-${job.period}`}>
            <p>
              <strong>{job.role} — {job.company}</strong> ({job.period})
            </p>
            <ul>
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        {resume.skills.map((group) => (
          <p key={group.category}>
            <strong>{group.category}:</strong> {group.items.join(', ')}
          </p>
        ))}
      </section>

      <section>
        <h2>Education</h2>
        <p>{resume.education.degree}</p>
        <p>
          {resume.education.university}, {resume.education.period} · GPA {resume.education.gpa}
        </p>
      </section>

      <section>
        <h2>Personal</h2>
        <p>Nationality: {resume.personal.nationality}</p>
        <p>Languages: {resume.personal.languages}</p>
        <p>Date of birth: {resume.personal.dateOfBirth}</p>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Write `site/src/styles/print.css`**

```css
.print-only {
  display: none;
}

@media print {
  .screen-only {
    display: none !important;
  }

  .print-only {
    display: block;
  }

  body {
    background: #fff;
    color: #000;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 11pt;
  }

  .print-resume {
    max-width: 100%;
  }

  .print-resume header {
    border-bottom: 2px solid #000;
    padding-bottom: 8pt;
    margin-bottom: 12pt;
  }

  .print-resume h1 {
    font-size: 20pt;
    margin-bottom: 2pt;
  }

  .print-resume h2 {
    font-size: 13pt;
    text-transform: uppercase;
    letter-spacing: 1pt;
    border-bottom: 1px solid #000;
    margin: 12pt 0 6pt;
  }

  .print-resume ul {
    margin: 4pt 0 8pt 16pt;
  }

  .print-resume section {
    break-inside: avoid;
  }
}
```

- [ ] **Step 3: Wire up**

`site/src/App.tsx`:

```tsx
import { BentoGrid } from './components/BentoGrid'
import { PrintResume } from './components/PrintResume'

export default function App() {
  return (
    <>
      <div className="screen-only">
        <BentoGrid />
      </div>
      <PrintResume />
    </>
  )
}
```

`site/src/main.tsx`: add `import './styles/print.css'` after global.css import.

- [ ] **Step 4: Verify**

Run: `cd site && npx tsc --noEmit && npm run build`
Expected: PASS. Dev server → DevTools `Rendering → Emulate CSS media type: print`: bento gone, clean black/white single-column resume shows.

- [ ] **Step 5: Commit**

```bash
git add site/src && git commit -m "feat: add print resume with dedicated print stylesheet"
```

---

### Task 8: Playwright tests

**Files:**
- Create: `site/playwright.config.ts`, `site/tests/resume.spec.ts`
- Modify: `site/package.json` (add `test:e2e` script)

**Interfaces:**
- Consumes: running site (Playwright webServer starts `npm run dev`).
- Produces: `npm run test:e2e` green.

- [ ] **Step 1: Install**

```bash
cd site
npm install -D @playwright/test
npx playwright install chromium
```

Add to `site/package.json` scripts: `"test:e2e": "playwright test"`.

- [ ] **Step 2: Write `site/playwright.config.ts`**

```ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  webServer: {
    command: 'npm run dev -- --port 5199',
    port: 5199,
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://localhost:5199',
  },
})
```

- [ ] **Step 3: Write `site/tests/resume.spec.ts`**

```ts
import { test, expect } from '@playwright/test'

test('hero renders name and typed role', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('Nattapat Ekapobyothin')
  await expect(page.locator('.hero-role')).toContainText('Software Developer')
})

test('all six tiles render', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.bento .tile')).toHaveCount(6)
})

for (const width of [320, 768, 1440]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    expect(overflow).toBe(false)
    await page.screenshot({ path: `test-results/screen-${width}.png`, fullPage: true })
  })
}

test('print media shows print resume, hides bento', async ({ page }) => {
  await page.emulateMedia({ media: 'print' })
  await page.goto('/')
  await expect(page.locator('.print-resume')).toBeVisible()
  await expect(page.locator('.bento')).toBeHidden()
})

test('reduced motion shows full role text immediately', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('.hero-role')).toHaveText('Software Developer')
})

test('links are keyboard reachable', async ({ page }) => {
  await page.goto('/')
  const github = page.getByRole('link', { name: /github/i })
  await github.focus()
  await expect(github).toBeFocused()
})
```

- [ ] **Step 4: Run tests**

Run: `cd site && npm run test:e2e`
Expected: all PASS. Inspect `test-results/screen-*.png` — layout correct at each width.

- [ ] **Step 5: Commit**

```bash
git add site/playwright.config.ts site/tests site/package.json site/package-lock.json
git commit -m "test: add Playwright e2e coverage (layout, print, reduced motion, a11y)"
```

Add `site/test-results/`, `site/node_modules/`, `site/dist/` to root `.gitignore` if not ignored, in the same commit.

---

### Task 9: Deploy workflow + legacy cleanup

**Files:**
- Create: `.github/workflows/deploy.yml`
- Delete: `source/`, root legacy artifacts (`src.*.js*`, `src.*.css*`, `*.woff*`, `*.ttf`, `*.eot`, `*.svg` icon fonts, `coding.*.png`, `flags.*.png`, old `index.html`)
- Keep: `Profile.7615260b.jpeg` → move to `site/public/profile.jpeg` (may be used later)

**Interfaces:**
- Produces: pushing `master` builds `site/` and deploys to GitHub Pages.

- [ ] **Step 1: Write `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: site
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: site/package-lock.json
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: site/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Move profile photo, delete legacy files**

```bash
git mv Profile.7615260b.jpeg site/public/profile.jpeg
git rm -r source
git rm index.html src.*.js src.*.js.map src.*.css src.*.css.map \
  brand-icons.* icons.* outline-icons.* coding.*.png flags.*.png
```

- [ ] **Step 3: Verify clean build still works**

Run: `cd site && npm run build && npm run test:e2e`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: add Pages deploy workflow, remove legacy Parcel build and source"
```

- [ ] **Step 5: Manual follow-up for user (not automated)**

Repo Settings → Pages → Source: **GitHub Actions** (currently "deploy from branch"). Required before workflow-based deploy works. Merge `nattapatee/revamp` → `master` when satisfied.

---

## Final verification

- [ ] `cd site && npx tsc --noEmit && npm run build && npm run test:e2e` — all green
- [ ] Bundle check: `ls -lh site/dist/assets` — main JS gzips under 150kb (`gzip -c site/dist/assets/*.js | wc -c`)
- [ ] Visual pass in browser at 320/768/1440 + print preview
- [ ] Remaining `TODO(tee)` markers listed for user to fill in `site/src/data/resume.ts`
