const { app, BrowserWindow } = require("electron");
const path = require("path");
require("./controllers");

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.resolve(__dirname, "../public/favicon.ico"),
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.resolve(__dirname, "preload/preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
            devTools: !app.isPackaged,
        },
    });

    const indexPath = path.resolve(__dirname, "../public/index.html");
    mainWindow.loadFile(indexPath);
    mainWindow.once("ready-to-show", () => mainWindow.show());

    if (!app.isPackaged) {
        mainWindow.webContents.openDevTools();
    }
}

module.exports = { createWindow };

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
