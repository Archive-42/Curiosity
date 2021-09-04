'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Traits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      trait: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      TraitTypeId: {
        allowNull: false,
        references: { model: 'TraitTypes' },
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING(),
      },
      color: {
        type: Sequelize.STRING(50),
        defaultValue: "rgb(70,60,70)",
      },
      icon: {
        type: Sequelize.STRING(50),
        defaultValue: "dna",
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
    });

    await queryInterface.addConstraint("Traits", {
      fields: ["TraitTypeId", "trait"],
      type: 'unique',
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Traits');
  }
};