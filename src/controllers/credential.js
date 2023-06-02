const { ipcMain } = require("electron");
const { Credential } = require("../models/index.js");

ipcMain.handle("get-credentials", async () => {
    const credentials = await Credential.findOne();
    return credentials;
});

ipcMain.on("save-credentials", async (event, data) => {
    const { rut, password, bank } = data;
    const existingCredentials = await Credential.findOne();
    if (existingCredentials) {
        existingCredentials.rut = rut;
        existingCredentials.setPassword(password);
        await existingCredentials.save();
    } else {
        const newCredential = new Credential({ rut: rut, bank: bank });
        newCredential.setPassword(password);
        await newCredential.save();
    }
    event.sender.send("credentials-changed");
    return { success: true };
});

ipcMain.on("delete-credentials", async (event, data) => {
    const existingCredentials = await Credential.findOne();
    if (existingCredentials) {
        await existingCredentials.destroy();
    }
    event.sender.send("credentials-changed");
    return { success: true };
});
