'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Categories', [
            { category: "essentials" },
            { category: "appearance" },
            { category: "attire" },
            { category: "personality" },
            { category: "story" },
            { category: "assets" },
            { category: "stats" },
        ])
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Categories', null, {})
    }
}