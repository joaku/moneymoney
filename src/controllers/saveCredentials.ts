import { ipcMain } from "electron";
import { Credential } from "../models";

// Manejar la solicitud 'save-credentials'
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
