# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

MelodyCraft is a single-page marketing/storefront site for a custom-song service aimed at a US audience: customers submit a brief and professional producers deliver a studio-quality track in 24 hours. It is a Vite + React 18 + TypeScript app styled with Tailwind CSS v4. There is **no backend and no AI integration** — login, the order form, and checkout are front-end demo flows.

> History note: this started as a Google AI Studio export with two Gemini-powered features (an AI song-concept generator and an AI image "Art Studio") and an "AI-looking" neon/cyberpunk theme. Both AI features and the neon styling were removed; the app no longer needs any API key.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start the Vite dev server
npm run build      # production build to dist/
npm run lint       # tsc --noEmit (the only automated check)
npm run preview    # serve the production build locally
```

`npm run lint` (`tsc --noEmit`) is the sole automated verification — run it after edits. `tsconfig.json` has `strict`, `noUnusedLocals`, and `noUnusedParameters`, so unused imports/vars fail the build. There is no test runner, ESLint, or formatter.

**Windows helpers:** `start-dev.bat` (installs deps if needed, runs the server on `http://127.0.0.1:3000/`, opens the browser) and `stop-dev.bat`.

## Architecture

- `src/index.tsx` — entry point; mounts `<App/>` in a class-based `ErrorBoundary` and `React.StrictMode`.
- `src/index.css` — Tailwind v4 entry (`@import "tailwindcss"`), an `@theme` font token, and two utility classes used across the site: `.surface` (subtle card background + hairline border) and `.hairline` (thin top border between full-width sections). Plus `animate-fade-in` / `animate-shake` and a `prefers-reduced-motion` block.
- `src/App.tsx` — the whole page. Holds top-level UI state as `useState` flags and composes the sections in conversion order (`Hero` → `TrustedBy` → `HowItWorks` → `AudioSamples` → `Testimonials` → `Pricing` → `FAQ` → `Footer`), toggling three modals via `framer-motion`'s `AnimatePresence`: `SongBuilderModal` (order form), `LoginModal`, `CheckoutModal`.
- `src/types.ts` — shared types: `Tier` (`'standard' | 'premium'`), `SongOrder` (the order-form brief), `OrderItem` (what checkout receives), and `TIER_PRICE` (`standard` = $49, `premium` = $99).
- `src/components/` — all UI components (single source of truth; one component per PascalCase file, `export const`, typed `React.FC`).

Flow: `SongBuilderModal` collects a brief (genre, occasion, who it's for, story) — **no AI** — and calls `onOrder(SongOrder)`, which `App` turns into an `OrderItem` and hands to `CheckoutModal`. There is no router; navigation is hash-based smooth-scroll to section ids (`#home`, `#how-it-works`, `#samples`, `#pricing`, `#faq`, `#contact`).

## Design system

Restrained "premium dark" look — deliberately not flashy:
- **Palette:** near-black background (`#0a0a0b` / `bg-neutral-950`), off-white text, neutral greys; a single **amber-400** accent used sparingly. No gradients-on-text, no neon glows, no animated background grid, no cursor trail.
- **Components:** cards use `.surface`; sections separate with `.hairline`. Radii stay at `rounded-lg`/`rounded-2xl` (avoid the old `rounded-[2.5rem]` extremes). Headings are `font-bold` + `tracking-tight` in normal case (not all-uppercase `font-black`).
- **Buttons:** primary = amber bg with `text-neutral-950`; secondary = `border border-white/15` + `hover:bg-white/5`.

When adding UI, follow these tokens rather than reintroducing `glass`, `indigo/fuchsia/slate`, gradient text, or heavy shadows.

## Deployment

GitHub Pages via Actions (`.github/workflows/deploy.yml`): builds with Vite and publishes `dist/`. The repo's Pages **Source must be set to "GitHub Actions"** in Settings → Pages. `vite.config.ts` sets `base: '/melodycraft.org/'` because the project is served from `https://sikor1337.github.io/melodycraft.org/`; if a custom domain is pointed at the root later, change `base` back to `'/'`.
