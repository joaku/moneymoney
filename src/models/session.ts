import { Sequelize, DataTypes, Model } from "sequelize";

export class Session extends Model {
    public id!: number;
    public rut!: string;
    public type!: string;
    public timestamp!: Date;
    public createdAt!: Date;
    public updatedAt!: Date;
}

export function initSession(sequelize: Sequelize) {
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
            sequelize: sequelize,
        }
    );
}
