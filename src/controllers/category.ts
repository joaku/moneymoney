import { ipcMain } from "electron";
import { Category } from "../models";

ipcMain.handle("get-categories", async () => {
    const categories = await Category.findAll();
    return categories;
});

ipcMain.handle("create-category", async (event, data) => {
    const { name, description } = data;

    const newCategory = await Category.create({
        name,
        description,
    });

    event.sender.send("categories-changed");

    return { success: true };
});

ipcMain.handle("update-category", async (event, data) => {
    const { id, name, description } = data;

    const existingCategory = await Category.findByPk(id);
    if (existingCategory) {
        existingCategory.name = name;
        existingCategory.description = description;
        await existingCategory.save();

        event.sender.send("categories-changed");

        return { success: true };
    } else {
        return { success: false, message: "Category not found" };
    }
});

ipcMain.handle("delete-category", async (event, id) => {
    const existingCategory = await Category.findByPk(id);
    if (existingCategory) {
        await existingCategory.destroy();

        event.sender.send("categories-changed");

        return { success: true };
    } else {
        return { success: false, message: "Category not found" };
    }
});
