const { Sequelize } = require("sequelize");
const path = require("path");
const { app } = require("electron");

const { Session, initSession } = require("./session");
const { Credential, initCredential } = require("./credential");
const { Bank, initBank } = require("./bank");
const { Product, initProduct } = require("./product");
const { Transaction, initTransaction } = require("./transaction");
const { Category, initCategory } = require("./category");
const { TransactionCategory, initTransactionCategory } = require("./transactionCategory");

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

module.exports = { Session, Credential, Bank, Product, Transaction, Category, TransactionCategory };
