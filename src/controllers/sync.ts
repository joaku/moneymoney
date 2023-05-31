import { ipcMain } from "electron";
import { chromium } from "playwright-chromium";
import { Session, Credential } from "../models";

// Manejar el evento 'login'
ipcMain.handle("sync", async (event) => {
    // Verificar si ya existen credenciales guardadas
    const credentials: Credential | null = await Credential.findOne();

    // Verificar si las credenciales son nulas
    if (credentials === null) {
        throw new Error("No se encontraron credenciales. Por favor, guarda tus credenciales antes de intentar iniciar sesión.");
    }

    // Aquí va tu lógica de Playwright
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto("https://banco.santander.cl/personas");

    await page.click("#btnIngresar");
    await page.fill("input.input.rut", credentials.rut); // Usamos rut proporcionado por el usuario
    await page.click("input.input.pin");
    await page.fill("input.input.pin", credentials.getPassword()); // Usamos la contraseña proporcionada por el usuario

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
    const welcomeMessage = await targetFrame.$eval("span#idspan1", (span) => (span as HTMLElement).innerText);

    await browser.close();

    // Guardar la sesión en la base de datos
    const timestamp = new Date().toISOString(); // Obtiene la fecha y hora actual como un string en formato ISO
    await Session.create({
        rut: credentials.rut,
        type: "session",
        timestamp: timestamp,
    }).catch((error) => console.error("Error al insertar la sesión en la base de datos:", error));

    console.log(welcomeMessage);
    return welcomeMessage;
});
