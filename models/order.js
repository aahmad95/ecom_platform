"use strict";
const { Model } = require("sequelize");
const user = require("./user");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasMany(models.OrderItem, {
        foreignKey: "orderId",
        as: "orderItems",
      });
      Order.belongsToMany(user, { through: "UserOrder" });
    }
  }
  Order.init(
    {
      payment: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      paymentMethod: DataTypes.STRING,
      DeliveryFee: DataTypes.STRING,
      address: DataTypes.STRING,
      status: DataTypes.STRING,
      orderItemId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
