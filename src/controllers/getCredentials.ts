import { ipcMain } from "electron";
import { Credential } from "../models";

// Manejar la solicitud 'get-credentials'
ipcMain.handle("get-credentials", async () => {
    const credentials = await Credential.findOne();
    return credentials;
});
