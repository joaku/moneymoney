import { Sequelize, DataTypes, Model } from "sequelize";

export class Transaction extends Model {
    public id!: number;
    public productId!: number;
    public transactionType!: string;
    public status!: string;
    public amount!: number;
    public transactionDate!: Date;
}

export function initTransaction(sequelize: Sequelize) {
    Transaction.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            transactionType: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
            status: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
            amount: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            transactionDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            tableName: "transactions",
            sequelize: sequelize,
        }
    );
}
