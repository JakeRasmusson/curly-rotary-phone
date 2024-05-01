import { app, BrowserWindow, ipcMain, dialog } from "electron/main";
import path from "node:path";
import fs from 'fs';
const __dirname = import.meta.dirname;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
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
  ipcMain.handle("chooseJsonLocation", async () => {
    const location = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });
    fs.writeFile(`${location.filePaths[0]}/data.json`,"", function (err) {
        if (err) throw err;
        console.log("File Created");
  });
  return location.filePaths;
  });
  ipcMain.on("updateJson", async (event, data) => {
    fs.readFile(data.jsonFilePath, 'utf-8', (err, readData) => {
      if (err) {
        console.error(err)
        return
      }
      const readDataArray = JSON.parse(readData)
      const dirtyPlayers = data.playerObjects
      readDataArray.forEach(player => {
        if (dirtyPlayers.includes(player)) {
          player = dirtyPlayers[player]
          console.log(player)
        }
        
      });
      console.log(readDataArray)
    })

    // fs.writeFile(data.jsonFilePath, JSON.stringify(data.playerObjects), function (err) {
    //     if (err) throw err;
    //     console.log('File Updated')
    // })
    return "hi"
  })

  ipcMain.on("saveJson", async (event, data) => {
    console.log(data.playerObjects)
    fs.writeFile(data.jsonFilePath, JSON.stringify(data.playerObjects), function (err) {
        if (err) throw err;
        console.log('File Updated')
    })
    return "hi"
  })

});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
