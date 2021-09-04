'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Chances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      chance: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      GeneratorId: {
        allowNull: false,
        references: { model: 'Generators' },
        type: Sequelize.INTEGER,
      },
      TagId: {
        allowNull: false,
        references: { model: 'Tags' },
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE,
      }
    })

    await queryInterface.addConstraint("Chances", {
      fields: ["GeneratorId", "TagId"],
      type: 'unique',
      // customIndex: true,
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Chances');
  }
};