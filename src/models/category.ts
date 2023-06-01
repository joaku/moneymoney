import { Sequelize, DataTypes, Model } from "sequelize";

export class Category extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
}

export function initCategory(sequelize: Sequelize) {
    Category.init(
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
            description: {
                type: new DataTypes.STRING(256),
                allowNull: true,
            },
        },
        {
            tableName: "categories",
            sequelize: sequelize,
        }
    );
}
