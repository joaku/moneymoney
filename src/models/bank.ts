import { Sequelize, DataTypes, Model } from "sequelize";

export class Bank extends Model {
    public id!: number;
    public name!: string;
}

export function initBank(sequelize: Sequelize) {
    Bank.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
        },
        {
            tableName: "banks",
            sequelize: sequelize,
        }
    );
}
