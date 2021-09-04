const express = require("express");
const asyncHandler = require("express-async-handler");
const { Memory } = require("../../db/models");

const router = express.Router();

router.post(
  "",
  asyncHandler(async (req, res) => {
    const { id, levels } = req.body;

    const stats = await Memory.updateStats({ id, levels });

    return res.json({
      stats,
    });
  })
);

module.exports = router;
