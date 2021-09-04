const express = require('express');
const { check } = require('express-validator');
const db = require('../../db/models');
const { Comment, Story, User } = db;
const {
  asyncHandler,
  handleValidationErrors,
  checkForStory,
  checkForUser,
  checkForComment,
  storyInclude,
  userAttributes, storyAttributes
} = require('../../utils');
const router = express.Router();

const commentValidator = [
  check('body')
    .exists({ checkFalsy: true })
    .withMessage('Your comment must have a body')
];

// Get a Comment by id
router.get('/comments/:id(\\d+)',
  asyncHandler(checkForComment),
  asyncHandler(async (req, res) => {
    const comment = await Comment.findByPk(req.params.id, {
      include: [
        { model: User, attributes: userAttributes },
        { model: Story, attributes: storyAttributes }
      ]
    })
    res.json(comment)
  })
)

// Get Comments by a User. Includes limited Story data.
router.get('/users/:id(\\d+)/comments',
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    let userComments = await Comment.findAll({
      where: { userId: req.params.id },
      include: {
        model: Story, attributes: storyAttributes, include: storyInclude
      }
    });
    res.json(userComments)
  })
)

// Get Comments for a Story. Includes limited User data.
router.get('/stories/:id(\\d+)/comments',
  asyncHandler(checkForStory),
  asyncHandler(async (req, res) => {
    storyComments = await Comment.findAll({
      where: { storyId: req.params.id },
      include: { model: User, attributes: userAttributes },
      order: [['createdAt', 'DESC']]
    });
    res.json(storyComments)
  })
)


// Post a Comment to a Story. Must provide 'body' and 'userId'.
router.post('/stories/:id(\\d+)/comments',
  asyncHandler(checkForStory),
  commentValidator,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { body, userId } = req.body
    const user = await User.findByPk(userId)
    
    if (user) {
    const comment = await Comment.create({
      body, userId, storyId: req.params.id
    })
    res.json(comment);
  } else {
    handleE
  }
  })
);

// Update Comment.
router.patch('/comments/:id(\\d+)',
  commentValidator,
  handleValidationErrors,
  asyncHandler(checkForComment),
  asyncHandler(async (req, res) => {
    const updatedComment = await req.comment.update({ body: req.body.body });
    res.json(updatedComment);
  })
);

// Delete a Comment by id
router.delete('/comments/:id(\\d+)',
  asyncHandler(checkForComment),
  asyncHandler(async (req, res) => {
    await req.comment.destroy();
    res.status(204).end();
  })
);

module.exports = router;