import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY || process.env.API_KEY || ""),
    },
    // Served from https://sikor1337.github.io/melodycraft.org/ — assets need this
    // sub-path prefix. If you later point a custom domain (e.g. melodycraft.org)
    // at the root, change this back to '/'.
    base: '/melodycraft.org/',
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
  };
});