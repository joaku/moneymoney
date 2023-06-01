import { Sequelize, DataTypes, Model } from "sequelize";

export class Product extends Model {
    public id!: number;
    public name!: string;
    public bankId!: number;
}

export function initProduct(sequelize: Sequelize) {
    Product.init(
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
            bankId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "products",
            sequelize: sequelize,
        }
    );
}
