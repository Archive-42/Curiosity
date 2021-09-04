const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { TypingStat } = require("../../db/models");

const router = express.Router();

router.post(
  "",
  asyncHandler(async (req, res) => {
    const { id, speed, errors, letters, score, time } = req.body;
    // console.log('\nAAAAAAAAAAAAAAAAAAAAA', id, speed, errors, letters, score, time)
    const stats = await TypingStat.updateStats({
      id,
      speed,
      score,
      time,
      letters,
      errors,
      frequency: 1,
    });

    return res.json({
      stats,
    });
  })
);

module.exports = router;
