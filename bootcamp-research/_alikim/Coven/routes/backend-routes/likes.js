const express = require("express")
const {
  asyncHandler,
  checkForUser,
  checkForStory,
  contentNotFound,
  storyInclude,
  storyAttributes, userAttributes
} = require("../../utils")
const { User, Like, Story } = require("../../db/models")
const likesRouter = express.Router()

// Get Likes by a User. Includes limited Story data (+Likes, +Comments)
likesRouter.get("/users/:id(\\d+)/likes",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    let userLikes = await Like.findAll({
      where: { userId: req.params.id },
      include:
        { model: Story, attributes: storyAttributes, include: storyInclude }
    })
    res.json(userLikes)
  })
)

// Get Likes for a Story. Includes limited Liking-User data.
likesRouter.get('/stories/:id(\\d+)/likes',
  asyncHandler(checkForStory),
  asyncHandler(async (req, res) => {
    const likes = await Like.findAll({
      where: { storyId: req.params.id },
      include: { model: User, attributes: userAttributes }
    })
    res.json(likes)
  })
);

// Create or Delete a Like. Must provide 'userId'.
likesRouter.post('/stories/:id(\\d+)/likes',
  asyncHandler(checkForStory),
  asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.body.userId)
    const newLike = { userId: req.body.userId, storyId: req.params.id }
    const like = await Like.findOne({ where: newLike })
    
    if (!user) {
      contentNotFound(req.body.userId, "User")
    } else if (like) {
      await like.destroy()
      res.status(204).end()
    } else {
      const createdLike = await Like.create(newLike)
      res.json(createdLike)
    }
  })
)

// Create or Delete a Like. Must provide 'storyId'.
likesRouter.post('/users/:id(\\d+)/likes',
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    const story = await Story.findByPk(req.body.storyId)
    const newLike = { userId: req.params.id, storyId: req.body.storyId, }
    const like = await Like.findOne({ where: newLike })
    
    if (!story) {
      contentNotFound(req.body.storyId, "Story")
    } else if (like) {
      await like.destroy()
      res.status(204).end()
    } else {
      const createdLike = await Like.create(newLike)
      res.status(200).json(createdLike)
    }
  })
);

module.exports = likesRouter