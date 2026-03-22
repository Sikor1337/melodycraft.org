import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY || process.env.API_KEY || ""),
    },
    base: '/',
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
    // Jeśli używasz GitHub Pages, ustaw tutaj '/nazwa-repo/'
    // base: '/', 
  };
});