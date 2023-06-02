const { ipcMain } = require("electron");
const { Bank } = require("../models/index.js");

ipcMain.handle("get-banks", async () => {
    const banks = await Bank.findAll();
    return banks;
});

ipcMain.handle("create-bank", async (event, data) => {
    const { name } = data;
    const newBank = await Bank.create({ name });
    event.sender.send("banks-changed");
    return { success: true };
});

ipcMain.handle("update-bank", async (event, data) => {
    const { id, name } = data;
    const existingBank = await Bank.findByPk(id);
    if (existingBank) {
        existingBank.name = name;
        await existingBank.save();
        event.sender.send("banks-changed");
        return { success: true };
    } else {
        return { success: false, message: "Bank not found" };
    }
});

ipcMain.handle("delete-bank", async (event, id) => {
    const existingBank = await Bank.findByPk(id);
    if (existingBank) {
        await existingBank.destroy();
        event.sender.send("banks-changed");
        return { success: true };
    } else {
        return { success: false, message: "Bank not found" };
    }
});
