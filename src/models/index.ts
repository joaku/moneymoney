import { Sequelize, DataTypes, Model } from "sequelize";
import path from "path";
import { app } from "electron";

const dbPath = path.join(app.getPath("userData"), "database.db");

// Initialize Sequelize
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: dbPath,
});

export class Session extends Model {
    public id!: number;
    public rut!: string;
    public type!: string;
    public timestamp!: Date;
    public createdAt!: Date;
    public updatedAt!: Date;

    // ...
}

Session.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        rut: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        type: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        createdAt: {
            // Agregar la columna "createdAt"
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), // Valor por defecto: fecha y hora actual
        },
        updatedAt: {
            // Agregar la columna "updatedAt"
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), // Valor por defecto: fecha y hora actual
        },
    },
    {
        tableName: "sessions",
        sequelize: sequelize, // This also sets sequelize for this model
    }
);

// Wait for the Electron app to be ready before synchronizing the model with the database
app.whenReady().then(() => {
    sequelize.sync();
});

export { sequelize }; // Export the sequelize instance
