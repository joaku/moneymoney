const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { chromium } = require("playwright");
require("dotenv").config();

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1366,
        height: 768,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    mainWindow.loadFile("index.html");
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});

// Maneja el evento 'login'
ipcMain.handle("login", async (event, rut, password) => {
    //TO DO: Borrar
    rut = rut != "" ? rut : process.env.SANTANDER_RUT;
    password = password != "" ? password : process.env.SANTANDER_PASSWORD;

    // Aquí va tu lógica de Playwright
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto("https://banco.santander.cl/personas");

    await page.click("#btnIngresar");
    await page.fill("input.input.rut", rut); // Usamos rut proporcionado por el usuario
    await page.click("input.input.pin");
    await page.fill("input.input.pin", password); // Usamos la contraseña proporcionada por el usuario

    await Promise.all([page.waitForNavigation(), page.click("button.btn-login")]);

    await page.waitForSelector('frame[name="frame1"]');

    const frames = await page.frames();
    let targetFrame = null;
    for (const frame of frames) {
        const frameName = frame.name();
        if (frameName === "frame1") {
            targetFrame = frame;
            break;
        }
    }

    if (!targetFrame) {
        await browser.close();
        throw new Error("No se encontró el frame objetivo.");
    }

    await targetFrame.waitForSelector("span#idspan1");
    const welcomeMessage = await targetFrame.$eval("span#idspan1", (span) => span.innerText);

    await browser.close();

    console.log(welcomeMessage);
    return welcomeMessage;
});
