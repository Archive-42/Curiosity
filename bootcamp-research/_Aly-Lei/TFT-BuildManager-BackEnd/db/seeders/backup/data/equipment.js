const { c, r, i } = require("./index-references");

const defaultEquipment = [
  r({
    championId: c.Aatrox,
    itemId: i.GuardianAngel,
  }),
  r({
    championId: c.Aatrox,
    itemId: i.IonicSpark,
  }),
  r({
    championId: c.Aatrox,
    itemId: i.Redemption,
  }),
  r({
    championId: c.Ahri,
    itemId: i.GuardianAngel,
  }),
  r({
    championId: c.Ahri,
    itemId: i.Morellonomicon,
  }),
  r({
    championId: c.Ahri,
    itemId: i.JeweledGauntlet,
  }),
  r({
    championId: c.Akali,
    itemId: i.BlueBuff,
  }),
  r({
    championId: c.Akali,
    itemId: i.RapidFirecannon,
  }),
  r({
    championId: c.Akali,
    itemId: i.InfinityEdge,
  }),
  r({
    championId: c.Annie,
    itemId: i.Quicksilver,
  }),
  r({
    championId: c.Annie,
    itemId: i.TitansResolve,
  }),
  r({
    championId: c.Annie,
    itemId: i.BrambleVest,
  }),
  r({
    championId: c.Aphelios,
    itemId: i.Quicksilver,
  }),
  r({
    championId: c.Aphelios,
    itemId: i.GuinsoosRageblade,
  }),
  r({
    championId: c.Aphelios,
    itemId: i.StatikkShiv,
  }),
  r({
    championId: c.Ashe,
    itemId: i.Quicksilver,
  }),
  r({
    championId: c.Ashe,
    itemId: i.GiantSlayer,
  }),
  r({
    championId: c.Ashe,
    itemId: i.GuinsoosRageblade,
  }),
  r({
    championId: c.Azir,
    itemId: i.HandOfJustice,
  }),
  r({
    championId: c.Azir,
    itemId: i.RapidFirecannon,
  }),
  r({
    championId: c.Azir,
    itemId: i.GuinsoosRageblade,
  }),
  r({
    championId: c.Cassiopeia,
    itemId: i.GuardianAngel,
  }),
  r({
    championId: c.Cassiopeia,
    itemId: i.Morellonomicon,
  }),
  r({
    championId: c.Cassiopeia,
    itemId: i.IonicSpark,
  }),
  r({
    championId: c.Diana,
    itemId: i.HextechGunblade,
  }),
  r({
    championId: c.Diana,
    itemId: i.TitansResolve,
  }),
  r({
    championId: c.Diana,
    itemId: i.Quicksilver,
  }),
  r({
    championId: c.Elise,
    itemId: i.BrambleVest,
  }),
  r({
    championId: c.Elise,
    itemId: i.SunfireCape,
  }),
  r({
    championId: c.Elise,
    itemId: i.Redemption,
  }),
  r({
    championId: c.Evelynn,
    itemId: i.GuardianAngel,
  }),
  r({
    championId: c.Evelynn,
    itemId: i.JeweledGauntlet,
  }),
  r({
    championId: c.Evelynn,
    itemId: i.HandOfJustice,
  }),
  r({
    championId: c.Evelynn,
    itemId: i.GuardianAngel,
  }),
  r({
    championId: c.Ezreal,
    itemId: i.Morellonomicon,
  }),
  r({
    championId: c.Ezreal,
    itemId: i.SpearofShojin,
  }),
  r({
    championId: c.Ezreal,
    itemId: i.BlueBuff,
  }),
  r({
    championId: c.Fiora,
    itemId: i.SpearofShojin,
  }),
  r({
    championId: c.Fiora,
    itemId: i.HandOfJustice,
  }),
  r({
    championId: c.Fiora,
    itemId: i.ZekesHerald,
  }),
  r({
    championId: c.Garen,
    itemId: i.GuardianAngel,
  }),
  r({
    championId: c.Garen,
    itemId: i.Morellonomicon,
  }),
  r({
    championId: c.Garen,
    itemId: i.SunfireCape,
  }),
  r({
    championId: c.Hecarim,
    itemId: i.SunfireCape,
  }),
  r({
    championId: c.Hecarim,
    itemId: i.GargoyleStoneplate,
  }),
  r({
    championId: c.Hecarim,
    itemId: i.WarmogsArmor,
  }),
  r({
    championId: c.Irelia,
    itemId: i.IonicSpark,
  }),
  r({
    championId: c.Irelia,
    itemId: i.HandOfJustice,
  }),
  r({
    championId: c.Irelia,
    itemId: i.ShroudofStillness,
  }),
  r({
    championId: c.Janna,
    itemId: i.BlueBuff,
  }),
  r({
    championId: c.Janna,
    itemId: i.SpearofShojin,
  }),
  r({
    championId: c.Janna,
    itemId: i.Zephyr,
  }),
  r({
    championId: c.JarvanIV,
    itemId: i.GuardianAngel,
  }),
  r({
    championId: c.JarvanIV,
    itemId: i.IonicSpark,
  }),
  r({
    championId: c.JarvanIV,
    itemId: i.SunfireCape,
  }),
  r({
    championId: c.Jax,
    itemId: i.BrambleVest,
  }),
  r({
    championId: c.Jax,
    itemId: i.ZekesHerald,
  }),
  r({
    championId: c.Jax,
    itemId: i.SunfireCape,
  }),
  r({
    championId: c.Jhin,
    itemId: i.InfinityEdge,
  }),
  r({
    championId: c.Jhin,
    itemId: i.GiantSlayer,
  }),
  r({
    championId: c.Jhin,
    itemId: i.LastWhisper,
  }),
  r({
    championId: c.Jinx,
    itemId: i.SpearofShojin,
  }),
  r({
    championId: c.Jinx,
    itemId: i.Quicksilver,
  }),
  r({
    championId: c.Jinx,
    itemId: i.GuinsoosRageblade,
  }),
  r({
    championId: c.Kalista,
    itemId: i.RapidFirecannon,
  }),
  r({
    championId: c.Kalista,
    itemId: i.RunaansHurricane,
  }),
  r({
    championId: c.Kalista,
    itemId: i.RabadonsDeathcap,
  }),
  r({
    championId: c.Katarina,
    itemId: i.HextechGunblade,
  }),
  r({
    championId: c.Katarina,
    itemId: i.Quicksilver,
  }),
  r({
    championId: c.Katarina,
    itemId: i.JeweledGauntlet,
  }),
  r({
    championId: c.Kayn,
    itemId: i.GuardianAngel,
  }),
  r({
    championId: c.Kayn,
    itemId: i.HandOfJustice,
  }),
  r({
    championId: c.Kayn,
    itemId: i.JeweledGauntlet,
  }),
  r({
    championId: c.Kennen,
    itemId: i.GuardianAngel,
  }),
  r({
    championId: c.Kennen,
    itemId: i.Morellonomicon,
  }),
  r({
    championId: c.Kennen,
    itemId: i.IonicSpark,
  }),
  r({
    championId: c.Kindred,
    itemId: i.RapidFirecannon,
  }),
  r({
    championId: c.Kindred,
    itemId: i.BlueBuff,
  }),
  r({
    championId: c.Kindred,
    itemId: i.JeweledGauntlet,
  }),
  r({
    championId: c.LeeSin,
    itemId: i.GuardianAngel,
  }),
  r({
    championId: c.LeeSin,
    itemId: i.BlueBuff,
  }),
  r({
    championId: c.LeeSin,
    itemId: i.RapidFirecannon,
  }),
  r({
    championId: c.Lillia,
    itemId: i.SpearofShojin,
  }),
  r({
    championId: c.Lillia,
    itemId: i.ShroudofStillness,
  }),
  r({
    championId: c.Lillia,
    itemId: i.GuardianAngel,
  }),
  r({
    championId: c.Lissandra,
    itemId: i.Morellonomicon,
  }),
  r({
    championId: c.Lissandra,
    itemId: i.JeweledGauntlet,
  }),
  r({
    championId: c.Lissandra,
    itemId: i.ZzRotPortal,
  }),
  r({
    championId: c.Lulu,
    itemId: i.Zephyr,
  }),
  r({
    championId: c.Lulu,
    itemId: i.ShroudofStillness,
  }),
  r({
    championId: c.Lulu,
    itemId: i.SpearofShojin,
  }),
  r({
    championId: c.Lux,
    itemId: i.BlueBuff,
  }),
  r({
    championId: c.Lux,
    itemId: i.Morellonomicon,
  }),
  r({
    championId: c.Lux,
    itemId: i.SpearofShojin,
  }),
  r({
    championId: c.Maokai,
    itemId: i.DragonsClaw,
  }),
  r({
    championId: c.Maokai,
    itemId: i.BrambleVest,
  }),
  r({
    championId: c.Maokai,
    itemId: i.SunfireCape,
  }),
  r({
    championId: c.Morgana,
    itemId: i.Morellonomicon,
  }),
  r({
    championId: c.Morgana,
    itemId: i.JeweledGauntlet,
  }),
  r({
    championId: c.Morgana,
    itemId: i.ChaliceofPower,
  }),
  r({
    championId: c.Nami,
    itemId: i.SpearofShojin,
  }),
  r({
    championId: c.Nami,
    itemId: i.ShroudofStillness,
  }),
  r({
    championId: c.Nami,
    itemId: i.Zephyr,
  }),
  r({
    championId: c.Nidalee,
    itemId: i.SpearofShojin,
  }),
  r({
    championId: c.Nidalee,
    itemId: i.JeweledGauntlet,
  }),
  r({
    championId: c.Nidalee,
    itemId: i.InfinityEdge,
  }),
  r({
    championId: c.NunuWillump,
    itemId: i.GargoyleStoneplate,
  }),
  r({
    championId: c.NunuWillump,
    itemId: i.HextechGunblade,
  }),
  r({
    championId: c.NunuWillump,
    itemId: i.SunfireCape,
  }),
  r({
    championId: c.Pyke,
    itemId: i.Morellonomicon,
  }),
  r({
    championId: c.Pyke,
    itemId: i.IonicSpark,
  }),
  r({
    championId: c.Pyke,
    itemId: i.SunfireCape,
  }),
  r({
    championId: c.Riven,
    itemId: i.SunfireCape,
  }),
  r({
    championId: c.Riven,
    itemId: i.IonicSpark,
  }),
  r({
    championId: c.Riven,
    itemId: i.Quicksilver,
  }),
  r({
    championId: c.Sejuani,
    itemId: i.BrambleVest,
  }),
  r({
    championId: c.Sejuani,
    itemId: i.DragonsClaw,
  }),
  r({
    championId: c.Sejuani,
    itemId: i.Morellonomicon,
  }),
  r({
    championId: c.Sett,
    itemId: i.BrambleVest,
  }),
  r({
    championId: c.Sett,
    itemId: i.DragonsClaw,
  }),
  r({
    championId: c.Sett,
    itemId: i.IonicSpark,
  }),
  r({
    championId: c.Shen,
    itemId: i.GargoyleStoneplate,
  }),
  r({
    championId: c.Shen,
    itemId: i.SunfireCape,
  }),
  r({
    championId: c.Shen,
    itemId: i.BrambleVest,
  }),
  r({
    championId: c.Sylas,
    itemId: i.DragonsClaw,
  }),
  r({
    championId: c.Sylas,
    itemId: i.BrambleVest,
  }),
  r({
    championId: c.Sylas,
    itemId: i.HextechGunblade,
  }),
  r({
    championId: c.TahmKench,
    itemId: i.DragonsClaw,
  }),
  r({
    championId: c.TahmKench,
    itemId: i.BrambleVest,
  }),
  r({
    championId: c.TahmKench,
    itemId: i.SunfireCape,
  }),
  r({
    championId: c.Talon,
    itemId: i.GuardianAngel,
  }),
  r({
    championId: c.Talon,
    itemId: i.InfinityEdge,
  }),
  r({
    championId: c.Talon,
    itemId: i.Quicksilver,
  }),
  r({
    championId: c.Teemo,
    itemId: i.Morellonomicon,
  }),
  r({
    championId: c.Teemo,
    itemId: i.BlueBuff,
  }),
  r({
    championId: c.Teemo,
    itemId: i.SpearofShojin,
  }),
  r({
    championId: c.Thresh,
    itemId: i.DragonsClaw,
  }),
  r({
    championId: c.Thresh,
    itemId: i.BrambleVest,
  }),
  r({
    championId: c.Thresh,
    itemId: i.WarmogsArmor,
  }),
  r({
    championId: c.TwistedFate,
    itemId: i.Morellonomicon,
  }),
  r({
    championId: c.TwistedFate,
    itemId: i.SpearofShojin,
  }),
  r({
    championId: c.TwistedFate,
    itemId: i.JeweledGauntlet,
  }),
  r({
    championId: c.Vayne,
    itemId: i.RunaansHurricane,
  }),
  r({
    championId: c.Vayne,
    itemId: i.GuinsoosRageblade,
  }),
  r({
    championId: c.Vayne,
    itemId: i.RapidFirecannon,
  }),
  r({
    championId: c.Veigar,
    itemId: i.HextechGunblade,
  }),
  r({
    championId: c.Veigar,
    itemId: i.Quicksilver,
  }),
  r({
    championId: c.Veigar,
    itemId: i.BlueBuff,
  }),
  r({
    championId: c.Vi,
    itemId: i.DragonsClaw,
  }),
  r({
    championId: c.Vi,
    itemId: i.BrambleVest,
  }),
  r({
    championId: c.Vi,
    itemId: i.WarmogsArmor,
  }),
  r({
    championId: c.Warwick,
    itemId: i.StatikkShiv,
  }),
  r({
    championId: c.Warwick,
    itemId: i.Quicksilver,
  }),
  r({
    championId: c.Warwick,
    itemId: i.Deathblade,
  }),
  r({
    championId: c.Wukong,
    itemId: i.RapidFirecannon,
  }),
  r({
    championId: c.Wukong,
    itemId: i.Deathblade,
  }),
  r({
    championId: c.Wukong,
    itemId: i.InfinityEdge,
  }),
  r({
    championId: c.XinZhao,
    itemId: i.BrambleVest,
  }),
  r({
    championId: c.XinZhao,
    itemId: i.GargoyleStoneplate,
  }),
  r({
    championId: c.XinZhao,
    itemId: i.DragonsClaw,
  }),
  r({
    championId: c.Yasuo,
    itemId: i.HandOfJustice,
  }),
  r({
    championId: c.Yasuo,
    itemId: i.Quicksilver,
  }),
  r({
    championId: c.Yasuo,
    itemId: i.GuardianAngel,
  }),
  r({
    championId: c.Yone,
    itemId: i.SpearofShojin,
  }),
  r({
    championId: c.Yone,
    itemId: i.GuardianAngel,
  }),
  r({
    championId: c.Yone,
    itemId: i.HandOfJustice,
  }),
  r({
    championId: c.Yuumi,
    itemId: i.ShroudofStillness,
  }),
  r({
    championId: c.Yuumi,
    itemId: i.BlueBuff,
  }),
  r({
    championId: c.Yuumi,
    itemId: i.Zephyr,
  }),
  r({
    championId: c.Zed,
    itemId: i.RapidFirecannon,
  }),
  r({
    championId: c.Zed,
    itemId: i.GuardianAngel,
  }),
  r({
    championId: c.Zed,
    itemId: i.Quicksilver,
  }),
  r({
    championId: c.Zilean,
    itemId: i.GuardianAngel,
  }),
  r({
    championId: c.Zilean,
    itemId: i.SpearofShojin,
  }),
  r({
    championId: c.Zilean,
    itemId: i.BlueBuff,
  }),
];

module.exports = defaultEquipment;
