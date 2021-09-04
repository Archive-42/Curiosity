const express = require("express");
const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  res.send("We're Alive!");
});

module.exports = indexRouter;
