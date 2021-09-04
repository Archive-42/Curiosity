const router = require('express').Router();

const routes = ['session', 'quests', 'character', 'create-character', 'beasts', 'item-drop'];

for (let route of routes) {
  router.use(`/${route}`, require(`./${route}`));
}



module.exports = router;