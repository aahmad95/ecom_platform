"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductDetail.belongsTo(models.Product, {
        foreignKey: "productId",
        sourceKey: "id",
      });
    }
  }
  ProductDetail.init(
    {
      productId: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      image: DataTypes.ARRAY(DataTypes.TEXT),
      // Cloths:
      size: DataTypes.STRING,
      color: DataTypes.STRING,
      material: DataTypes.STRING,
      style: DataTypes.STRING,

      // Electronic devices:
      operatingSystem: DataTypes.STRING,

      processor: DataTypes.STRING,
      camera: DataTypes.STRING,

      ram: DataTypes.STRING,
      storage: DataTypes.STRING,
      battery: DataTypes.STRING,
      bluetooth: DataTypes.STRING,
      // Game:
      gameType: DataTypes.STRING,

      ageRange: DataTypes.STRING,

      capacity: DataTypes.STRING,
      type: DataTypes.STRING,

      weight: DataTypes.STRING,
      volume: DataTypes.STRING,
      shelfLife: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ProductDetail",
    }
  );
  return ProductDetail;
};
