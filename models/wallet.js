"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wallet.belongsTo(models.Users, {
        foreignKey: "userId",
        sourceKey: "id",
      });
    }
  }
  Wallet.init(
    {
      Amount: DataTypes.DECIMAL,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Wallet",
    }
  );
  return Wallet;
};
