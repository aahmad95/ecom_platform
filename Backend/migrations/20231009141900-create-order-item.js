"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("OrderItems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      productDetailId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ProductDetails", //table name
          key: "id",
        },
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Orders", //table name
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("OrderItems");
  },
};
