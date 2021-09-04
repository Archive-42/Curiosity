const express = require("express")
const {
  asyncHandler,
} = require("../../utils")
const { Topic } = require("../../db/models")
const topicsRouter = express.Router()

topicsRouter.get("/", asyncHandler(async (req, res) => {
  const topics = await Topic.findAll()
  res.json(topics)
}))

module.exports = topicsRouter;