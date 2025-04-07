import express from 'express';
import { spawn, exec } from 'child_process';
import cors from 'cors';
import open from 'open';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createServer } from 'net';
import multer from 'multer';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let devServer = null;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const contentDir = join(__dirname, 'content');
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }
    cb(null, contentDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close();
      resolve(true);
    });
    server.listen(port);
  });
}

async function findAvailablePort(startPort) {
  let port = startPort;
  while (!(await isPortAvailable(port))) {
    port++;
  }
  return port;
}

// Kill any existing processes on port 3000
const startServer = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.static(__dirname));
  app.use('/content', express.static(join(__dirname, 'content')));

  // Serve the launcher HTML
  app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'launcher.html'));
  });

  // Handle file uploads
  app.post('/upload', upload.array('files'), (req, res) => {
    const files = req.files.map(file => file.originalname);
    res.json({ files });
  });

  // Handle command execution
  app.post('/run', (req, res) => {
    const { command } = req.body;
    console.log('Running command:', command);
    
    if (command.includes('npm run dev')) {
      // For dev server, we want to stream the output
      if (devServer) {
        res.json({ status: 'Server already running' });
        return;
      }

      devServer = spawn('npm', ['run', 'dev'], { cwd: join(__dirname, '_app') });
      
      let serverUrl = '';
      
      devServer.stdout.on('data', (data) => {
        const output = data.toString();
        console.log(output);
        
        // Look for the server URL in the output
        if (output.includes('Local:')) {
          serverUrl = output.match(/Local:\s*(http:\/\/localhost:\d+)/)[1];
          res.json({ status: 'Server started', url: serverUrl });
        }
      });

      devServer.stderr.on('data', (data) => {
        console.error(data.toString());
      });

      devServer.on('error', (error) => {
        console.error('Failed to start server:', error);
        res.status(500).json({ error: error.message });
      });

      // Set a timeout in case we don't find the URL
      setTimeout(() => {
        if (!serverUrl) {
          res.json({ status: 'Server starting...', url: 'http://localhost:5173' });
        }
      }, 5000);

    } else {
      // For other commands (like npm install), just run normally
      const child = spawn('npm', ['install'], { cwd: join(__dirname, '_app') });
      
      let output = '';
      
      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.stderr.on('data', (data) => {
        output += data.toString();
      });

      child.on('close', (code) => {
        if (code === 0) {
          res.json({ output });
        } else {
          res.status(500).json({ error: output });
        }
      });
    }
  });

  try {
    const port = await findAvailablePort(3000);
    app.listen(port, () => {
      console.log(`Launcher server running on port ${port}`);
      console.log('Opening browser...');
      open(`http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

// Kill any existing processes on port 3000 before starting
exec('lsof -ti:3000 | xargs kill -9', (error) => {
  if (error && error.code !== 1) {
    console.error('Error killing existing processes:', error);
  }
  startServer();
}); 