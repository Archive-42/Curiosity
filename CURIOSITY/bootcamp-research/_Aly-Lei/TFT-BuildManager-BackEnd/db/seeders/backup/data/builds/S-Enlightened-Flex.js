const { c, r, i } = require("../index-references");

const formB = [
  r({
    title: "Enlightened Flex",
    tier: "S",
    playstyle: "Standard",
    votes: 734,
    notes: "Play around your Chosen, prioritize 6 Enlightened",
    authorId: 1,
  }),
];

const team = [c.Yone, c.Irelia, c.Shen, c.Janna, c.Morgana, c.Talon, c.Lux];

const teamB = () =>
  team.map((t) => {
    if (t === c.Talon || t === c.Morgana) {
      return r({
        buildId: 2,
        championId: t,
        carry: true,
      });
    }
    return r({
      buildId: 2,
      championId: t,
    });
  });

const itemB = [
  r({
    buildId: 2,
    championId: c.Talon,
    itemId: i.GuardianAngel,
  }),
  r({
    buildId: 2,
    championId: c.Talon,
    itemId: i.GiantSlayer,
  }),
  r({
    buildId: 2,
    championId: c.Talon,
    itemId: i.InfinityEdge,
  }),
  r({
    buildId: 2,
    championId: c.Morgana,
    itemId: i.Morellonomicon,
  }),
  r({
    buildId: 2,
    championId: c.Morgana,
    itemId: i.ChaliceofPower,
  }),
  r({
    buildId: 2,
    championId: c.Morgana,
    itemId: i.ChaliceofPower,
  }),
];

module.exports = {
  formB,
  teamB,
  itemB,
};
