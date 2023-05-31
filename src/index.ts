import { app, BrowserWindow } from "electron";
import * as path from "path";

require("dotenv").config();

// Importar el controlador de inicio de sesión aquí
import "./controllers/login";

function createWindow(): void {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.resolve(__dirname, "preload/index.js"),
        },
    });

    const indexPath = path.resolve(__dirname, "../public/index.html");
    mainWindow.loadFile(indexPath);

    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
