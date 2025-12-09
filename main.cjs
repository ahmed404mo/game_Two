const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = !app.isPackaged; // لو في وضع التطوير

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    // أثناء التطوير (vite)
    win.loadURL('http://localhost:8080');
    win.webContents.openDevTools(); // علشان تشوف الأخطاء
  } else {
    // بعد البناء
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
