// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  // Pro GitHub Pages odkomentuj a uprav tyto řádky:
  // site: 'https://your-username.github.io',
  // base: '/your-repo-name',
  output: 'static',

  integrations: [
    svelte(),
    mdx(),
  ],

  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});