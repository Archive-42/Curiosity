const { c, r, i } = require("../index-references");

const formC = [
  r({
    title: "Vanguard Mystic Ahri",
    tier: "S",
    playstyle: "Standard",
    votes: 7334,
    notes: "Vanguard or Mystic Chosen, good Ahri Items",
    authorId: 1,
  }),
];

const team = [
  c.Sejuani,
  c.Aatrox,
  c.Cassiopeia,
  c.Thresh,
  c.Ahri,
  c.Yuumi,
  c.Zilean,
  c.Shen,
];

const teamC = () =>
  team.map((t) => {
    if (t === c.Ahri || t === c.Yuumi) {
      return r({
        buildId: 3,
        championId: t,
        carry: true,
      });
    }
    return r({
      buildId: 3,
      championId: t,
    });
  });

const itemC = [
  r({
    buildId: 3,
    championId: c.Ahri,
    itemId: i.GuardianAngel,
  }),
  r({
    buildId: 3,
    championId: c.Ahri,
    itemId: i.JeweledGauntlet,
  }),
  r({
    buildId: 3,
    championId: c.Ahri,
    itemId: i.InfinityEdge,
  }),
  r({
    buildId: 3,
    championId: c.Yuumi,
    itemId: i.ChaliceofPower,
  }),
];

module.exports = {
  formC,
  teamC,
  itemC,
};
