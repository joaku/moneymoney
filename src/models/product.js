const { Sequelize, DataTypes, Model } = require("sequelize");

class Product extends Model {}

function initProduct(sequelize) {
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
    return Product;
}

module.exports = { Product, initProduct };
