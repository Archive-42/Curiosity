"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Editor",
          email: "editor@gmail.com",
          userIcon: "fuwa",
          rank: "Challenger",
          verified: true,
          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "spookychu",
          email: "berber@gmail.com",
          userIcon: "hushtail",
          rank: "Diamond",
          verified: true,
          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "MomatoMimumu",
          email: "ming@gmail.com",
          userIcon: "pengu",
          rank: "Master",
          verified: true,
          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "No Tomatoes",
          email: "tomato@gmail.com",
          userIcon: "pengu",
          rank: "Iron",
          verified: true,
          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Saladz",
          email: "alan@gmail.com",
          userIcon: "silverwing",
          rank: "Diamond",
          verified: true,
          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Giratina",
          email: "brandon@gmail.com",
          userIcon: "shisa",
          rank: "Silver",
          verified: true,
          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "tiibasu",
          email: "ak@gmail.com",
          userIcon: "shisa",
          rank: "Bronze",
          verified: true,
          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Static Snow",
          email: "keith@gmail.com",
          userIcon: "pengu",
          rank: "Platinum",
          verified: true,
          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Noveko",
          email: "eben@gmail.com",
          userIcon: "silverwing",
          rank: "Gold",
          verified: true,
          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
