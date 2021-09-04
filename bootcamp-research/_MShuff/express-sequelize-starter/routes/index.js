const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  res.json({ message: "test index root" });
});

module.exports = {
  indexRouter: router,
};
