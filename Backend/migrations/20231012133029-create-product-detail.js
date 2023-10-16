"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProductDetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      size: {
        type: Sequelize.STRING,
      },
      color: {
        type: Sequelize.STRING,
      },

      material: {
        type: Sequelize.STRING,
      },
      style: {
        type: Sequelize.STRING,
      },
      operatingSystem: {
        type: Sequelize.STRING,
      },
      processor: {
        type: Sequelize.STRING,
      },
      camera: {
        type: Sequelize.STRING,
      },
      ram: {
        type: Sequelize.STRING,
      },
      storage: {
        type: Sequelize.STRING,
      },
      battery: {
        type: Sequelize.STRING,
      },
      bluetooth: {
        type: Sequelize.STRING,
      },
      gameType: {
        type: Sequelize.STRING,
      },
      ageRange: {
        type: Sequelize.STRING,
      },
      capacity: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      weight: {
        type: Sequelize.STRING,
      },
      volume: {
        type: Sequelize.STRING,
      },
      shelfLife: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("ProductDetails");
  },
};
