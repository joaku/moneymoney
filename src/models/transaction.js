const { Sequelize, DataTypes, Model } = require("sequelize");

class Transaction extends Model {}

function initTransaction(sequelize) {
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
    return Transaction;
}

module.exports = { Transaction, initTransaction };
