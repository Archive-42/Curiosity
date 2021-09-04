const router = require("express").Router();

const Ping = require("./pingModel.js");

// GET:  ping server
router.get("/", (req, res) => {
  let ping = {
    success: true,
  };
  Ping.find()
    .then(() => {
      res.status(200).json(ping);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
