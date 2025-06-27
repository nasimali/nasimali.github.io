import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-oxc';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    chunkSizeWarningLimit: 2000,
  },
});
