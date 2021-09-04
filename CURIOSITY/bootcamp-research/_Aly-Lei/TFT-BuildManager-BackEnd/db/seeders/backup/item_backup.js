const components = [
  {
    name: "B.F. Sword",
    acronym: "BF",
    description: "Gain Attack Damage.",
    image: "",
  },
  {
    name: "Recurve Bow",
    acronym: "Bow",
    description: "Gain Attack Speed.",
    image: "",
  },
  {
    name: "Needlessly Large Rod",
    acronym: "Rod",
    description: "Gain Spell Power.",
    image: "",
  },
  {
    name: "Tear of the Goddess",
    acronym: "Tear",
    description: "Gain Mana.",
    image: "",
  },
  {
    name: "Chain Vest",
    acronym: "Vest",
    description: "Gain Armor.",
    image: "",
  },
  {
    name: "Negatron Cloak",
    acronym: "Cloak",
    description: "Gain Magic Resist.",
    image: "",
  },
  {
    name: "Giant's Belt",
    acronym: "Belt",
    description: "Gain Health.",
    image: "",
  },
  {
    name: "Spatula",
    acronym: "Spat",
    description: "It must do something...",
    image: "",
  },
  {
    name: "Sparring Gloves",
    acronym: "Gloves",
    description: "Gain Critical Strike Chance and Dodge Chance.",
    image: "",
  },
];

