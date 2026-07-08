# MelodyCraft

Custom songs, written and produced just for you — studio quality, delivered in 24 hours.

Single-page React + TypeScript marketing/storefront site (Vite + Tailwind CSS v4) for a
custom-song service aimed at a US audience. A customer shares their story, professional
producers craft a finished track, and checkout redirects to Stripe. No backend and no AI
integration — the order form is a front-end brief. Accounts/login are deferred to a future
1.0; the MVP has no login.

🔗 **Live site:** https://sikor1337.github.io/melodycraft.org/

> History note: started as a Google AI Studio export with two Gemini features (an AI
> song-concept generator and an AI image "Art Studio") and a neon/cyberpunk theme. Both AI
> features and the neon styling were removed; the app needs no API key.

---

## 1. Pricing (current)

Good-better-best, one-time payments. Base song plus optional streaming distribution.

| Plan | Price | What you get |
|---|---|---|
| **Just the Song** | **$9.99** | Custom studio-quality song, up to 3 min, mastered MP3, 2 revisions, personal-use license |
| **Streaming for a Year** ⭐ | **$39.99** | Everything above + published to Apple Music, Spotify & more for 1 year |
| **Streaming for Life** | **$89.99** | Everything above + lifetime distribution + priority delivery |

Add-on: professional lyric writing **+$3.99** on any plan. The customer always approves the
final song before we upload it anywhere.

---

## 2. Status

### Works ✅
Hero, "How it works", music samples (Spotify embeds), testimonials, pricing, order form,
FAQ, mobile (hamburger menu), live hosting. Checkout redirects to **Stripe Payment Links**;
an "Email my order" fallback shows if a link is missing.

### Placeholder / not wired yet ⚠️
- 🎵 **Music samples** — popular Spotify playlists as placeholders; swap for our own tracks.
- 💬 **Testimonials & stats** ("10,000+ customers") — placeholder text.
- 💳 **Stripe** — currently **test-mode** links (sandbox account `$ikor sandbox`). Go live
  = create live links + swap them in (see §6).
- 📨 **Orders** — the brief is emailed via Web3Forms on "Pay" click (needs the key, §6); no
  database. Accounts/login are out of MVP scope.

---

## 3. Run locally

Prerequisites: Node.js v18+.

```bash
npm install        # install dependencies
npm run dev        # start the Vite dev server
npm run build      # production build to docs/
npm run lint       # tsc --noEmit (type-check)
npm test           # run the Vitest suite once (npm run test:watch to watch)
npm run preview    # serve the production build locally
```

**Windows helpers:** double-click `start-dev.bat` (installs deps first run, serves
`http://127.0.0.1:3000/melodycraft.org/`, opens the browser) and `stop-dev.bat`. Note the
dev URL includes the `/melodycraft.org/` base path.

No API keys or environment variables required to run.

---

## 4. Architecture

- `src/index.tsx` — entry; mounts `<App/>` in a class `ErrorBoundary` + `React.StrictMode`.
- `src/App.tsx` — the whole page; composes sections in conversion order (Hero → TrustedBy →
  HowItWorks → AudioSamples → Testimonials → Pricing → FAQ → Footer) and toggles two modals
  (`SongBuilderModal`, `CheckoutModal`) via framer-motion. `LoginModal` exists but is **not
  wired** (accounts deferred to 1.0). Navigation is hash-based smooth-scroll, no router.
- `src/types.ts` — shared types: `Tier` (`standard | premium | signature`), `SongOrder`,
  `OrderItem`, and `TIER_PRICE` (`9.99 / 39.99 / 89.99`) + `TIER_LABEL` / `TIER_NOTE`.
- `src/config.ts` — `STRIPE_PAYMENT_LINKS` (one URL per tier), `CONTACT_EMAIL`,
  `WEB3FORMS_ACCESS_KEY`.
- `src/components/` — all UI, one `export const` React.FC per PascalCase file.
- `src/components/SpotifyEmbed.tsx` — Spotify iframe wrapper; `src` URLs in Hero/AudioSamples
  are placeholders. Prefer playlist/album embeds (dark); single-track shows a light bar.

