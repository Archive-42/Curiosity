const { r } = require("./index-references");

const traits = [
  {
    name: "Adept",
    description:
      "Adepts calm the flow of battle, reducing the Attack Speed of all enemies for a few seconds at the start of combat.",
    type: "class",
    image: "./set4/traits/adept.png",
  },
  {
    name: "Assassin",
    description:
      "Assassins gain bonus Critical Strike Damage and Chance, and their spells can critically strike.",
    type: "class",
    image: "./set4/traits/assassin.png",
  },
  {
    name: "Brawler",
    description: "Brawlers gain bonus Health.",
    type: "class",
    image: "./set4/traits/brawler.png",
  },
  {
    name: "Cultist",
    description:
      "Once your team loses a percentage of their Health, Galio is summoned, slamming into the largest cluster of enemies and knocking them up.",
    type: "origin",
    image: "./set4/traits/cultist.png",
  },
  {
    name: "Dazzler",
    description:
      "Dazzlers' spells reduce the Attack Damage of enemies hit for a few seconds.",
    type: "class",
    image: "./set4/traits/dazzler.png",
  },
  {
    name: "Divine",
    description:
      "Upon attacking several times or dropping below a percentage of their Health, Divine champions ascend, taking reduced damage and dealing bonus true damage for the rest of combat.",
    type: "origin",
    image: "./set4/traits/divine.png",
  },
  {
    name: "Duelist",
    description: "Duelists' attacks grant Attack Speed.",
    type: "class",
    image: "./set4/traits/duelist.png",
  },
  {
    name: "Dusk",
    description: "Dusk champions increase all allies' Spell Power.",
    type: "origin",
    image: "./set4/traits/dusk.png",
  },
  {
    name: "Elderwood",
    description:
      "Every two seconds all Elderwood champions grow, gaining bonus stats. This effect stacks up to five times.",
    type: "origin",
    image: "./set4/traits/elderwood.png",
  },
  {
    name: "Emperor",
    description:
      "The Emperor deploys with two Sand Guards who can be placed anywhere on the battlefield. They do not move or attack, and die when their Emperor does.",
    type: "class",
    image: "./set4/traits/emperor.png",
  },
  {
    name: "Enlightened",
    description: "Enlightened champions generate more Mana.",
    type: "origin",
    image: "./set4/traits/enlightened.png",
  },
  {
    name: "Exile",
    description:
      "If an Exile has no adjacent allies at the start of combat, they gain a shield equal to a percentage of their maximum health and Lifesteal if there are two or more Exiles.",
    type: "origin",
    image: "./set4/traits/exile.png",
  },
  {
    name: "Fortune",
    description:
      "Winning combat against a player will give bonus orbs. The longer you've gone without an orb, the bigger the payout! Wins give an extra bonus orb with rare loot if there are size or more Fortune!",
    type: "origin",
    image: "./set4/traits/fortune.png",
  },
  {
    name: "Hunter",
    description:
      "Every few seconds, all Hunters will attack the lowest percent Health enemy, dealing bonus damage.",
    type: "class",
    image: "./set4/traits/hunter.png",
  },
  {
    name: "Keeper",
    description:
      "At the start of combat, Keepers grant themselves and all nearby allies a shield for several seconds. This shield is stronger on Keepers.",
    type: "class",
    image: "./set4/traits/keeper.png",
  },
  {
    name: "Mage",
    description: "Mages cast twice and have modified Spell Power.",
    type: "class",
    image: "./set4/traits/mage.png",
  },
  {
    name: "Moonlight",
    description:
      "At the start of combat the lowest star-level Moonlight Champion stars up until combat ends. (If tied, the champion with the most items is chosen.)",
    type: "origin",
    image: "./set4/traits/moonlight.png",
  },
  {
    name: "Mystic",
    description: "All allies gain Magic Resistance.",
    type: "class",
    image: "./set4/traits/mystic.png",
  },
  {
    name: "Ninja",
    description:
      "Ninjas gain bonus Attack Damage and Spell Power. This trait is only active when you have exactly 1 or 4 unique Ninjas.",
    type: "origin",
    image: "./set4/traits/ninja.png",
  },
  {
    name: "Shade",
    description:
      "Every third attack Shades dip into the shadows, stealthing and causing their next basic attack to deal bonus magic damage.",
    type: "class",
    image: "./set4/traits/shade.png",
  },
  {
    name: "Sharpshooter",
    description:
      "Sharpshooters attacks and spells ricochet to nearby enemies dealing reduced damage.",
    type: "class",
    image: "./set4/traits/sharpshooter.png",
  },
  {
    name: "Spirit",
    description:
      "The first time a Spirit casts their spell, all allies gain Attack Speed based on the spell's mana cost.",
    type: "origin",
    image: "./set4/traits/spirit.png",
  },
  {
    name: "The Boss",
    description:
      "When The Boss first drops below a percentage of his Health, he leaves combat to start doing sit-ups. Each sit-up restores a percentage of his maximum Health and gives him Attack and Movement Speed. If he reaches full Health he returns to combat Pumped Up: all of his attacks and spells deal true damage. If all of his allies die, he will immediately return to combat.",
    type: "origin",
    image: "./set4/traits/theboss.png",
  },
  {
    name: "Tormented",
    description:
      "Tormented can be transformed after participating in several rounds of combat, enhancing their abilities.",
    type: "origin",
    image: "./set4/traits/tormented.png",
  },
  {
    name: "Vanguard",
    description: "Vanguard champions gain bonus Armor.",
    type: "class",
    image: "./set4/traits/vanguard.png",
  },
  {
    name: "Warlord",
    description:
      "Warlords have bonus Health and Spell Power. Each victorious combat they participate in increases the bonus.",
    type: "origin",
    image: "./set4/traits/warlord.png",
  },
];

const seedTraits = () => traits.map((t) => r(t));

const lol = () => traits.map((t, i) => console.log(t.name + ":" + (i + 1) + ","))

module.exports = seedTraits;
