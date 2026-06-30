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

**Windows helpers:** `start-dev.bat` (installs deps if needed, runs the server on `http://127.0.0.1:3000/melodycraft.org/`, opens the browser) and `stop-dev.bat`. Note the dev URL includes the `/melodycraft.org/` base path.

## Architecture

- `src/index.tsx` — entry point; mounts `<App/>` in a class-based `ErrorBoundary` and `React.StrictMode`.
- `src/index.css` — Tailwind v4 entry (`@import "tailwindcss"`). `@theme` defines `--font-sans` (Plus Jakarta Sans), `--font-display` (Fraunces serif — used via the `font-display` class on headings), and `--color-accent` (the gold token → drives `bg-accent`/`text-accent`/etc.). Utility classes: `.surface` (subtle card bg + hairline border) and `.hairline` (thin top border between sections), plus `animate-fade-in` / `animate-shake` and a `prefers-reduced-motion` block.
- `src/components/SpotifyEmbed.tsx` — wraps a Spotify iframe player. `src` URLs in `Hero`/`AudioSamples` are **placeholders**; swap for the studio's own playlist/track embed links. Use playlist/album embeds (render dark); a single-track embed shows a light "preview" bar for logged-out visitors. `Navbar` has a mobile hamburger menu (`md:hidden`).
- `src/App.tsx` — the whole page. Holds top-level UI state as `useState` flags and composes the sections in conversion order (`Hero` → `TrustedBy` → `HowItWorks` → `AudioSamples` → `Testimonials` → `Pricing` → `FAQ` → `Footer`), toggling three modals via `framer-motion`'s `AnimatePresence`: `SongBuilderModal` (order form), `LoginModal`, `CheckoutModal`.
- `src/types.ts` — shared types: `Tier` (`'standard' | 'premium'`), `SongOrder` (the order-form brief), `OrderItem` (what checkout receives), and `TIER_PRICE` (`standard` = $49, `premium` = $99).
- `src/components/` — all UI components (single source of truth; one component per PascalCase file, `export const`, typed `React.FC`).

Flow: `SongBuilderModal` collects a brief (genre, occasion, who it's for, story) — **no AI** — and calls `onOrder(SongOrder)`, which `App` turns into an `OrderItem` and hands to `CheckoutModal`. There is no router; navigation is hash-based smooth-scroll to section ids (`#home`, `#how-it-works`, `#samples`, `#pricing`, `#faq`, `#contact`).

## Design system

Elegant, boutique "premium dark" look — deliberately restrained:
- **Palette:** warm near-black background (`#0b0a09` / `bg-stone-950`), warm off-white text, `stone` greys; a single **gold accent** via the `accent` token (`bg-accent`, `text-accent`, `border-accent/30`, etc.) used sparingly. No gradients-on-text, no neon glows, no animated background grid, no cursor trail.
- **Type:** section/hero headings use the **Fraunces serif** (`font-display` class) at `font-medium`; body uses Plus Jakarta Sans. Headings are normal case (not all-uppercase `font-black`).
- **Components:** cards use `.surface`; sections separate with `.hairline` and use `py-20 md:py-28`. Buttons are pill-shaped (`rounded-full`) in the hero/CTAs; primary = `bg-accent text-stone-950`, secondary = `border border-white/15` + `hover:bg-white/5`.
- **Mobile-first:** base styles target mobile; scale up with `sm:`/`md:`/`lg:`. The navbar collapses to a hamburger menu on mobile.

When adding UI, follow these tokens rather than reintroducing `glass`, `indigo/fuchsia/slate`/`amber-*` literals, gradient text, or heavy shadows.

## Deployment

Deployed to **GitHub Pages from `main` → `/docs`** — everything lives on one branch.
The Actions-based deploy kept failing on CI (unreadable without the dashboard), so it
was bypassed: `vite.config.ts` sets `outDir: 'docs'`, and `docs/` (the built output)
is committed to `main`. To publish: run **`deploy.bat`** (build → commit `docs/` →
push), or `npm run build` then commit `docs/`. The repo's Pages **Source must be
"Deploy from a branch" → `main` → `/docs`**. `.github/workflows/deploy.yml` is kept
but no longer runs on push (manual `workflow_dispatch` only). `base` is
`'/melodycraft.org/'` (served from `https://sikor1337.github.io/melodycraft.org/`);
change to `'/'` if a custom domain is pointed at the root. `docs/` is generated —
never edit it by hand; re-run `deploy.bat`.
