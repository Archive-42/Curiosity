"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Memories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      memory_data: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: [0],
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
        references: { model: "Users" },
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Memories");
  },
};
