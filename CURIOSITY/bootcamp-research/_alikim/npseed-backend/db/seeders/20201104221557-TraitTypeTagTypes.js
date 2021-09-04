'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("TagTypesOfTraitTypes", [
            { TagTypeId: 1, TraitTypeId: 15 }, // gender
            { TagTypeId: 2, TraitTypeId: 15 }, // culture
            // { TagTypeId: 3, TraitTypeId: 15 }, // theme
            // { TagTypeId: 7, TraitTypeId: 15 }, // first letter
            { TagTypeId: 1, TraitTypeId: 3 }, // gender, gender
            { TagTypeId: 2, TraitTypeId: 5 }, // culture, hair
            { TagTypeId: 2, TraitTypeId: 6 }, // culture, eyes
        ])
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("TagTypesOfTraitTypes", null, {})
    }
}