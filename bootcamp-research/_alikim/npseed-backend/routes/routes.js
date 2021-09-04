const router = require('express-promise-router')()

router.get('/', (req, res) => {
  res.redirect("/")
})


router.get('/names', (req, res) => {
  // define tag restrictions
  // open name json
  // filter 
})

module.exports = { router }