"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
        sourceKey: "id",
      });
      Product.belongsToMany(models.User, { through: "UserProduct" });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      Stock: DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
      meta: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
