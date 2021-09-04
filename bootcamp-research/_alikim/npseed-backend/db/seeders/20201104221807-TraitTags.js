'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("TraitTags", [
            { TraitId: 53, TagId: 5, },
            { TraitId: 53, TagId: 2, },
            { TraitId: 54, TagId: 5, },
            { TraitId: 54, TagId: 2, },
            { TraitId: 55, TagId: 5, },
            { TraitId: 55, TagId: 2, },
            { TraitId: 56, TagId: 5, },
            { TraitId: 56, TagId: 2, },
            { TraitId: 57, TagId: 5, },
            { TraitId: 57, TagId: 1, },
            { TraitId: 58, TagId: 5, },
            { TraitId: 58, TagId: 4, },
            { TraitId: 58, TagId: 1, },
            { TraitId: 59, TagId: 5, },
            { TraitId: 59, TagId: 2, },
            { TraitId: 60, TagId: 4, },
            { TraitId: 60, TagId: 2, },
            { TraitId: 61, TagId: 4, },
            { TraitId: 61, TagId: 1, },
            { TraitId: 62, TagId: 4, },
            { TraitId: 62, TagId: 2, },
            { TraitId: 18, TagId: 4, },
            { TraitId: 19, TagId: 4, },
            { TraitId: 20, TagId: 5, },
            { TraitId: 21, TagId: 5, },
            { TraitId: 10, TagId: 1, },
            { TraitId: 11, TagId: 2, },
            { TraitId: 12, TagId: 3, },
            { TraitId: 13, TagId: 3, },
            { TraitId: 22, TagId: 4, },
            { TraitId: 23, TagId: 5, },
            { TraitId: 24, TagId: 5, },
            { TraitId: 25, TagId: 5, },
        ])
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("TraitTags", null, {})
    }
}