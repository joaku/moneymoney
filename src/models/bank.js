const { Sequelize, DataTypes, Model } = require("sequelize");

class Bank extends Model {}

/**
 * Initializes the Bank model in the Sequelize ORM.
 * @param sequelize - The Sequelize instance to use for the model.
 */
function initBank(sequelize) {
    Bank.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(128),
                allowNull: false,
                unique: true,
            },
        },
        {
            tableName: "banks",
            sequelize: sequelize,
            timestamps: true,
        }
    );
    return Bank;
}

module.exports = { Bank, initBank };
