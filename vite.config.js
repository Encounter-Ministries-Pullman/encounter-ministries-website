import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const photoDirectory = resolve(process.cwd(), 'public/photos/carousel/encounter-ministries-photos');
const photoFiles = readdirSync(photoDirectory, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.jpg'))
  .map((entry) => entry.name)
  .sort((first, second) => first.localeCompare(second, undefined, { numeric: true }));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __ENCOUNTER_PHOTO_FILES__: JSON.stringify(photoFiles),
  },
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