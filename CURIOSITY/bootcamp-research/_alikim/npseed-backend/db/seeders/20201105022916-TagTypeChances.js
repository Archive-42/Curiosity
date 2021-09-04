'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("TagTypeChances", [
      { GeneratorId: 2, TagTypeId: 1},

      { GeneratorId: 2, TagTypeId: 2},

      { GeneratorId: 2, TagTypeId: 3},

      { GeneratorId: 2, TagTypeId: 4},

      { GeneratorId: 2, TagTypeId: 5},

      { GeneratorId: 2, TagTypeId: 6},

      { GeneratorId: 2, TagTypeId: 7},

      { GeneratorId: 2, TagTypeId: 8},
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("TagTypeChances", null, {})
  }
}
