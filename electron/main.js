const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const serve = require('electron-serve')
const express = require('express')
const multer = require('multer')
const fs = require('fs')
const cors = require('cors')

const loadURL = serve({ directory: '_app/dist' })

let mainWindow
let contentServer

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    loadURL(mainWindow)
  }

  // Start content server
  const expressApp = express()
  expressApp.use(cors())

  // Configure multer for file uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const contentDir = path.join(app.getPath('userData'), 'content')
      if (!fs.existsSync(contentDir)) {
        fs.mkdirSync(contentDir, { recursive: true })
      }
      cb(null, contentDir)
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })

  const upload = multer({ storage })

  // Serve content files
  expressApp.get('/content/:file', (req, res) => {
    const filePath = path.join(app.getPath('userData'), 'content', req.params.file)
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath)
    } else {
      res.status(404).send('File not found')
    }
  })

  // Get content index
  expressApp.get('/content/index.json', (req, res) => {
    const contentDir = path.join(app.getPath('userData'), 'content')
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true })
    }
    const files = fs.readdirSync(contentDir)
      .filter(file => file.endsWith('.md') || file.endsWith('.txt'))
    res.json(files)
  })

  // Handle file uploads
  expressApp.post('/upload', upload.array('files'), (req, res) => {
    res.json({ message: 'Files uploaded successfully' })
  })

  contentServer = expressApp.listen(3000, () => {
    console.log('Content server running on port 3000')
  })
}

// Handle file drag and drop
ipcMain.handle('select-files', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Content Files', extensions: ['md', 'txt'] }
    ]
  })
  return result.filePaths
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
  if (contentServer) {
    contentServer.close()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
}) 