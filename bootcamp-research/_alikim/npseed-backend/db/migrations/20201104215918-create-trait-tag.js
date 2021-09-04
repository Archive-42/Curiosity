'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TraitTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TraitId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Traits' },
      },
      TagId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Tags' },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      }
    })
    await queryInterface.addConstraint("TraitTags", {
      fields: ["TraitId", "TagId"],
      type: 'unique',
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TraitTags');
  }
};