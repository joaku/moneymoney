import { ipcMain } from "electron";
import { Category } from "../models";

// Get all categories
ipcMain.handle("get-categories", async () => {
    const categories = await Category.findAll();
    return categories;
});

// Get a specific category
ipcMain.handle("get-category", async (event, id) => {
    const category = await Category.findByPk(id);
    return category;
});

// Create a new category
ipcMain.handle("create-category", async (event, data) => {
    const { name } = data;

    const newCategory = await Category.create({
        name,
    });

    // Emit an event to notify the change of the categories
    event.sender.send("categories-changed");

    // Return some result if necessary
    return { success: true };
});

// Update a category
ipcMain.handle("update-category", async (event, data) => {
    const { id, name } = data;

    const existingCategory = await Category.findByPk(id);
    if (existingCategory) {
        // Update the existing category
        existingCategory.name = name;
        await existingCategory.save();

        // Emit an event to notify the change of the categories
        event.sender.send("categories-changed");

        // Return some result if necessary
        return { success: true };
    } else {
        return { success: false, message: "Category not found" };
    }
});

// Delete a category
ipcMain.handle("delete-category", async (event, id) => {
    // Check if the category exists
    const existingCategory = await Category.findByPk(id);
    if (existingCategory) {
        // Delete the existing category
        await existingCategory.destroy();

        // Emit an event to notify the change of the categories
        event.sender.send("categories-changed");

        // Return some result if necessary
        return { success: true };
    } else {
        return { success: false, message: "Category not found" };
    }
});
