# MelodyCraft

The easiest way to create custom, studio-quality songs using AI and professional producers — delivered in 24 hours.

A single-page React + TypeScript marketing/storefront site (Vite + Tailwind CSS v4) with two AI-powered features backed by Google Gemini:

- **Song Builder** — generates a custom song concept (title, mood, lyrics, instrumentation) from the user's story and genre.
- **Art Studio** — AI image editing for cover art.

## Run Locally

1. **Prerequisites:** Node.js v18+ and a [Google Gemini API key](https://aistudio.google.com/apikey).

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure your API key:** create a `.env` file in the project root:
   ```
   VITE_API_KEY=your_gemini_api_key_here
   ```
   Vite injects this as `process.env.API_KEY` at build time (see `vite.config.ts`). `.env` is gitignored. Without a key the site renders fine, but the two AI features will fail when called.

4. **Start the dev server:**
   ```bash
   npm run dev
   ```

   **Windows shortcut:** double-click **`start-dev.bat`** in the project root — it installs dependencies (first run only), starts the server on `http://127.0.0.1:3000/`, and opens your browser. Double-click **`stop-dev.bat`** to stop it. (Port 3000 with an explicit IPv4 host avoids a `localhost` IPv4/IPv6 conflict that can otherwise cause "can't connect".)

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run lint` | Type-check with `tsc --noEmit` (the only automated check) |
| `npm run preview` | Serve the production build locally |

## Project Structure

- `src/App.tsx` — the entire page; composes all sections and manages modal state.
- `src/components/` — all UI components (single source of truth).
- `src/services/geminiService.ts` — the only Gemini integration layer.

See `CLAUDE.md` for architecture details.

## Deployment

Ready to deploy on **Vercel** or **Netlify**: connect the repository and add `VITE_API_KEY` as an environment variable in the dashboard. Build command `npm run build`, output directory `dist`.
