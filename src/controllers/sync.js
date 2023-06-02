const { ipcMain } = require("electron");
const { chromium } = require("playwright-chromium");
const { Session, Credential } = require("../models/index.js");

ipcMain.handle("sync", async (event) => {
    const credentials = await Credential.findOne();

    if (credentials === null) {
        throw new Error("No credentials found. Please save your credentials before attempting to log in.");
    }

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto("https://banco.santander.cl/personas");

    await page.click("#btnIngresar");
    await page.fill("input.input.rut", credentials.rut);
    await page.click("input.input.pin");
    await page.fill("input.input.pin", credentials.getPassword());

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
        throw new Error("Target frame not found.");
    }

    await targetFrame.waitForSelector("span#idspan1");
    const welcomeMessage = await targetFrame.$eval("span#idspan1", (span) => span.innerText);

    await browser.close();

    const timestamp = new Date().toISOString();
    await Session.create({
        rut: credentials.rut,
        type: "session",
        timestamp: timestamp,
    }).catch((error) => console.error("Error inserting session into the database:", error));

    console.log(welcomeMessage);
    return welcomeMessage;
});
