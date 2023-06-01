import { ipcMain } from "electron";
import { Transaction } from "../models";

ipcMain.handle("get-transactions", async () => {
    const transactions = await Transaction.findAll();
    return transactions;
});

ipcMain.handle("create-transaction", async (event, data) => {
    const { productId, transactionType, status, amount, transactionDate } = data;

    const newTransaction = await Transaction.create({
        productId,
        transactionType,
        status,
        amount,
        transactionDate,
    });

    event.sender.send("transactions-changed");

    return { success: true };
});

ipcMain.handle("update-transaction", async (event, data) => {
    const { id, productId, transactionType, status, amount, transactionDate } = data;

    const existingTransaction = await Transaction.findByPk(id);
    if (existingTransaction) {
        existingTransaction.productId = productId;
        existingTransaction.transactionType = transactionType;
        existingTransaction.status = status;
        existingTransaction.amount = amount;
        existingTransaction.transactionDate = transactionDate;
        await existingTransaction.save();

        event.sender.send("transactions-changed");

        return { success: true };
    } else {
        return { success: false, message: "Transaction not found" };
    }
});

ipcMain.handle("delete-transaction", async (event, id) => {
    const existingTransaction = await Transaction.findByPk(id);
    if (existingTransaction) {
        await existingTransaction.destroy();

        event.sender.send("transactions-changed");

        return { success: true };
    } else {
        return { success: false, message: "Transaction not found" };
    }
});
