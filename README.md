# MelodyCraft

Custom songs, written and produced just for you — studio quality, delivered in 24 hours.

A single-page React + TypeScript marketing/storefront site (Vite + Tailwind CSS v4). Visitors browse the offering, submit a song brief through the order form, and check out. There is no backend and no AI integration — login, the order form, and checkout are front-end demo flows.

## Run Locally

1. **Prerequisites:** Node.js v18+.

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the dev server:**
   ```bash
   npm run dev
   ```

   **Windows shortcut:** double-click **`start-dev.bat`** — it installs dependencies (first run only), starts the server on `http://127.0.0.1:3000/`, and opens your browser. Double-click **`stop-dev.bat`** to stop it.

No API keys or environment variables are required.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run lint` | Type-check with `tsc --noEmit` (the only automated check) |
| `npm run preview` | Serve the production build locally |

## Project Structure

- `src/App.tsx` — the entire page; composes all sections and manages modal state.
- `src/components/` — all UI components.
- `src/types.ts` — shared order/pricing types.

See `CLAUDE.md` for architecture and design-system details.

## Deployment

Deployed to **GitHub Pages** via the workflow in `.github/workflows/deploy.yml`, which builds with Vite and publishes `dist/`. One-time setup: in the repository **Settings → Pages**, set **Source** to **GitHub Actions**. The site is served from `https://sikor1337.github.io/melodycraft.org/` (Vite `base` is set accordingly); point a custom domain at the root and change `base` to `'/'` if desired.
