
const knockKnock = require('knock-knock-jokes');

function getJoke() {
  return knockKnock();
}

module.exports = getJoke;
