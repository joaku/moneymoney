const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    login: async (rut, password) => ipcRenderer.invoke("login", rut, password),
});
