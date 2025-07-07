import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-oxc';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import compression from 'vite-plugin-compression';
import Inspect from 'vite-plugin-inspect';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      deleteOriginFile: false,
    }),
    Inspect(),
  ],
  build: {
    chunkSizeWarningLimit: 2000,
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: false,
  },
});
