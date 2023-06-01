import { Sequelize, DataTypes, Model } from "sequelize";

export class TransactionCategory extends Model {
    public transactionId!: number;
    public categoryId!: number;
    public amount!: number;
}

export function initTransactionCategory(sequelize: Sequelize) {
    TransactionCategory.init(
        {
            transactionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            amount: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        {
            tableName: "transaction_categories",
            sequelize: sequelize,
        }
    );
}
