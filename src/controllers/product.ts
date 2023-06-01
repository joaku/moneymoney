import { ipcMain } from "electron";
import { Product } from "../models";

// Get all products
ipcMain.handle("get-products", async () => {
    const products = await Product.findAll();
    return products;
});

// Get a specific product
ipcMain.handle("get-product", async (event, id) => {
    const product = await Product.findByPk(id);
    return product;
});

// Create a new product
ipcMain.handle("create-product", async (event, data) => {
    const { bankId, name } = data;

    const newProduct = await Product.create({
        bankId,
        name,
    });

    // Emit an event to notify the change of the products
    event.sender.send("products-changed");

    // Return some result if necessary
    return { success: true };
});

// Update a product
ipcMain.handle("update-product", async (event, data) => {
    const { id, bankId, name } = data;

    const existingProduct = await Product.findByPk(id);
    if (existingProduct) {
        // Update the existing product
        existingProduct.bankId = bankId;
        existingProduct.name = name;
        await existingProduct.save();

        // Emit an event to notify the change of the products
        event.sender.send("products-changed");

        // Return some result if necessary
        return { success: true };
    } else {
        return { success: false, message: "Product not found" };
    }
});

// Delete a product
ipcMain.handle("delete-product", async (event, id) => {
    // Check if the product exists
    const existingProduct = await Product.findByPk(id);
    if (existingProduct) {
        // Delete the existing product
        await existingProduct.destroy();

        // Emit an event to notify the change of the products
        event.sender.send("products-changed");

        // Return some result if necessary
        return { success: true };
    } else {
        return { success: false, message: "Product not found" };
    }
});
