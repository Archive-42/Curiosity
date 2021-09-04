const express = require("express")
const {
  asyncHandler,
  checkForUser,
  contentNotFound,
  userAttributes
} = require("../../utils")
const { Follow, User } = require("../../db/models")
const followsRouter = express.Router()

// Get a User's Followed Users.
followsRouter.get("/:id(\\d+)/followed",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    const followed = await Follow.findAll({
      where: { followerId: req.params.id },
      include: { model: User, as: "Following", attributes: userAttributes }
    })
    res.json(followed)
  })
)

// Get a User's Following Users.
followsRouter.get("/:id(\\d+)/followers",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    const followers = await Follow.findAll({
      where: { followingId: req.params.id },
      include: { model: User, as: "Follower", attributes: userAttributes },
    })
    res.json(followers)
  }))

// Get the amount of Followers and Follows for a User.
followsRouter.get("/:id(\\d+)/follows",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    const followed = await Follow.findAll({
      where: { followerId: req.params.id },
    })
    const followers = await Follow.findAll({
      where: { followingId: req.params.id },
    })
    res.json({ followed: followed.length, followers: followers.length })
  })
)

// Create or Delete a Follow for a User.
followsRouter.post("/:id(\\d+)/follows",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res, next) => {
    const newFollow = {
      followerId: req.params.id,
      followingId: req.body.followingId
    }
    const following = await User.findByPk(req.body.followingId)
    const followExists = await Follow.findOne({ where: newFollow })

    if (req.params.id === req.body.followingId) { // User can't follow self
      res.status(304).end()
    } else if (!following) {
      next(contentNotFound(req.body.followingId, "User"))
    } else if (followExists) {
      await followExists.destroy()
      res.status(204).end()
    } else {
      const follow = await Follow.create(newFollow)
      res.json(follow)
    }
  })
)

module.exports = followsRouter