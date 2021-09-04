'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Topics", [
      {topic: "Spells"},
      {topic: "Potions"},
      {topic: "Familiars"},
      {topic: "Magical Artifacts"},
      {topic: "Charms & Amulets"},
      {topic: "Enchantments"},
      {topic: "Broomsticks"},
      {topic: "Curses"},
      {topic: "Poison"},
      {topic: "Runes & Sigils"},
      {topic: "Tarot"},
      {topic: "Ouija"},
      {topic: "Tomes & Scrolls"},
      {topic: "Alchemy"},
      {topic: "Herbology"},
      {topic: "Beastiary"},
      {topic: "Astronomy"},
      {topic: "Candle-making"},
      {topic: "Omens"},
      {topic: "Cooking"},
      {topic: "History"},
      {topic: "Divination"},
      {topic: "Scrying"},
      {topic: "Channeling"},
      {topic: "Rites & Rituals"},
      {topic: "Elemental Magic"},
      {topic: "Magic Tricks"},
      {topic: "Technomancy"},
      {topic: "Blood magic"},
      {topic: "Necromancy"},
      {topic: "Astrology"},
      {topic: "Numerology"},
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Topics", null, {})
  }
};
