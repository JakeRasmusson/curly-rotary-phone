const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  
  // we can also expose variables, not just functions
})


contextBridge.exposeInMainWorld('dataSaving', {
    chooseJsonLocation: () => ipcRenderer.invoke("chooseJsonLocation"),
    updateJson: (data) => ipcRenderer.send("updateJson" , data),
    saveJson: (data) => ipcRenderer.send("saveJson" , data)
})