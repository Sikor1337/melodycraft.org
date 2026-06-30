/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Served from https://sikor1337.github.io/melodycraft.org/ — assets need this
  // sub-path prefix. If you later point a custom domain (e.g. melodycraft.org)
  // at the root, change this back to '/'.
  base: '/melodycraft.org/',
  build: {
    // Output into docs/ so GitHub Pages can serve from main → /docs
    // (single branch, no separate gh-pages branch).
    outDir: 'docs',
    emptyOutDir: true,
    sourcemap: false,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
  },
});