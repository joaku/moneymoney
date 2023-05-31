import { app, BrowserWindow } from "electron";
import * as path from "path";
import "./controllers";

function createWindow(): void {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.resolve(__dirname, "preload/preload.js"),
            contextIsolation: true,
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
