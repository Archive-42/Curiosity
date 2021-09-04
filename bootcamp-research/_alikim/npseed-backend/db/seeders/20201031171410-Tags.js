'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tags', [
      
      // gender
      { tag: "masculine", TagTypeId: 1, },
      { tag: "feminine", TagTypeId: 1, },
      { tag: "neutral", TagTypeId: 1, },

      // region
      { tag: "arctic", TagTypeId: 2, },
      { tag: "north america", TagTypeId: 2, },
      { tag: "south america", TagTypeId: 2, },
      { tag: "europe", TagTypeId: 2, },
      { tag: "asia", TagTypeId: 2, },
      { tag: "africa", TagTypeId: 2, },
      { tag: "oceania", TagTypeId: 2, },
      { tag: "eastern", TagTypeId: 2, },
      { tag: "western", TagTypeId: 2, },
      { tag: "free", TagTypeId: 2, },

      // theme
      { tag: "nature", TagTypeId: 3, },
      { tag: "flora", TagTypeId: 3, },
      { tag: "fauna", TagTypeId: 3, },
      { tag: "astronomy", TagTypeId: 3, },
      { tag: "earth", TagTypeId: 3, },
      { tag: "virtue", TagTypeId: 3, },
      { tag: "vice", TagTypeId: 3, },
      { tag: "biblical", TagTypeId: 3, },
      { tag: "technology", TagTypeId: 3, },
      { tag: "color", TagTypeId: 3, },

      // color
      { tag: "light", TagTypeId: 4, },
      { tag: "dark", TagTypeId: 4, },
      { tag: "warm", TagTypeId: 4, },
      { tag: "cool", TagTypeId: 4, },
      { tag: "earthy", TagTypeId: 4, },
      { tag: "colorful", TagTypeId: 4, },
      { tag: "white", TagTypeId: 4, },
      { tag: "gray", TagTypeId: 4, },
      { tag: "black", TagTypeId: 4, },
      { tag: "red", TagTypeId: 4, },
      { tag: "orange", TagTypeId: 4, },
      { tag: "yellow", TagTypeId: 4, },
      { tag: "green", TagTypeId: 4, },
      { tag: "blue", TagTypeId: 4, },
      { tag: "purple", TagTypeId: 4, },
      { tag: "pink", TagTypeId: 4, },
      { tag: "brown", TagTypeId: 4, },
      { tag: "metallic", TagTypeId: 4, },
      { tag: "rainbow", TagTypeId: 4, },

      // creature type
      { tag: "human", TagTypeId: 5, },
      { tag: "humanoid", TagTypeId: 5, },
      { tag: "non-humanoid", TagTypeId: 5, },
      { tag: "fantasy races", TagTypeId: 5, },
      { tag: "supernatural", TagTypeId: 5, },
      { tag: "spirit/incorporeal", TagTypeId: 5, },
      { tag: "fey", TagTypeId: 5, },
      { tag: "biblical", TagTypeId: 5, },
      { tag: "hooved", TagTypeId: 5, },
      { tag: "winged", TagTypeId: 5, },
      { tag: "part-animal", TagTypeId: 5, },
      { tag: "planty", TagTypeId: 5, },
      { tag: "animal", TagTypeId: 5, },
      { tag: "monstrous", TagTypeId: 5, },
      { tag: "artificial", TagTypeId: 5, },

      // setting
      { tag: "D&D", TagTypeId: 6, },
      { tag: "fantasy", TagTypeId: 6, },
      { tag: "sci-fi", TagTypeId: 6, },
      { tag: "supernatural", TagTypeId: 6, },
      { tag: "fairy tale", TagTypeId: 6, },
      { tag: "Tolkein", TagTypeId: 6, },
      { tag: "biblical", TagTypeId: 6, },
      { tag: "modern", TagTypeId: 6, },
      { tag: "historic", TagTypeId: 6, },
      { tag: "steampunk", TagTypeId: 6, },

      // age
      { tag: "baby", TagTypeId: 7, },
      { tag: "young", TagTypeId: 7, },
      { tag: "adult", TagTypeId: 7, },
      { tag: "elder", TagTypeId: 7, },

      // field of work
      { tag: "military", TagTypeId: 8, },
      { tag: "religion", TagTypeId: 8, },
      { tag: "government", TagTypeId: 8, },
      { tag: "law", TagTypeId: 8, },
      { tag: "crime", TagTypeId: 8, },
      { tag: "outcast", TagTypeId: 8, },
      { tag: "hermit", TagTypeId: 8, },
      { tag: "nobility", TagTypeId: 8, },
      { tag: "labor", TagTypeId: 8, },
      { tag: "trade", TagTypeId: 8, },
      { tag: "craft", TagTypeId: 8, },
      { tag: "travel", TagTypeId: 8, },
      { tag: "arts", TagTypeId: 8, },
      { tag: "academia", TagTypeId: 8, },
      { tag: "arcane", TagTypeId: 8, },

      // time period
      { tag: "ancient", TagTypeId: 9, },
      { tag: "medieval", TagTypeId: 9, },
      { tag: "modern", TagTypeId: 9, },
      { tag: "future", TagTypeId: 9, },

      // unusualness
      { tag: "common", TagTypeId: 10, },
      { tag: "rare", TagTypeId: 10, },

      // style
      { tag: "cute", TagTypeId: 11, },
      { tag: "nerdy", TagTypeId: 11, },
      { tag: "fancy", TagTypeId: 11, },

      // { tag: "full", TagTypeId: 4, },
      // { tag: "nickname", TagTypeId: 4, },

      // { tag: "tiny", TagTypeId: 4, },
      // { tag: "small", TagTypeId: 4, },
      // { tag: "medium", TagTypeId: 4, },
      // { tag: "large", TagTypeId: 4, },
      // { tag: "huge", TagTypeId: 4, },


    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Tags", null, {})
  }
};

African - afr
Asian
European
Mythology
Oceanian
Indigenous American
Ancient
Medieval
Other
Astronomy
Fairy fairy
