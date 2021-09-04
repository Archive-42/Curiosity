'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            instructorId: {
                type: Sequelize.INTEGER,
            },
            projectName: {
                type: Sequelize.STRING,
            },
            liveLink: {
                type: Sequelize.STRING,
            },
            repoLink: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    },
};
