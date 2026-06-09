import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import compression from 'vite-plugin-compression';
import Inspect from 'vite-plugin-inspect';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      deleteOriginFile: false,
    }),
    Inspect(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html',
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    chunkSizeWarningLimit: 2000,
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: false,
  },
});
