const express = require('express');
const { check } = require('express-validator');
const { Story, Comment, Like, Bookmark, User, Topic, Tag, sequelize } = require('../../db/models')
const {
  asyncHandler,
  handleValidationErrors,
  checkForStory,
  checkForUser,
  deleteForStory,
  storyInclude,
  storyAttributes, userAttributes
} = require('../../utils');
const storyRouter = express.Router();

// Validation Middleware for POST requests.
const authorValidation = [
  check('authorId')
    .exists({ checkFalsy: true })
    .withMessage('Your story must specify the author.')
];
const storyValidations = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Your story must have a title')
    .isLength({ max: 255 })
    .withMessage('Your title may not be longer than 255 characters.'),
  // MIRA Tested
  check('body')
    .exists({ checkFalsy: true })
    .withMessage('Your story needs a body.')
];

// Get all Stories. Includes limited Author, Comments, Likes, Topics data.
storyRouter.get('/stories',
  asyncHandler(async (req, res) => {
    let stories = await Story.findAll({
      include: storyInclude,
      order: [['createdAt', 'DESC']]
    })
    res.json(stories);
  })
);

// Get Stories by User. Includes limited Author, Comments, Likes, Topics data.
storyRouter.get("/users/:id(\\d+)/stories",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    let stories = await Story.findAll({
      where: { authorId: req.params.id },
      include: storyInclude,
      order: [['createdAt', 'DESC']]
    })
    res.json(stories)
  })
)

// Get 6 random Stories. Includes limited Author, Comments, Likes, Topics data.
storyRouter.get("/stories/discover",
  asyncHandler(async (req, res) => {
  let stories = await Story.findAll({
    include: storyInclude,
    order: sequelize.random(),
    limit: 6,
  })
  res.json(stories)
}))

// Get Stories written by a User's Followed Users. Access through Follow.
storyRouter.get("/users/:id(\\d+)/followed/stories",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    const followed = await Follow.findAll({
      where: { followerId: req.params.id },
      include: {
        model: Story,
        attributes: storyAttributes,
        include: storyInclude
      },
      order: [['createdAt', 'DESC']], // TODO How to order by the STORY created dates?
    })

    res.json(followed)
  })
)

// Get a Story by id.
storyRouter.get('/stories/:id(\\d+)',
  asyncHandler(checkForStory),
  asyncHandler(async (req, res) => {
    const story = await Story.findByPk(req.params.id, {
      include: [{
        model: User,
        as: "Author",
        attributes: userAttributes
      }, {
        model: Comment,
        include: {
          model: User,
          attributes: userAttributes,
          order: [['createdAt', 'DESC']]
        }
      }, {
        model: Like,
        attributes: ["id"],
        include: { model: User, attributes: userAttributes }
      }, {
        model: Tag,
        include: { model: Topic, attributes: ["id", "topic"] }
      }],
      order: [['createdAt', 'DESC']]
    }
    )
    res.json(story)
  })
)


// Create a Story. Must provide 'title', 'body', 'authorId'. Opt: 'subtitle'
storyRouter.post('/stories',
  authorValidation,
  storyValidations,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { title, body, authorId, subtitle } = req.body
    const author = await User.findByPk(authorId)
    if (!subtitle) subtitle = ""
    
    if (author) {
      const story = await Story.create({ title, body, authorId, subtitle })
      res.status(201).json(story)
    } else {
      res.status(400).end()
    }
  })
)

// Update a Story by id
storyRouter.patch('/stories/:id(\\d+)',
  asyncHandler(checkForStory),
  storyValidations,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { title, subtitle, body } = req.body;
    const updatedStory = await req.story.update({ title, subtitle, body })
    res.json(updatedStory)
  })
)

// Delete a Story and dependencies with Story id.
storyRouter.delete('/stories/:id(\\d+)',
  asyncHandler(checkForStory),
  asyncHandler(async (req, res) => {
    await deleteForStory(req.params.id, Comment)
    await deleteForStory(req.params.id, Like)
    await deleteForStory(req.params.id, Bookmark)
    // await deleteForStory(req.params.id, Tag)
    // TODO Test deleting Tag dependencies.
    
    await req.story.destroy()
    res.status(204).end()
  })
)

module.exports = storyRouter;
