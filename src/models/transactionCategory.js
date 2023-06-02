const { Sequelize, DataTypes, Model } = require("sequelize");

class TransactionCategory extends Model {}

function initTransactionCategory(sequelize) {
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
    return TransactionCategory;
}

module.exports = { TransactionCategory, initTransactionCategory };
