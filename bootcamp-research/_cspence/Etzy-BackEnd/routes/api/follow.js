const express = require('express');
const router = express.Router();
const { Follow } = require('../../db/models');
const { asyncHandler } = require('../../utils');

// follow or unfollow another user
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const {
      followerId,
      followingId
    } = req.body;
    const existingFollow = await Follow.findOne({
      where: {
        followerId,
        followingId
      }
    });
    if (existingFollow) {
      await existingFollow.destroy();
      res.end();
    } else {
      const follow = await Follow.create({ followerId, followingId });
      res.json(follow);
    }
  })
);

module.exports = router;