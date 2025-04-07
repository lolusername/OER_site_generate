import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  root: '_app',
  base: '/OER_site_generate/',
  server: {
    fs: {
      allow: ['..']
    }
  }
}) 