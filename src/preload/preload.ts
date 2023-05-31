import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
    saveCredentials: (rut: string, password: string, bank: string) => ipcRenderer.send("save-credentials", { rut, password, bank }),
    deleteCredentials: () => ipcRenderer.send("delete-credentials"),
    sync: () => ipcRenderer.invoke("sync"), // Changed from send to invoke
    getCredentials: () => ipcRenderer.invoke("get-credentials"),
    onCredentialsChanged: (callback: any) => {
        ipcRenderer.on("credentials-changed", callback);
    },
});
