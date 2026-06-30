import { defineConfig } from 'vite';
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
    outDir: 'dist',
    sourcemap: false,
  },
});