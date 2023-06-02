const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    saveCredentials: (rut, password, bank) => ipcRenderer.send("save-credentials", { rut, password, bank }),
    deleteCredentials: () => ipcRenderer.send("delete-credentials"),
    sync: () => ipcRenderer.invoke("sync"),
    getCredentials: () => ipcRenderer.invoke("get-credentials"),
    onCredentialsChanged: (callback) => {
        ipcRenderer.on("credentials-changed", callback);
    },
});
