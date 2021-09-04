const express = require("express")
const { Topic, Watch, Tag } = require("../../db/models")
const { check } = require("express-validator")
const {
  asyncHandler,
  handleValidationErrors,
  checkForUser,
  checkForStory
} = require("../../utils")
const topicsRouter = express.Router()

topicValidator = [
  check("topic")
    .isLength({min: 1, max: 40})
    .withMessage("Topic length has gotta' be more than 0, less than 40.")
]

// Get a Topic by id.
topicsRouter.get("/topics/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const topic = await Topic.findByPk(req.params.id)
    res.json(topic)
  })
)

// Get all Topics.
topicsRouter.get("/topics",
  asyncHandler(async (req, res) => {
    const topics = await Topic.findAll()
    res.json(topics)
  }))

// Get a User's Watched Topics.
topicsRouter.get("/users/:id/topics",
  asyncHandler(checkForUser),
  asyncHandler((req, res) => {
    const watchedTopics = Watch.findAll({
      where: { userId: req.params.id },
      include: { model: Topic, attributes: ["id", "topic"] }
    })
    res.json(watchedTopics)
    // res.json(watchedTopics.Topics) // TODO Check if this shorthand is possible.
  })
)

// Get a Story's Tagged Topics.
topicsRouter.get("/stories/:id(\\d+)/topics",
  asyncHandler(checkForStory),
  asyncHandler((req, res) => {
    const taggedTopics = Tag.findAll({
      where: {
        storyId: req.params.id,
        include: { model: Topic, attributes: ["id", "topic"] }
      }
    })
    res.json(taggedTopics)
    // res.json(taggedTopics.Topics) // TODO Check if this shorthand is possible.
  })
)


// Create a Topic if it doesn't exist.
// TODO Test this route. Test them all, but this is prob trickiest.
topicsRouter.post("/topics",
  topicValidator,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const topic = req.body.topic.toLowerCase()
    const topicExists = await Topic.findOne({ where: { topic: topic } })
    if (topicExists) {
      res.status(204).end()
    } else {
      const newTopic = await Topic.create({ topic: req.body.topic })
      res.status(201).json(newTopic)
    }
  })
)

// Create or Delete a Watched Topic for User. TODO Test this, it's tricky.
topicsRouter.post("/users/:id(\\d+)/topics",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    let topic = req.body.topic.toLowerCase()
    topic = await Topic.findOne({ where: { topic: topic } })
    const watch = await Watch.findOne({
      where: { userId: req.params.id, topicId: topic.id }
    })
    
    if (watch) {
      await watch.destroy()
      res.status(204).end()
    } else {
      const newWatch = await Watch.create({
        userId: req.params.id, topicId: topic.id
      })
      res.status(201).json(newWatch)
    }
  })
)

// Create or Delete a Tagged Topic for Story. TODO Test this, it's tricky.
topicsRouter.post("/stories/:id(\\d+)/topics",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    let topic = req.body.topic.toLowerCase()
    topic = await Topic.findOne({ where: { topic: topic } })
    const tag = await Tag.findOne({
      where: { storyId: req.params.id, topicId: topic.id }
    })

    if (tag) {
      await tag.destroy()
      res.status(204).end()
    } else {
      const newTag = await Tag.create({
        storyId: req.params.id, topicId: topic.id
      })
      res.status(201).json(newTag)
    }
  })
)

module.exports = topicsRouter;