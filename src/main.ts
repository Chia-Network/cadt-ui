import { app, BrowserWindow, shell } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to get app version from version.json
function getAppVersion(): string {
  try {
    const versionPath = path.join(__dirname, 'version.json');
    const versionData = JSON.parse(readFileSync(versionPath, 'utf8'));
    return versionData.version;
  } catch (error) {
    console.warn('Failed to read version.json:', error);
    return 'unknown';
  }
}

function createWindow() {
  // For production builds, we'll add version info via webContents.session
  // since protocol interception is more complex with modern Electron

  const win = new BrowserWindow({
    width: 1200,
    height: 675,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      webviewTag: true,
    },
  });

  // Load URL based on the environment
  if (process.env.NODE_ENV === 'development') {
    console.log('loading app from dev node server');
    win.loadURL('http://localhost:5173/'); // Development URL
  } else {
    // load app from packaged static html
    const indexPath = path.join(__dirname, 'renderer', 'index.html');
    console.log('Loading file:', indexPath); // Log to confirm the correct path

    // Add version header to all requests in production
    const appVersion = getAppVersion();
    win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'x-app-version': [appVersion],
        },
      });
    });

    win.loadFile(indexPath).catch((err) => {
      console.error('Failed to load index.html:', err);
    });

    // app is a SPA. reload index.html when the app tries to load a virtual route
    win.webContents.on('did-fail-load', (_event, _errorCode, _errorDescription, validatedURL) => {
      console.log(`Failed to load: ${validatedURL}, loading index.html instead`);
      win.loadFile(indexPath).catch((err) => {
        console.error('Failed to load index.html:', err);
      });
    });
  }

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