Flow: `SongBuilderModal` collects a brief (genre, occasion, who it's for, story) and calls
`onOrder`, which `App` turns into an `OrderItem` for `CheckoutModal`.

### Design system
Boutique "premium dark", restrained. Warm near-black bg (`#0b0a09`/`bg-stone-950`), warm
off-white text, `stone` greys, a single **gold accent** (`accent` token: `bg-accent`,
`text-accent`, `border-accent/30`) used sparingly. Headings use **Fraunces serif**
(`font-display`, `font-medium`), normal case; body is Plus Jakarta Sans. Cards use
`.surface`; sections separate with `.hairline`, `py-20 md:py-28`. Buttons pill-shaped
(`rounded-full`); primary = `bg-accent text-stone-950`, secondary = `border border-white/15`.
Mobile-first. No gradients-on-text, no neon glows, no `glass`/`indigo/fuchsia/slate`/`amber-*`.

`npm run lint` (`tsc --noEmit`) is the primary check — `strict`, `noUnusedLocals`,
`noUnusedParameters`, so unused imports fail the build. Vitest suite covers pricing/checkout/
types. No ESLint or formatter.

---

## 5. Deployment

GitHub Pages from **`main` → `/docs`** — everything on one branch. `vite.config.ts` sets
`outDir: 'docs'` and the built `docs/` is committed. To publish: run **`deploy.bat`** (build
→ commit `docs/` → push). One-time setup: Pages **Source = Deploy from a branch → `main` →
`/docs`**. `base` is `'/melodycraft.org/'` (served from
`https://sikor1337.github.io/melodycraft.org/`); change to `'/'` for a root custom domain.
`docs/` is generated — never edit by hand. The Actions workflow is kept but manual-only
(`workflow_dispatch`).

---

## 6. Go-live checklist (real payments)

Goal: real payments + order briefs in our inbox. One deploy at the end. Tip: open a Claude
session with the Stripe plugin connected in live mode and say "go live".

1. **Activate Stripe** — Dashboard → complete business profile, identity, bank payout.
   Switch the account (`$ikor sandbox`) to live mode.
2. **Create 3 live Payment Links** — Test mode OFF, one per plan (Just the Song $9.99,
   Streaming for a Year $39.99, Streaming for Life $89.99). Each: one-time, USD, no shipping
   address, after-payment redirect to `https://sikor1337.github.io/melodycraft.org/?paid=1`.
   Live URLs look like `https://buy.stripe.com/xxxx` — **no `test_` segment**.
3. **Web3Forms key** — https://web3forms.com, enter the inbox for briefs
   (e.g. hello@melodycraft.org); the free key arrives by email.
4. **Paste into `src/config.ts`** — the 3 live URLs into `STRIPE_PAYMENT_LINKS`; the key into
   `WEB3FORMS_ACCESS_KEY`.
5. **Ship** — `npm run lint && npm test && deploy.bat`.
6. **Verify live** — run the order flow, confirm the brief email (with `MC-...` reference)
   arrives on "Pay" click, Stripe URL has no `test_` and shows the right plan/price. Don't use
   test cards in live mode (real money). Optional: pay $9.99 yourself, confirm `?paid=1`
   banner, then refund from the dashboard.

---

## 7. Roadmap

> 🎯 **Scope = MVP:** site + payment for a song (Stripe). No accounts — those land in 1.0.
> 📅 **Timeline:** MVP now (July 2026), first sales target ~1 week; accounts (1.0) later
> (~Sept–Oct 2026) once the MVP is earning; marketing in parallel / after.

- **Phase 1 (MVP) — Content:** own tracks, real testimonials, verify copy.
- **Phase 2 (MVP) — Payment:** live Stripe links (§6), brief emailed to us, `?paid=1` page.
- **Phase 3 (1.0, later) — Accounts:** real login, customer dashboard, admin panel.
- **Phase 4 — Growth:** custom domain, SEO + social image, analytics, referrals.

### From the team, to start Phase 1
3–6 track links (Spotify preferred), real testimonials (quote + name/city), confirmed
pricing, a support email + social links, optionally a logo.
