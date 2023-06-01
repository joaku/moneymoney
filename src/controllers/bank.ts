import { ipcMain } from "electron";
import { Bank } from "../models";

// Get all banks
ipcMain.handle("get-banks", async () => {
    const banks = await Bank.findAll();
    return banks;
});

// Get a specific bank
ipcMain.handle("get-bank", async (event, id) => {
    const bank = await Bank.findByPk(id);
    return bank;
});

// Create a new bank
ipcMain.handle("create-bank", async (event, data) => {
    const { name } = data;

    const newBank = await Bank.create({
        name,
    });

    // Emit an event to notify the change of the banks
    event.sender.send("banks-changed");

    // Return some result if necessary
    return { success: true };
});

// Update a bank
ipcMain.handle("update-bank", async (event, data) => {
    const { id, name } = data;

    const existingBank = await Bank.findByPk(id);
    if (existingBank) {
        // Update the existing bank
        existingBank.name = name;
        await existingBank.save();

        // Emit an event to notify the change of the banks
        event.sender.send("banks-changed");

        // Return some result if necessary
        return { success: true };
    } else {
        return { success: false, message: "Bank not found" };
    }
});

// Delete a bank
ipcMain.handle("delete-bank", async (event, id) => {
    // Check if the bank exists
    const existingBank = await Bank.findByPk(id);
    if (existingBank) {
        // Delete the existing bank
        await existingBank.destroy();

        // Emit an event to notify the change of the banks
        event.sender.send("banks-changed");

        // Return some result if necessary
        return { success: true };
    } else {
        return { success: false, message: "Bank not found" };
    }
});
