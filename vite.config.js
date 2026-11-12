import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

export default defineConfig({
  envDir: resolve(process.cwd(), 'environments'),
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(process.cwd(), 'index.html'),
      },
    },
    // Prevents Base64 encoding bloat.
    // Enforces that images are always standalone cacheable assets.
    assetsInlineLimit: 0,
  },
});