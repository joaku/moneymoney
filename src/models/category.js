const { Sequelize, DataTypes, Model } = require('sequelize');

class Category extends Model {}

function initCategory(sequelize) {
    Category.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                comment: "The unique identifier for the category.",
            },
            name: {
                type: DataTypes.STRING(128),
                allowNull: false,
                unique: true,
                comment: "The name of the category.",
            },
            description: {
                type: DataTypes.STRING(256),
                allowNull: true,
                comment: "A brief description of the category.",
            },
        },
        {
            tableName: "categories",
            sequelize: sequelize,
            timestamps: true,
        }
    );
    return Category;
}

module.exports = { Category, initCategory };
