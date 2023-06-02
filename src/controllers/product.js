const { ipcMain } = require("electron");
const { Product } = require("../models/index.js");

ipcMain.handle("get-products", async () => {
    const products = await Product.findAll();
    return products;
});

ipcMain.handle("get-product", async (event, id) => {
    const product = await Product.findByPk(id);
    return product;
});

ipcMain.handle("create-product", async (event, data) => {
    const { bankId, name } = data;
    const newProduct = await Product.create({ bankId, name });
    event.sender.send("products-changed");
    return { success: true };
});

ipcMain.handle("update-product", async (event, data) => {
    const { id, bankId, name } = data;
    const existingProduct = await Product.findByPk(id);
    if (existingProduct) {
        existingProduct.bankId = bankId;
        existingProduct.name = name;
        await existingProduct.save();
        event.sender.send("products-changed");
        return { success: true };
    } else {
        return { success: false, message: "Product not found" };
    }
});

ipcMain.handle("delete-product", async (event, id) => {
    const existingProduct = await Product.findByPk(id);
    if (existingProduct) {
        await existingProduct.destroy();
        event.sender.send("products-changed");
        return { success: true };
    } else {
        return { success: false, message: "Product not found" };
    }
});
