# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Production build
npm run start        # Serve the production build (port 3000)
npm run typecheck    # Run react-router typegen + tsc
```

No lint or test commands are configured yet.

## Architecture

This is **RESUMEIND** — an AI-powered resume analyzer built with React Router v7 (full-stack, SSR enabled). It displays resume cards with AI-generated feedback scores.

**Stack**: React 19 + TypeScript, React Router v7 (SSR), Tailwind CSS 4, Vite 8, pdfjs-dist

**Data flow**:
- `constants/index.ts` holds hardcoded demo resume data and the AI prompt template (`prepareInstructions`)
- `types/index.d.ts` defines the `Resume` and `Feedback` interfaces
- `app/routes/home.tsx` imports the resume array and renders a `ResumeCard` per resume
- `ResumeCard` renders company name, job title, and delegates score visualization to `ScoreCircle`

**Feedback data shape** (JSON returned by AI):
```
{ overallScore, ATS, toneAndStyle, content, structure, skills }
```
Each category has `{ score: 0-100, tips: [{ type: "good"|"improve", tip, explanation? }] }`.

## What's implemented vs. pending

| Feature | Status |
|---|---|
| Home page with resume cards | Done |
| `ScoreCircle` SVG animated component | Done |
| AI prompt template | Done (in `constants/index.ts`) |
| `/upload` route | Not yet built (Navbar links to it) |
| `/resume/:id` detail route | Not yet built (ResumeCard links to it) |
| Actual AI API calls | Not yet implemented |
| PDF parsing via pdfjs-dist | Dependency added, not wired up |

## Path aliases

`~/*` maps to `./app/*` (configured in `tsconfig.json` and resolved by `vite-tsconfig-paths`).

## Styling conventions

Custom CSS utility classes are defined in `app/app.css` using Tailwind's `@layer components`:
- `.text-gradient` — pink-to-blue gradient text
- `.primary-button` — blue gradient CTA button
- `.resume-card` — card container (350–490px wide)
- `.navbar` — top navigation bar
- `.score-badge` — colored score badge
- `.uploader-drag-area` — file drop zone (for future upload UI)

CSS variables for the brand palette are declared in `:root` in `app/app.css`.
