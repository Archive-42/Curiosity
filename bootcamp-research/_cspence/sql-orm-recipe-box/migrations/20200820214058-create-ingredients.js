'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Ingredients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: {
        allowNull: false,
        type: Sequelize.NUMERIC
      },
      measurementUnitId: {
          allowNull: false,
        type: Sequelize.INTEGER,
        references:{ model:"MeasurementUnits"}
      },
      foodStuff: {
          allowNull: false,
        type: Sequelize.STRING(500)
      },
      recipeId: {
          allowNull: false,
        type: Sequelize.INTEGER,
        references: { model:"recipes" }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Ingredients');
  }
};
