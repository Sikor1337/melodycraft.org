# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

MelodyCraft is a single-page marketing/storefront site for a custom-song service ("Profesjonalne studio piosenek na zamówienie"). It is a Vite + React 18 + TypeScript app styled with Tailwind CSS v4, with two AI-powered features backed by Google Gemini (`@google/genai`). UI copy is mostly English; some comments/config notes are in Polish.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start Vite dev server
npm run build      # type-aware build to dist/
npm run lint       # tsc --noEmit  (this is the only "test"/check available)
npm run preview    # serve the production build locally
```

There is no test runner, no ESLint config, and no formatter. `npm run lint` (`tsc --noEmit`) is the sole automated verification — run it after edits. Note `tsconfig.json` enables `strict`, `noUnusedLocals`, and `noUnusedParameters`, so unused imports/vars will fail the build.

## Environment / API key

Gemini access requires an API key. Per `vite.config.ts`, the key is read at build time from `VITE_API_KEY` (or `process.env.API_KEY`) and injected as the global `process.env.API_KEY`:

```
define: { 'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY || process.env.API_KEY || "") }
```

So in app code, always reference `process.env.API_KEY` (see `src/services/geminiService.ts`) — do **not** use `import.meta.env` directly even though this is Vite. Put the key in `.env` as `VITE_API_KEY=...` (`.env*` is gitignored). Without a key, the two AI features fail at call time but the rest of the page renders.

## Architecture

- `src/index.tsx` — entry point. Mounts `<App/>` inside a class-based `ErrorBoundary` (catches render crashes and shows a fallback) and `React.StrictMode`. Imports `./index.css`.
- `src/index.css` — Tailwind v4 entry (`@import "tailwindcss"`) plus `@theme` font tokens and custom utility classes (`.glass`, `.hero-gradient`, `.text-gradient`, `.animate-float`). Some of these are also duplicated inline in `index.html`'s `<style>`.
- `src/App.tsx` — the whole page. Holds all top-level UI state as `useState` flags: it composes the static sections (`Navbar`, `Hero`, `TrustedBy`, `HowItWorks`, `AudioSamples`, `Testimonials`, `Pricing`, `FAQ`, `Footer`) and toggles four modals via `framer-motion`'s `AnimatePresence`. All copy is US English; the section order is conversion-oriented (hero → social proof → process → samples → testimonials → pricing → FAQ).
  - `SongBuilderModal` → calls Gemini to generate a song concept, then hands the `SongConcept` to `onOrder`, which opens `CheckoutModal` with a price derived from the selected tier (`standard` = $49, `premium` = $99).
  - `LoginModal`, `ImageEditorModal` (Gemini image editing), `CheckoutModal`.
  - There is no router and no backend; navigation is hash-based smooth-scroll to section ids (`#home`, `#how-it-works`, `#pricing`, `#contact`). Login/checkout are mock UI flows, not real auth or payments.
- `src/services/geminiService.ts` — the only integration layer. Two functions, each creating a fresh `new GoogleGenAI({ apiKey: process.env.API_KEY })` per call (intentional, per the inline guideline comments):
  - `generateSongConcept(vision, genre)` → `gemini-3-flash-preview` with a JSON `responseSchema`, returns a typed `SongConcept`.
  - `editImage(base64Data, mimeType, prompt)` → `gemini-2.5-flash-image`, returns base64 image data from the response parts.
  - `SongConcept` is the shared type imported by `App.tsx`.

State and data flow are entirely prop-drilled from `App.tsx`; there is no context, store, or shared state library.

## Components live only in `src/components/`

All UI components are under `src/components/` — this is the single source of truth. (There used to be a second, out-of-sync `components/` folder at the repo root that some `App.tsx` imports reached into via `../components/...`; it has been removed and everything consolidated under `src/`.) Add new components here and import them with `./components/...` from `App.tsx` (or `./Name` between sibling components). The `Genres` component from the old export was intentionally dropped and is not wired in.

## Conventions

- Components are function components typed `React.FC`, exported as named exports (e.g. `export const Footer`), one component per file in PascalCase.
- Icons come from `lucide-react`; animation from `framer-motion` / `motion`; class merging via `clsx` + `tailwind-merge`.
- Styling is Tailwind utility classes inline; the dark theme is `bg-slate-950` with indigo/purple/pink gradient accents.
