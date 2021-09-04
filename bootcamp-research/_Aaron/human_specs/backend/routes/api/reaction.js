const express = require("express");
const asyncHandler = require("express-async-handler");
const { Reaction } = require("../../db/models");

const router = express.Router();

router.post(
  "",
  asyncHandler(async (req, res) => {
    const { id, reaction_score } = req.body;
    const stats = await Reaction.updateStats({ id, reaction_score });

    return res.json({
      stats,
    });
  })
);

module.exports = router;
