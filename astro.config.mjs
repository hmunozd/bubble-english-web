// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://bubble-english.jildo.me',
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});