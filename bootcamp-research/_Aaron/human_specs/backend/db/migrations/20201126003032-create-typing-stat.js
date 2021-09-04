"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("TypingStats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      speed: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: [0],
      },
      score: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: [0],
      },
      time: {
        //in minutes
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [0],
      },
      errors: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: [0],
      },
      letters: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: [0],
      },
      words: {
        allowNull: false,
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
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("TypingStats");
  },
};
