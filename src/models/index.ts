import { Sequelize } from "sequelize";
import path from "path";
import { app } from "electron";

import { Session, initSession } from "./session";
import { Credential, initCredential } from "./credential";
import { Bank, initBank } from "./bank";
import { Product, initProduct } from "./product";
import { Transaction, initTransaction } from "./transaction";
import { Category, initCategory } from "./category";
import { TransactionCategory, initTransactionCategory } from "./transactionCategory";

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
initBank(sequelize);
initProduct(sequelize);
initTransaction(sequelize);
initCategory(sequelize);
initTransactionCategory(sequelize);

export { Session, Credential, Bank, Product, Transaction, Category, TransactionCategory };
