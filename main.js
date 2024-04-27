import { app, BrowserWindow, ipcMain, dialog } from 'electron/main'
import path from 'node:path'
const __dirname = import.meta.dirname;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
  ipcMain.handle('chooseJsonLocation', async () => {
    const location = await dialog.showOpenDialog({properties:['openDirectory']})
    return location.filePaths
})
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

