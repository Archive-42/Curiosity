const { formA, teamA, itemA } = require("./S-6Sharpshooter");
const { formB, teamB, itemB } = require("./S-Enlightened-Flex");
const { formC, teamC, itemC } = require("./S-Vanguard-Mystic-Ahri");

const forms = [...formA, ...formB, ...formC];
const teams = [...teamA(), ...teamB(), ...teamC()];
const items = [...itemA, ...itemB, ...itemC];

module.exports = {
  forms,
  teams,
  items
}
