const { c, r, i } = require("../index-references");

const form = [
  r({
    title: "6 Divine",
    tier: "S",
    playstyle: "Standard",
    votes: 7341,
    notes: "Open with a Recurve Bow, any Divine chosen can be used.",
    authorId: 1,
  }),
];

const team = [c.Irelia, c.LeeSin, c.Morgana, c.Jax, c.Warwick, c.Shen, c.Yone, c.Lux];

const roster = () => team.map((t) => {
  if (t === c.Warwick || t === c.LeeSin) {
    return r({
      buildId: 4,
      championId: t,
      carry: true,
    })
  }
  return r({
    buildId: 4,
    championId: t,
  })
})

const items = [
  r({
    buildId: 4,
    championId: c.Warwick,
    itemId: i.Quicksilver,
  }),
  r({
    buildId: 4,
    championId: c.Warwick,
    itemId: i.RunaansHurricane,
  }),
  r({
    buildId: 4,
    championId: c.Warwick,
    itemId: i.RunaansHurricane,
  }),
  r({
    buildId: 4,
    championId: c.LeeSin,
    itemId: i.GuardianAngel,
  }),
  r({
    buildId: 4,
    championId: c.LeeSin,
    itemId: i.BlueBuff,
  }),
]
