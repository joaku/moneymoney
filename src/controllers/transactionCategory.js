const { ipcMain } = require("electron");
const { TransactionCategory } = require("../models/index.js");

ipcMain.handle("get-transaction-categories", async () => {
    const transactionCategories = await TransactionCategory.findAll();
    return transactionCategories;
});

ipcMain.handle("create-transaction-category", async (event, data) => {
    const { transactionId, categoryId, amount } = data;
    const newTransactionCategory = await TransactionCategory.create({ transactionId, categoryId, amount });
    event.sender.send("transaction-categories-changed");
    return { success: true };
});

ipcMain.handle("update-transaction-category", async (event, data) => {
    const { transactionId, categoryId, amount } = data;
    const existingTransactionCategory = await TransactionCategory.findOne({ where: { transactionId, categoryId } });
    if (existingTransactionCategory) {
        existingTransactionCategory.amount = amount;
        await existingTransactionCategory.save();
        event.sender.send("transaction-categories-changed");
        return { success: true };
    } else {
        return { success: false, message: "TransactionCategory not found" };
    }
});

ipcMain.handle("delete-transaction-category", async (event, data) => {
    const { transactionId, categoryId } = data;
    const existingTransactionCategory = await TransactionCategory.findOne({ where: { transactionId, categoryId } });
    if (existingTransactionCategory) {
        await existingTransactionCategory.destroy();
        event.sender.send("transaction-categories-changed");
        return { success: true };
    } else {
        return { success: false, message: "TransactionCategory not found" };
    }
});
