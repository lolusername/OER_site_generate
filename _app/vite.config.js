import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'

// Custom plugin to serve content files and copy them during build
const contentPlugin = () => ({
  name: 'content-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url?.startsWith('/content/')) {
        if (req.url === '/content/index.json') {
          const contentDir = path.join(__dirname, '..', 'content')
          const files = fs.readdirSync(contentDir)
            .filter(file => file.endsWith('.md') || file.endsWith('.txt'))
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify(files))
        }
        
        const filePath = path.join(__dirname, '..', req.url)
        if (fs.existsSync(filePath)) {
          res.setHeader('Content-Type', 'text/plain')
          return res.end(fs.readFileSync(filePath, 'utf-8'))
        }
      }
      next()
    })
  },
  writeBundle() {
    // Copy content files to dist/content during build
    const contentDir = path.join(__dirname, '..', 'content')
    const distContentDir = path.join(__dirname, 'dist', 'content')
    if (!fs.existsSync(distContentDir)) {
      fs.mkdirSync(distContentDir, { recursive: true })
    }
    
    // Generate index.json
    const files = fs.readdirSync(contentDir)
      .filter(file => file.endsWith('.md') || file.endsWith('.txt'))
    fs.writeFileSync(
      path.join(distContentDir, 'index.json'),
      JSON.stringify(files)
    )
    
    // Copy content files
    files.forEach(file => {
      fs.copyFileSync(
        path.join(contentDir, file),
        path.join(distContentDir, file)
      )
    })
  }
})

// Plugin to copy index.html to 404.html for SPA routing
const spaPlugin = () => ({
  name: 'spa-plugin',
  writeBundle() {
    const indexPath = path.join(__dirname, 'dist', 'index.html')
    const notFoundPath = path.join(__dirname, 'dist', '404.html')
    fs.copyFileSync(indexPath, notFoundPath)
  }
})

export default defineConfig({
  plugins: [vue(), contentPlugin(), spaPlugin()],
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
  publicDir: false,
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