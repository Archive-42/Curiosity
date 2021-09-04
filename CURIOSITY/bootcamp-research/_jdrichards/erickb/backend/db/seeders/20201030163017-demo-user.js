'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Freddy',
          lastName: 'Big-Walls',
          username: 'Demo-lition',
          email: 'demo@user.io',
          hashedPassword: bcrypt.hashSync('password')
        },
        {
          firstName: 'erick',
          lastName: 'bra',
          username: 'FakeUser1',
          email: 'demo1@user.io',
          photoUrl: faker.internet.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: 'FakeUser2',
          email: 'demo2@user.io',
          photoUrl: faker.internet.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: 'FakeUser3',
          email: 'demo3@user.io',
          photoUrl: faker.internet.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: 'FakeUser4',
          email: 'demo4@user.io',
          photoUrl: faker.internet.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: 'FakeUser5',
          email: 'demo5@user.io',
          photoUrl: faker.internet.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: 'FakeUser6',
          email: 'demo6@user.io',
          photoUrl: faker.internet.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: 'FakeUser7',
          email: 'demo7@user.io',
          photoUrl: faker.internet.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: 'FakeUser8',
          email: 'demo8@user.io',
          photoUrl: faker.internet.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: 'FakeUser9',
          email: 'demo9@user.io',
          photoUrl: faker.internet.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: 'FakeUser10',
          email: 'demo10@user.io',
          photoUrl: faker.internet.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: 'FakeUser11',
          email: 'demo11@user.io',
          photoUrl: faker.internet.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: 'FakeUser12',
          email: 'demo12@user.io',
          photoUrl: faker.internet.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: 'FakeUser13',
          email: 'demo13@user.io',
          photoUrl: faker.internet.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: 'FakeUser14',
          email: 'demo14@user.io',
          photoUrl: faker.internet.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: 'FakeUser15',
          email: 'demo15@user.io',
          photoUrl: faker.internet.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        }
      ],
      { returning: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'Users',
      {
        username: {
          [Sequelize.Op.in]: [
            'Demo-lition',
            'FakeUser1'
            // 'FakeUser2',
            // 'FakeUser3',
            // 'FakeUser4',
            // 'FakeUser5',
            // 'FakeUser6',
            // 'FakeUser7',
            // 'FakeUser8',
            // 'FakeUser9',
            // 'FakeUser10',
            // 'FakeUser11',
            // 'FakeUser12',
            // 'FakeUser13',
            // 'FakeUser14',
            // 'FakeUser15'
          ]
        }
      },
      {}
    );
  }
};
