const { c, r, i } = require("../index-references");

const formA = [
  r({
    title: "6 Sharpshooters",
    tier: "S",
    playstyle: "Standard",
    votes: 3122,
    notes: "Build a lot of Zeke's and find Sharpshooter Chosen",
    authorId: 1,
  }),
]

const team = [c.Sejuani, c.Nidalee, c.Aatrox, c.Vayne, c.Azir, c.Jinx, c.Jhin, c.Teemo]

const teamA = () => team.map((t) => {
  if (t === c.Jinx || t === c.Sejuani || t === c.Teemo) {
    return r({
      buildId: 1,
      championId: t,
      carry: true,
    })
  }
  return r({
    buildId: 1,
    championId: t,
  })
})

const itemA = [
  r({
    buildId: 1,
    championId: c.Jinx,
    itemId: i.JeweledGauntlet,
  }),
  r({
    buildId: 1,
    championId: c.Jinx,
    itemId: i.SpearofShojin,
  }),
  r({
    buildId: 1,
    championId: c.Jinx,
    itemId: i.Quicksilver,
  }),
  r({
    buildId: 1,
    championId: c.Sejuani,
    itemId: i.Morellonomicon,
  }),
  r({
    buildId: 1,
    championId: c.Sejuani,
    itemId: i.DragonsClaw,
  }),
  r({
    buildId: 1,
    championId: c.Sejuani,
    itemId: i.BrambleVest,
  }),
  r({
    buildId: 1,
    championId: c.Teemo,
    itemId: i.ZekesHerald,
  }),
]

console.log(formA)
console.log(teamA())
console.log(itemA)

module.exports = {
  formA,
  teamA,
  itemA,
};
