'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      { username: "admin", email: "almyki@gmail.com", hashword: bcrypt.hashSync("password") },
      { username: "demo", hashword: bcrypt.hashSync("demo") },
      { username: "lucien", hashword: bcrypt.hashSync("lucien") },
      { username: "rosalyn", hashword: bcrypt.hashSync("rosalyn") },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
