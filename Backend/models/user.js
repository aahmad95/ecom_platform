"use strict";
const { Model } = require("sequelize");
// const order = require("./order");
// const product = require("./product");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Ads, { foreignKey: "userId", as: "ads" });
      User.hasMany(models.Category, { foreignKey: "userId", as: "categories" });
      User.hasOne(models.Wallet, { foreignKey: "userId", as: "Wallets" });
      User.belongsToMany(models.Product, { through: "UserProduct" });
      User.belongsToMany(models.Order, { through: "UserOrder" });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      role: DataTypes.STRING,
      address: DataTypes.TEXT,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
