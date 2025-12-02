# MelodyCraft

The world's easiest way to create custom songs using AI and professional producers.

## How to Launch Locally

1. **Prerequisites**
   - Node.js installed (v18+)
   - A Google Gemini API Key

2. **Setup Project**
   ```bash
   npm create vite@latest melody-craft -- --template react-ts
   cd melody-craft
   npm install
   ```

3. **Install Dependencies**
   ```bash
   npm install lucide-react @google/genai clsx tailwind-merge
   ```

4. **Tailwind Setup**
   Follow the [Tailwind CSS Vite Guide](https://tailwindcss.com/docs/guides/vite) to generate `tailwind.config.js` and add the directives to `index.css`.

5. **API Key Configuration**
   - Create a `.env` file in the root.
   - Add: `VITE_API_KEY=your_key_here`
   - Update `services/geminiService.ts` to use `import.meta.env.VITE_API_KEY` instead of `process.env.API_KEY` if running in Vite.

6. **Run**
   ```bash
   npm run dev
   ```

## Deployment
This project is ready to deploy on **Vercel** or **Netlify**. Simply connect your GitHub repository and add the `API_KEY` environment variable in the dashboard.
