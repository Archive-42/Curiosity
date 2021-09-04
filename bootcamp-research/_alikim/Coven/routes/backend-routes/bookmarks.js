const express = require("express")
const { Bookmark, Story, User, Comment, Like } = require("../../db/models")
const {
  asyncHandler,
  checkForUser,
  checkForStory,
  contentNotFound,
  storyInclude,
  userAttributes, storyAttributes
} = require("../../utils")
const bookmarksRouter = express.Router()

// Get all a User's Bookmarks. Includes Story data.
bookmarksRouter.get("/users/:id(\\d+)/bookmarks",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    const userBookmarks = await Bookmark.findAll({
      where: { userId: req.params.id },
      include: {
        model: Story, attributes: storyAttributes, include: storyInclude
      }
    })
    res.json(userBookmarks)
  })
)

// Get all Bookmarks for a Story. Includes User-bookmarker data.
bookmarksRouter.get("/stories/:id(\\d+)/bookmarks",
  asyncHandler(checkForStory),
  asyncHandler(async (req, res) => {
    let storyBookmarks = await Bookmark.findAll({
      where: { storyId: req.params.id },
      include: [
        { model: User, attributes: userAttributes },
        { model: Story, attributes: storyAttributes }
      ]
    })
    res.json(storyBookmarks)
  })
)

// Create a Bookmark. Must provide 'storyId' in req body.
bookmarksRouter.post("/users/:id(\\d+)/bookmarks",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res, next) => {
    const newBookmark = { userId: req.params.id, storyId: req.body.storyId }
    const bookmark = await Bookmark.findOne({ where: newBookmark })
    const story = await Story.findByPk(req.body.storyId)

    if (!story) {
      next(contentNotFound(req.body.storyId, "Story"))
    } else if (bookmark) {
      await bookmark.destroy()
      res.status(204).end()
    } else {
      const bookmark = await Bookmark.create(newBookmark)
      res.json(bookmark)
    }
  })
)

// Create a Bookmark. Must provide 'userId' in req body.
bookmarksRouter.post("/stories/:id(\\d+)/bookmarks",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res, next) => {
    const newBookmark = { storyId: req.params.id, userId: req.body.userId }
    const bookmark = await Bookmark.findOne({ where: newBookmark })
    const user = await User.findByPk(req.body.userId)

    if (!user) {
      next(contentNotFound(req.body.userId, "User"))
    } else if (bookmark) {
      await bookmark.destroy()
      res.status(204).end()
    } else {
      const bookmark = await Bookmark.create(newBookmark)
      res.json(bookmark)
    }
  })
)

// Delete a Bookmark
bookmarksRouter.delete("/users/:id(\\d+)/bookmarks",
  asyncHandler(async (req, res) => {
    const bookmark = await Bookmark.findOne({
      where: { userId: req.params.id, storyId: req.body.storyId }
    })
    if (bookmark) {
      await bookmark.destroy()
      res.status(204).end()
    } else {
      res.status(304).end()
    }
  })
)

module.exports = bookmarksRouter