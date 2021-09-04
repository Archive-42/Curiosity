'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Chances", [
      { GeneratorId: 2, TagId: 1, chance: 0.45 },
      { GeneratorId: 2, TagId: 2, chance: 0.45 },
      { GeneratorId: 2, TagId: 3, chance: 0.10 },

      { GeneratorId: 2, TagId: 4, chance: 0.80 },
      { GeneratorId: 2, TagId: 5, chance: 0.20 },

      { GeneratorId: 2, TagId: 6, chance: 0.60 },
      { GeneratorId: 2, TagId: 7, chance: 0.30 },
      { GeneratorId: 2, TagId: 8, chance: 0.10 },

      { GeneratorId: 2, TagId: 9, chance: 0.50 },
      { GeneratorId: 2, TagId: 10, chance: 0.50 },
      
      { GeneratorId: 2, TagId: 11, chance: 0.50 },
      { GeneratorId: 2, TagId: 12, chance: 0.50 },
      { GeneratorId: 2, TagId: 13, chance: 0.50 },

      { GeneratorId: 2, TagId: 14, chance: 0.95 },
      { GeneratorId: 2, TagId: 15, chance: 0.05 },

      { GeneratorId: 2, TagId: 16, chance: 0.50 },
      { GeneratorId: 2, TagId: 17, chance: 0.50 },
      { GeneratorId: 2, TagId: 18, chance: 0.50 },

      { GeneratorId: 2, TagId: 19, chance: 0.50 },
      { GeneratorId: 2, TagId: 20, chance: 0.50 },
    ])

    // TODO Is it possible to add a constraint so odds never over 1.0 per trait
    // type?
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Chances', null, {})
  }
};
