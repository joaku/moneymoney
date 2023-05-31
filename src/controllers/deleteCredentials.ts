import { ipcMain } from "electron";
import { Credential } from "../models";

// Manejar la solicitud 'delete-credentials'
ipcMain.on("delete-credentials", async (event, data) => {
    // Verificar si ya existen credenciales guardadas
    const existingCredentials = await Credential.findOne();
    if (existingCredentials) {
        // Borrar las credenciales existentes
        await existingCredentials.destroy();
    }

    // Emitir un evento para notificar el cambio de las credenciales
    event.sender.send("credentials-changed");

    // Retornar algún resultado si es necesario
    return { success: true };
});
