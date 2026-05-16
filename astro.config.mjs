import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // 只保留这两个核心插件，干净、不作妖
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});