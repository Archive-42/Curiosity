const { i, p, r } = require("./index-references");

const parts = [
  {
    itemId: i.Deathblade,
    componentId: p.BFSword,
  },
  {
    itemId: i.Deathblade,
    componentId: p.BFSword,
  },
  {
    itemId: i.GiantSlayer,
    componentId: p.BFSword,
  },
  {
    itemId: i.GiantSlayer,
    componentId: p.RecurveBow,
  },
  {
    itemId: i.HextechGunblade,
    componentId: p.BFSword,
  },
  {
    itemId: i.HextechGunblade,
    componentId: p.NeedlesslyLargeRod,
  },
  {
    itemId: i.SpearofShojin,
    componentId: p.BFSword,
  },
  {
    itemId: i.SpearofShojin,
    componentId: p.TearoftheGoddess,
  },
  {
    itemId: i.GuardianAngel,
    componentId: p.BFSword,
  },
  {
    itemId: i.GuardianAngel,
    componentId: p.ChainVest,
  },
  {
    itemId: i.Bloodthirster,
    componentId: p.BFSword,
  },
  {
    itemId: i.Bloodthirster,
    componentId: p.NegatronCloak,
  },
  {
    itemId: i.ZekesHerald,
    componentId: p.BFSword,
  },
  {
    itemId: i.ZekesHerald,
    componentId: p.GiantsBelt,
  },
  {
    itemId: i.SwordoftheDivine,
    componentId: p.Spatula,
  },
  {
    itemId: i.SwordoftheDivine,
    componentId: p.BFSword,
  },
  {
    itemId: i.InfinityEdge,
    componentId: p.BFSword,
  },
  {
    itemId: i.InfinityEdge,
    componentId: p.SparringGloves,
  },
  {
    itemId: i.RapidFirecannon,
    componentId: p.RecurveBow,
  },
  {
    itemId: i.RapidFirecannon,
    componentId: p.RecurveBow,
  },
  {
    itemId: i.GuinsoosRageblade,
    componentId: p.RecurveBow,
  },
  {
    itemId: i.GuinsoosRageblade,
    componentId: p.NeedlesslyLargeRod,
  },
  {
    itemId: i.StatikkShiv,
    componentId: p.RecurveBow,
  },
  {
    itemId: i.StatikkShiv,
    componentId: p.TearoftheGoddess,
  },

  {
    itemId: i.TitansResolve,
    componentId: p.RecurveBow,
  },
  {
    itemId: i.TitansResolve,
    componentId: p.ChainVest,
  },

  {
    itemId: i.RunaansHurricane,
    componentId: p.RecurveBow,
  },
  {
    itemId: i.RunaansHurricane,
    componentId: p.NegatronCloak,
  },

  {
    itemId: i.ZzRotPortal,
    componentId: p.RecurveBow,
  },
  {
    itemId: i.ZzRotPortal,
    componentId: p.GiantsBelt,
  },

  {
    itemId: i.DuelistsZeal,
    componentId: p.RecurveBow,
  },
  {
    itemId: i.DuelistsZeal,
    componentId: p.Spatula,
  },

  {
    itemId: i.LastWhisper,
    componentId: p.RecurveBow,
  },
  {
    itemId: i.LastWhisper,
    componentId: p.SparringGloves,
  },
  {
    itemId: i.RabadonsDeathcap,
    componentId: p.NeedlesslyLargeRod,
  },
  {
    itemId: i.RabadonsDeathcap,
    componentId: p.NeedlesslyLargeRod,
  },
  {
    itemId: i.LudensEcho,
    componentId: p.NeedlesslyLargeRod,
  },
  {
    itemId: i.LudensEcho,
    componentId: p.TearoftheGoddess,
  },
  {
    itemId: i.LocketoftheIronSolari,
    componentId: p.NeedlesslyLargeRod,
  },
  {
    itemId: i.LocketoftheIronSolari,
    componentId: p.ChainVest,
  },
  {
    itemId: i.IonicSpark,
    componentId: p.NeedlesslyLargeRod,
  },
  {
    itemId: i.IonicSpark,
    componentId: p.NegatronCloak,
  },
  {
    itemId: i.Morellonomicon,
    componentId: p.NeedlesslyLargeRod,
  },
  {
    itemId: i.Morellonomicon,
    componentId: p.GiantsBelt,
  },
  {
    itemId: i.AspectofDusk,
    componentId: p.NeedlesslyLargeRod,
  },
  {
    itemId: i.AspectofDusk,
    componentId: p.Spatula,
  },
  {
    itemId: i.JeweledGauntlet,
    componentId: p.NeedlesslyLargeRod,
  },
  {
    itemId: i.JeweledGauntlet,
    componentId: p.SparringGloves,
  },
  {
    itemId: i.BlueBuff,
    componentId: p.TearoftheGoddess,
  },
  {
    itemId: i.BlueBuff,
    componentId: p.TearoftheGoddess,
  },
  {
    itemId: i.FrozenHeart,
    componentId: p.TearoftheGoddess,
  },
  {
    itemId: i.FrozenHeart,
    componentId: p.ChainVest,
  },
  {
    itemId: i.ChaliceofPower,
    componentId: p.TearoftheGoddess,
  },
  {
    itemId: i.ChaliceofPower,
    componentId: p.NegatronCloak,
  },
  {
    itemId: i.Redemption,
    componentId: p.TearoftheGoddess,
  },
  {
    itemId: i.Redemption,
    componentId: p.GiantsBelt,
  },
  {
    itemId: i.MagesHat,
    componentId: p.TearoftheGoddess,
  },
  {
    itemId: i.MagesHat,
    componentId: p.Spatula,
  },
  {
    itemId: i.HandOfJustice,
    componentId: p.TearoftheGoddess,
  },
  {
    itemId: i.HandOfJustice,
    componentId: p.SparringGloves,
  },
  {
    itemId: i.BrambleVest,
    componentId: p.ChainVest,
  },
  {
    itemId: i.BrambleVest,
    componentId: p.ChainVest,
  },
  {
    itemId: i.GargoyleStoneplate,
    componentId: p.NegatronCloak,
  },
  {
    itemId: i.GargoyleStoneplate,
    componentId: p.ChainVest,
  },
  {
    itemId: i.SunfireCape,
    componentId: p.GiantsBelt,
  },
  {
    itemId: i.SunfireCape,
    componentId: p.ChainVest,
  },
  {
    itemId: i.VanguardsCuirass,
    componentId: p.Spatula,
  },
  {
    itemId: i.VanguardsCuirass,
    componentId: p.ChainVest,
  },
  {
    itemId: i.ShroudofStillness,
    componentId: p.ChainVest,
  },
  {
    itemId: i.ShroudofStillness,
    componentId: p.SparringGloves,
  },
  {
    itemId: i.DragonsClaw,
    componentId: p.NegatronCloak,
  },
  {
    itemId: i.DragonsClaw,
    componentId: p.NegatronCloak,
  },
  {
    itemId: i.Zephyr,
    componentId: p.NegatronCloak,
  },
  {
    itemId: i.Zephyr,
    componentId: p.GiantsBelt,
  },
  {
    itemId: i.ElderwoodSprout,
    componentId: p.NegatronCloak,
  },
  {
    itemId: i.ElderwoodSprout,
    componentId: p.Spatula,
  },
  {
    itemId: i.Quicksilver,
    componentId: p.NegatronCloak,
  },
  {
    itemId: i.Quicksilver,
    componentId: p.SparringGloves,
  },
  {
    itemId: i.WarmogsArmor,
    componentId: p.GiantsBelt,
  },
  {
    itemId: i.WarmogsArmor,
    componentId: p.GiantsBelt,
  },
  {
    itemId: i.WarlordsBanner,
    componentId: p.GiantsBelt,
  },
  {
    itemId: i.WarlordsBanner,
    componentId: p.Spatula,
  },
  {
    itemId: i.TrapClaw,
    componentId: p.GiantsBelt,
  },
  {
    itemId: i.TrapClaw,
    componentId: p.SparringGloves,
  },
  {
    itemId: i.ForceofNature,
    componentId: p.Spatula,
  },
  {
    itemId: i.ForceofNature,
    componentId: p.Spatula,
  },
  {
    itemId: i.YoumuusGhostblade,
    componentId: p.SparringGloves,
  },
  {
    itemId: i.YoumuusGhostblade,
    componentId: p.Spatula,
  },
  {
    itemId: i.ThiefsGloves,
    componentId: p.SparringGloves,
  },
  {
    itemId: i.ThiefsGloves,
    componentId: p.SparringGloves,
  },
];

const seedParts = () => parts.map((p) => r(p));

module.exports = seedParts;
