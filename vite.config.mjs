import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        chunkSizeWarningLimit: 2000,
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'react';
            if (id.includes('framer-motion')) return 'animation';
            if (
              id.includes('lucide-react') ||
              id.includes('@radix-ui') ||
              id.includes('tailwindcss') ||
              id.includes('tailwind-merge') ||
              id.includes('class-variance-authority')
            )
              return 'ui';
            if (id.includes('@emailjs/browser')) return 'email';
          }
        },
      },
    },
  },
});
