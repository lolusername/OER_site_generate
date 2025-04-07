import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'

// Function to copy content files to the public directory
function copyContentFiles() {
  const contentDir = path.resolve(__dirname, '../content')
  const publicDir = path.resolve(__dirname, 'public/content')
  
  // Create public/content directory if it doesn't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  
  // Copy all files from content to public/content
  const files = fs.readdirSync(contentDir)
  files.forEach(file => {
    const sourcePath = path.join(contentDir, file)
    const destPath = path.join(publicDir, file)
    fs.copyFileSync(sourcePath, destPath)
  })
}

// Run the copy function before build
copyContentFiles()

export default defineConfig({
  plugins: [vue()],
  base: '/OER_site_generate/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './')
    }
  },
  server: {
    fs: {
      allow: ['..']
    }
  },
  publicDir: '../content',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  }
}) 