import { ipcMain } from "electron";
import { Credential } from "../models";

ipcMain.handle("get-credentials", async () => {
    const credentials = await Credential.findOne();
    return credentials;
});

ipcMain.on("save-credentials", async (event, data) => {
    const { rut, password, bank } = data;

    // Verificar si ya existen credenciales guardadas
    const existingCredentials = await Credential.findOne();
    if (existingCredentials) {
        // Actualizar las credenciales existentes
        existingCredentials.rut = rut;
        existingCredentials.setPassword(password);
        await existingCredentials.save();
    } else {
        // Crear nuevas credenciales
        const newCredential = new Credential({
            rut: rut,
            bank: bank,
        });
        newCredential.setPassword(password);
        await newCredential.save();
    }

    // Emitir un evento para notificar el cambio de las credenciales
    event.sender.send("credentials-changed");

    // Retornar algún resultado si es necesario
    return { success: true };
});

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
