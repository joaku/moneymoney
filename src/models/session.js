const { Sequelize, DataTypes, Model } = require("sequelize");

class Session extends Model {}

function initSession(sequelize) {
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
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        },
        {
            tableName: "sessions",
            sequelize: sequelize,
        }
    );
    return Session;
}

module.exports = { Session, initSession };
