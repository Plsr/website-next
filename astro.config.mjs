// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import { remarkFigure } from './src/plugins/remark-figure.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://chrisjarling.com',
  markdown: {
    remarkPlugins: [remarkFigure],
  },
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()]
  }
});
