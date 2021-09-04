"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Boards",
      [
        {
          title: "Olaf slayers",
          subtitle: "Olaf carry with Supporting Units",
          grid: JSON.stringify([
            {
              id: "TFT4_Olaf",
              items: ["RH", "DB", "GA"],
              position: 0,
            },
            {
              id: "TFT4_Sivir",
              items: ["CoP", "Zekes"],
              position: 1,
            },
            {
              id: "TFT4_Aatrox",
              position: 2,
            },
            {
              id: "TFT4_Morgana",
              position: 3,
            },
            {
              id: "TFT4_Sejuani",
              position: 4,
            },
            {
              id: "TFT4_Samira",
              position: 7,
            },
            {
              id: "TFT4_Pyke",
              position: 12,
            },
            {
              id: "TFT4_Swain",
              position: 21,
            },
          ]),
          authorId: 1,
          actives: JSON.stringify({
            Cultist: 3,
            Set4_Slayer: 3,
            Sharpshooter: 2,
            Set4_Syphoner: 2,
            Set4_Vanguard: 2,
            Set4_Daredevil: 1,
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Spirit Slayers",
          subtitle: "Zed Carry with Aura Buffs",
          grid: JSON.stringify([
            {
              id: "TFT4_Pyke",
              position: 14,
            },
            {
              id: "TFT4_Diana",
              position: 21,
            },
            {
              id: "TFT4_Teemo",
              position: 22,
            },
            {
              id: "TFT4_Janna",
              position: 23,
            },
            {
              id: "TFT4_Yuumi",
              position: 24,
            },
            {
              id: "TFT4_Azir",
              position: 25,
            },
            {
              id: "TFT4_Kindred",
              items: ["Zekes", "Zekes"],
              position: 26,
            },
            {
              id: "TFT4_Zed",
              items: ["GA", "DB", "QSS"],
              position: 27,
            },
          ]),
          authorId: 1,
          actives: JSON.stringify({
            Emperor: 1,
            Set4_Ninja: 1,
            Set4_Mystic: 2,
            Set4_Spirit: 4,
            Set4_Assassin: 2,
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          title: "6 Elderwood",
          subtitle: "Xayah & Rakan Core, ASOL Secondary Carry",
          grid: JSON.stringify([
            {
              id: "TFT4_Ornn",
              position: 3,
            },
            {
              id: "TFT4_Aatrox",
              position: 4,
            },
            {
              id: "TFT4_Nunu",
              position: 7,
            },
            {
              id: "TFT4_Xayah",
              items: ["HoJ", "HoJ", "DB"],
              position: 14,
            },
            {
              id: "TFT4_Rakan",
              items: ["SC"],
              position: 15,
            },
            {
              id: "TFT4_Lulu",
              position: 16,
            },
            {
              id: "TFT4_AurelionSol",
              items: ["GB", "EH", "JG"],
              position: 21,
            },
            {
              id: "TFT4_Veigar",
              position: 22,
            },
          ]),
          authorId: 1,
          actives: JSON.stringify({
            Keeper: 2,
            Set4_Mage: 3,
            Set4_Vanguard: 2,
            Set4_Elderwood: 6,
            Set4_Blacksmith: 1,
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Boards", null, {});
  },
};
