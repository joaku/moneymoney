const { CosmosClient } = require("@azure/cosmos");
require("dotenv").config();

const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;
const client = new CosmosClient(connectionString);
const databaseId = "moneymoney";

async function getContainer(containerId) {
    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({ id: containerId });
    return container;
}

module.exports = { getContainer };
