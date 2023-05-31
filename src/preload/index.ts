import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
    login: async (rut: string, password: string) => ipcRenderer.invoke("login", rut, password),
});