const items = [
  {
    name: "Deathblade",
    acronym: "DB",
    description:
      "Contributing to a kill grants the holder addtional Attack Damage for the rest of combat.",
    c1: "BF",
    c2: "BF",
    image: "",
  },
  {
    name: "Giant Slayer",
    acronym: "GS",
    description:
      "The holder's spells and basic attacks do bonus damage. If the target has more health, the bonus damage increases.",
    c1: "BF",
    c2: "Bow",
    image: "",
  },
  {
    name: "Hextech Gunblade",
    acronym: "GB",
    description:
      "The holder's spells heal them for a percentage of the damage dealt. Excess healing fuels a shield that protects the holder.",
    c1: "BF",
    c2: "Rod",
    image: "",
  },
  {
    name: "Spear of Shojin",
    acronym: "Shojin",
    description: "The holder's basic attacks restore Mana on-hit.",
    c1: "BF",
    c2: "Tear",
    image: "",
  },
  {
    name: "Guardian Angel",
    acronym: "GA",
    description:
      "Prevents the wearer's first death, reviving them after a short delay and sheding all negative effects.",
    c1: "BF",
    c2: "Vest",
    image: "",
  },
  {
    name: "Bloodthirster",
    acronym: "BT",
    description:
      "Basic attacks heal the holder for a percentage of the damage dealt.",
    c1: "BF",
    c2: "Cloak",
    image: "",
  },
  {
    name: "Zeke's Herald",
    acronym: "Zekes",
    description:
      "When combat begins, the wearer and nearby allies in the same row gain Attack Speed for the rest of combat.",
    c1: "BF",
    c2: "Belt",
    image: "",
  },
  {
    name: "Sword of the Divine",
    acronym: "SotD",
    description: "The holder gains the Divine trait.",
    c1: "BF",
    c2: "Spat",
    image: "",
  },
  {
    name: "Infinity Edge",
    acronym: "IE",
    description:
      "Grants Critical Strike Chance. Each point of Critical Strike Chance above 100% becomes bonus Critical Strike Damage.",
    c1: "BF",
    c2: "Gloves",
    image: "",
  },
  {
    name: "Rapid Firecannon",
    acronym: "RFC",
    description:
      "The holder gains Attack Range, and their Basic Attacks can't miss.",
    c1: "Bow",
    c2: "Bow",
    image: "",
  },
  {
    name: "Guinsoo's Rageblade",
    acronym: "GRB",
    description:
      "Basic Attacks grant bonus Attack Speed for the rest of combat.",
    c1: "Bow",
    c2: "Rod",
    image: "",
  },
  {
    name: "Statikk Shiv",
    acronym: "Statikk",
    description:
      "Every third Basic Attack from the wearer deals Magic Damage to nearby enemies, and true damage if they are shielded or crowd-controlled.",
    c1: "Bow",
    c2: "Tear",
    image: "",
  },
  {
    name: "Titan's Resolve",
    acronym: "TR",
    description:
      "When the wearer takes damage or inflicts a critical hit, they gain a stacking damage bonus. The damage stacks up to a limit, at which point the wearer gains Armor and Magic Resistance, and increases in size.",
    c1: "Bow",
    c2: "Vest",
    image: "",
  },
  {
    name: "Runaan's Hurricane",
    acronym: "RH",
    description:
      "Basic Attacks fire a bolt at another nearby enemy, dealing a percentage of the wearer's Attack Damage and applying on-hit effects. These bolts can critical strike.",
    c1: "Bow",
    c2: "Cloak",
    image: "",
  },
  {
    name: "Zz'Rot Portal",
    acronym: "ZzR",
    description:
      "When the wearer dies, a Construct arises to continue the fight.",
    c1: "Bow",
    c2: "Belt",
    image: "",
  },
  {
    name: "Duelist's Zeal",
    acronym: "DZ",
    description: "The holder gains the Duelist trait.",
    c1: "Bow",
    c2: "Spat",
    image: "",
  },
  {
    name: "Last Whisper",
    acronym: "LW",
    description:
      "When the wearer inflicts a critical hit, the target's Armor is reduced for a number of seconds.",
    c1: "Bow",
    c2: "Gloves",
    image: "",
  },
  {
    name: "Rabadon's Deathcap",
    acronym: "DCap",
    description: "The holder gains additional Spell Power.",
    c1: "Rod",
    c2: "Rod",
    image: "",
  },
  {
    name: "Luden's Echo",
    acronym: "Luden",
    description:
      "When the holder casts their spell, the first target dealt magic damage and to nearby enemies are dealt additional magic damage.",
    c1: "Rod",
    c2: "Tear",
    image: "",
  },
  {
    name: "Locket of the Iron Solari",
    acronym: "Locket",
    description:
      "When combat begins, the wearer and nearby allies in the same row gain a shield that blocks damage for several seconds.",
    c1: "Rod",
    c2: "Vest",
    image: "",
  },
  {
    name: "Ionic Spark",
    acronym: "IS",
    description:
      "Nearby enemies have their Magic Resist reduced. When they cast a spell, they are zapped taking magic damage equal to a percentage of their max Mana.",
    c1: "Rod",
    c2: "Cloak",
    image: "",
  },
  {
    name: "Morellonomicon",
    acronym: "Morello",
    description:
      "When the holder deals damage with their spell, they burn the target, dealing a percentage of the target's maximum Health as true damage over several seconds, and reducing healing by a percentage for the duration of the burn.",
    c1: "Rod",
    c2: "Belt",
    image: "",
  },
  {
    name: "Aspect of Dusk",
    acronym: "MoD",
    description: "The holder gains the Dusk trait.",
    c1: "Rod",
    c2: "Spat",
    image: "",
  },
  {
    name: "Jeweled Gauntlet",
    acronym: "JG",
    description:
      "The holder's spells can cause critical hits, and the holder gains bonus Critical Strike Damage.",
    c1: "Rod",
    c2: "Gloves",
    image: "",
  },
  {
    name: "Blue Buff",
    acronym: "Blue",
    description: "After casting their spell, the wearer gains Mana.",
    c1: "Tear",
    c2: "Tear",
    image: "",
  },
  {
    name: "Frozen Heart",
    acronym: "FH",
    description:
      "Reduces the Attack Speed of nearby enemies. Each Frozen Heart a champion carries beyond the first increases the radius of this effect.",
    c1: "Tear",
    c2: "Vest",
    image: "",
  },
  {
    name: "Chalice of Power",
    acronym: "CoP",
    description:
      "When combat begins, the wearer and all nearby allies in the same row gain Spell Power for the rest of combat.",
    c1: "Tear",
    c2: "Cloak",
    image: "",
  },
  {
    name: "Redemption",
    acronym: "Rdmp",
    description: "When the wearer dies, allies are healed.",
    c1: "Tear",
    c2: "Belt",
    image: "",
  },
  {
    name: "Mage's Hat",
    acronym: "MC",
    description: "The holder gains the Mage trait.",
    c1: "Tear",
    c2: "Spat",
    image: "",
  },
  {
    name: "Hand Of Justice",
    acronym: "HoJ",
    description:
      "At the beginning of each planning phase, the wearer's basic attacks and spells deal additional damage or heal for a percentage of damage dealt.",
    c1: "Tear",
    c2: "Gloves",
    image: "",
  },
  {
    name: "Bramble Vest",
    acronym: "BV",
    description:
      "Negates bonus damage from incoming critical hits. On being hit by a Basic Attack, deal magic damage to all nearby enemies.",
    c1: "Vest",
    c2: "Vest",
    image: "",
  },
  {
    name: "Gargoyle Stoneplate",
    acronym: "GaSt",
    description:
      "The holder gains Armor and Magic Resist for each enemy targeting them.",
    c1: "Vest",
    c2: "Cloak",
    image: "",
  },
  {
    name: "Sunfire Cape",
    acronym: "SC",
    description:
      "At start of combat, and every couple seconds thereafter, a random nearby enemyis burned for a percentage of their maximum health. Any healing they receive is reduced.",
    c1: "Vest",
    c2: "Belt",
    image: "",
  },
  {
    name: "Vanguard's Cuirass",
    acronym: "VC",
    description: "The holder gains the Vanguard trait.",
    c1: "Vest",
    c2: "Spat",
    image: "",
  },
  {
    name: "Shroud of Stillness",
    acronym: "Shroud",
    description:
      "When combat begins, shoots a beam straight ahead that delays affected enemies' first spellcast, increasing their max Mana until they cast.",
    c1: "Vest",
    c2: "Gloves",
    image: "",
  },
  {
    name: "Dragon's Claw",
    acronym: "DClaw",
    description: "Reduces incoming magic damage.",
    c1: "Cloak",
    c2: "Cloak",
    image: "",
  },
  {
    name: "Zephyr",
    acronym: "ZE",
    description:
      "When combat begins, the wearer summons a whirlwind on the opposite side of the arena that removes the closest enemy from combat for several seconds.",
    c1: "Cloak",
    c2: "Belt",
    image: "",
  },
  {
    name: "Elderwood Sprout",
    acronym: "EH",
    description: "The holder gains the Elderwood trait.",
    c1: "Cloak",
    c2: "Spat",
    image: "",
  },
  {
    name: "Quicksilver",
    acronym: "QSS",
    description:
      "The wearer is immune to crowd control for the first several seconds of combat.",
    c1: "Cloak",
    c2: "Gloves",
    image: "",
  },
  {
    name: "Warmog's Armor",
    acronym: "WM",
    description: "Grants bonus Health.",
    c1: "Belt",
    c2: "Belt",
    image: "",
  },
  {
    name: "Warlord's Banner",
    acronym: "WB",
    description: "The wearer gains the Warlord trait.",
    c1: "Belt",
    c2: "Spat",
    image: "",
  },
  {
    name: "Trap Claw",
    acronym: "TClaw",
    description:
      "Blocks the first enemy spell that hits the wearer, and stuns the spell's caster for several seconds.",
    c1: "Belt",
    c2: "Gloves",
    image: "",
  },
  {
    name: "Force of Nature",
    acronym: "FON",
    description: "",
    c1: "Spat",
    c2: "Spat",
    image: "",
  },
  {
    name: "Youmuu's Ghostblade",
    acronym: "YG",
    description: "The wearer gains the Assassin trait.",
    c1: "Spat",
    c2: "Gloves",
    image: "",
  },
  {
    name: "Thief's Gloves",
    acronym: "TG",
    description:
      "At the beginning of each planning phase, the wearer equips 2 temporary items. Temporary items increase in power based on your player level.",
    c1: "Gloves",
    c2: "Gloves",
    image: "",
  },
];
