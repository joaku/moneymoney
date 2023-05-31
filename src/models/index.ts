import { Sequelize } from "sequelize";
import path from "path";
import { app } from "electron";

import { Session, initSession } from './session';
import { Credential, initCredential } from './credential';

const dbPath = path.join(app.getPath("userData"), "database.db");
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: dbPath,
});

app.whenReady().then(() => {
    // Synchronize the models with the database
    sequelize.sync();
});

// Initialize models
initSession(sequelize);
initCredential(sequelize);

export { Session, Credential };