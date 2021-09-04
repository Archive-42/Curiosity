const { c, t, r } = require("./index-references")

const origins = [
  {
    championId: c.Aatrox,
    traitId: t.Cultist,
  },
  {
    championId: c.Aatrox,
    traitId: t.Vanguard,
  },
  {
    championId: c.Ahri,
    traitId: t.Spirit,
  },
  {
    championId: c.Ahri,
    traitId: t.Mage,
  },
  {
    championId: c.Akali,
    traitId: t.Ninja,
  },
  {
    championId: c.Akali,
    traitId: t.Assassin,
  },
  {
    championId: c.Annie,
    traitId: t.Fortune,
  },
  {
    championId: c.Annie,
    traitId: t.Mage,
  },
  {
    championId: c.Aphelios,
    traitId: t.Moonlight,
  },
  {
    championId: c.Aphelios,
    traitId: t.Hunter,
  },
  {
    championId: c.Ashe,
    traitId: t.Elderwood,
  },
  {
    championId: c.Ashe,
    traitId: t.Elderwood,
  },
  {
    championId: c.Azir,
    traitId: t.Warlord,
  },
  {
    championId: c.Azir,
    traitId: t.Keeper,
  },
  {
    championId: c.Azir,
    traitId: t.Emperor,
  },
  {
    championId: c.Cassiopeia,
    traitId: t.Dusk,
  },
  {
    championId: c.Cassiopeia,
    traitId: t.Mystic,
  },
  {
    championId: c.Diana,
    traitId: t.Moonlight,
  },
  {
    championId: c.Diana,
    traitId: t.Assassin,
  },
  {
    championId: c.Elise,
    traitId: t.Cultist,
  },
  {
    championId: c.Elise,
    traitId: t.Keeper,
  },
  {
    championId: c.Evelynn,
    traitId: t.Cultist,
  },
  {
    championId: c.Evelynn,
    traitId: t.Shade,
  },
  {
    championId: c.Ezreal,
    traitId: t.Elderwood,
  },
  {
    championId: c.Ezreal,
    traitId: t.Dazzler,
  },
  {
    championId: c.Fiora,
    traitId: t.Enlightened,
  },
  {
    championId: c.Fiora,
    traitId: t.Duelist,
  },
  {
    championId: c.Garen,
    traitId: t.Warlord,
  },
  {
    championId: c.Garen,
    traitId: t.Vanguard,
  },
  {
    championId: c.Hecarim,
    traitId: t.Elderwood,
  },
  {
    championId: c.Hecarim,
    traitId: t.Vanguard,
  },
  {
    championId: c.Irelia,
    traitId: t.Enlightened,
  },
  {
    championId: c.Irelia,
    traitId: t.Divine,
  },
  {
    championId: c.Irelia,
    traitId: t.Adept,
  },
  {
    championId: c.Janna,
    traitId: t.Enlightened,
  },
  {
    championId: c.Janna,
    traitId: t.Mystic,
  },
  {
    championId: c.JarvinIV,
    traitId: t.Warlord,
  },
  {
    championId: c.JarvinIV,
    traitId: t.Keeper,
  },
  {
    championId: c.Jax,
    traitId: t.Divine,
  },
  {
    championId: c.Jax,
    traitId: t.Duelist,
  },
  {
    championId: c.Jhin,
    traitId: t.Cultist,
  },
  {
    championId: c.Jhin,
    traitId: t.Sharpshooter,
  },
  {
    championId: c.Jinx,
    traitId: t.Fortune,
  },
  {
    championId: c.Jinx,
    traitId: t.Hunter,
  },
  {
    championId: c.Kalista,
    traitId: t.Cultist,
  },
  {
    championId: c.Kalista,
    traitId: t.Duelist,
  },
  {
    championId: c.Katarina,
    traitId: t.Warlord,
  },
  {
    championId: c.Katarina,
    traitId: t.Fortune,
  },
  {
    championId: c.Katarina,
    traitId: t.Assassin,
  },
  {
    championId: c.Kayn,
    traitId: t.Tormented,
  },
  {
    championId: c.Kayn,
    traitId: t.Shade,
  },
  {
    championId: c.Kennen,
    traitId: t.Ninja,
  },
  {
    championId: c.Kennen,
    traitId: t.Keeper,
  },
  {
    championId: c.Kindred,
    traitId: t.Spirit,
  },
  {
    championId: c.Kindred,
    traitId: t.Hunter,
  },
  {
    championId: c.LeeSin,
    traitId: t.Divine
  },
  {
    championId: c.LeeSin,
    traitId: t.Duelist
  },
  {
    championId: c.Lillia,
    traitId: t.Dusk,
  },
  {
    championId: c.Lillia,
    traitId: t.Mage,
  },
  {
    championId: c.Lissandra,
    traitId: t.Moonlight,
  },
  {
    championId: c.Lissandra,
    traitId: t.Dazzler,
  },
  {
    championId: c.Lulu,
    traitId: t.Elderwood,
  },
  {
    championId: c.Lulu,
    traitId: t.Mage,
  },
  {
    championId: c.Lux,
    traitId: t.Divine,
  },
  {
    championId: c.Lux,
    traitId: c.Dazzler,
  },
  {
    championId: c.Maokai,
    traitId: t.Elderwood,
  },
  {
    championId: c.Maokai,
    traitId: t.Brawler
  },
  {
    championId: c.Morgana,
    traitId: t.Enlightened,
  },
  {
    championId: c.Morgana,
    traitId: t.Dazzler,
  },
  {
    championId: c.Nami,
    traitId: t.Enlightened,
  },
  {
    championId: c.Nami,
    traitId: t.Mage,
  },
  {
    championId: c.Nidalee,
    traitId: t.Warlord,
  },
  {
    championId: c.Nidalee,
    traitId: t.Sharpshooter
  },
  {
    championId: c.NunuWillump,
    traitId: t.Elderwood,
  },
  {
    championId: c.NunuWillump,
    traitId: t.Brawler
  },
  {
    championId: c.Pyke,
    traitId: t.Cultist,
  },
  {
    championId: c.Pyke,
    traitId: t.Assassin,
  },
  {
    championId: c.Riven,
    traitId: t.Dusk,
  },
  {
    championId: c.Riven,
    traitId: t.Keeper
  },
  {
    championId: c.Sejuani,
    traitId: t.Fortune
  },
  {
    championId: c.Sejuani,
    traitId: t.Vanguard
  },
  {
    championId: c.Sett,
    traitId: t.TheBoss
  },
  {
    championId: c.Sett,
    traitId: t.Brawler
  },
  {
    championId: c.Shen,
    traitId: t.Ninja
  },
  {
    championId: c.Shen,
    traitId: t.Adept
  },
  {
    championId: c.Shen,
    traitId: t.Mystic
  },
  {
    championId: c.Sylas,
    traitId: t.Moonlight
  },
  {
    championId: c.Sylas,
    traitId: t.Brawler
  },
  {
    championId: c.TahmKench,
    traitId: t.Fortune
  },
  {
    championId: c.TahmKench,
    traitId: t.Brawler
  },
  {
    championId: c.Talon,
    traitId: t.Enlightened
  },
  {
    championId: c.Talon,
    traitId: t.Assassin
  },
  {
    championId: c.Teemo,
    traitId: t.Spirit
  },
  {
    championId: c.Teemo,
    traitId: t.Sharpshooter
  },
  {
    championId: c.Thresh,
    traitId: t.Dusk
  },
  {
    championId: c.Thresh,
    traitId: t.Vanguard
  },
  {
    championId: c.TwistedFate,
    traitId: t.Cultist
  },
  {
    championId: c.TwistedFate,
    traitId: t.Mage
  },
  {
    championId: c.Vayne,
    traitId: t.Dusk
  },
  {
    championId: c.Vayne,
    traitId: t.Sharpshooter
  },
  {
    championId: c.Veigar,
    traitId: t.Elderwood
  },
  {
    championId: c.Veigar,
    traitId: t.Mage
  },
  {
    championId: c.Vi,
    traitId: t.Warlord
  },
  {
    championId: c.Vi,
    traitId: t.Brawler
  },
  {
    championId: c.Warwick,
    traitId: t.Divine
  },
  {
    championId: c.Warwick,
    traitId: t.Hunter,
  },
  {
    championId: c.Warwick,
    traitId: t.Brawler
  },
  {
    championId: c.Wukong,
    traitId: t.Divine
  },
  {
    championId: c.Wukong,
    traitId: t.Vanguard
  },
  {
    championId: c.XinZhao,
    traitId: t.Warlord
  },
  {
    championId: c.XinZhao,
    traitId: t.Duelist
  },
  {
    championId: c.Yasuo,
    traitId: t.Exile
  },
  {
    championId: c.Yasuo,
    traitId: t.Duelist
  },
  {
    championId: c.Yone,
    traitId: t.Adept
  },
  {
    championId: c.Yone,
    traitId: t.Exile
  },
  {
    championId: c.Yuumi,
    traitId: t.Spirit
  },
  {
    championId: c.Yuumi,
    traitId: t.Mystic
  },
  {
    championId: c.Zed,
    traitId: t.Ninja
  },
  {
    championId: c.Zed,
    traitId: t.Shade
  },
  {
    championId: c.Zilean,
    traitId: t.Mystic
  },
  {
    championId: c.Zilean,
    traitId: t.Cultist
  },
]

const seedOrigins = () => origins.map(o => r(o));
console.log(seedOrigins())

module.exports = seedOrigins;
