"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // console.log(models, "===========");
      // define association here
      Category.belongsTo(models.User, {
        foreignKey: "userId",
        sourceKey: "id",
      });

      Category.hasMany(models.Product, {
        foreignKey: "categoryId",
        as: "product",
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
