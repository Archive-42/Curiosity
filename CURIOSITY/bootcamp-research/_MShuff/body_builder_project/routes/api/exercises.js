const express = require('express');
const { check } = require('express-validator');
const { asyncHandler, handleValidationErrors } = require('../../utils');
const { getUserToken, requireAuth } = require('../../auth');
const { User, Exercise, Rating, Comment, Liked } = require('../../db/models');

const router = express.Router();
// router.use(requireAuth);

// Get All Exercises and Exercise Body Parts
router.get('/', asyncHandler(async (req, res, next) => {
    // Get All Exercises
    const exercises = await Exercise.findAll({
        include: [{
            model: User, attributes: ['username']
        }, {
            model: Rating,
            include: {
                model: User, attributes: ['username']
            }
        }, {
            model: Comment,
            include: {
                model: User, attributes: ['username']
            },
            order: [['createdAt', 'DESC']]
        }, {
            model: Liked,
            include: {
                model: User, attributes: ['username'],
            },
        }]
    });

    let exerciseObject = {};
    for (let exercise of exercises) {
        let ratingCount = 0;
        let ratingSum = 0;
        exercise.dataValues.voterIds = [];
        for (let rating of exercise.Ratings) {
            exercise.dataValues.voterIds.push([rating.user_id, rating.score]);
            ratingSum += rating.score;
            ratingCount++;
        }
        exercise.dataValues.averageRating = ratingSum / ratingCount;
        exercise.dataValues.ratingCount = ratingCount;

        exerciseObject[exercise.id] = exercise;
    }

    // Loop through Exercises to build a list of body parts
    let bodyParts = new Set();
    for (let exercise of exercises) {
        bodyParts.add(exercise.body_part);
    }
    const bodyPartsArray = Array.from(bodyParts);

    // Return exercises and associated body parts
    res.json({ exerciseObject, bodyPartsArray });
}));

router.post('/', asyncHandler(async (req, res) => {
    const { title, description,
        user_id, type,
        body_part, difficulty,
        equipment, video_url } = req.body;

    const exercise = await Exercise.create({
        title, description,
        user_id, type,
        body_part, difficulty,
        equipment, video_url
    });

    exercise.dataValues.voterIds = [];
    exercise.dataValues.averageRating = 0;
    exercise.dataValues.ratingCount = 0;
    exercise.dataValues.Ratings = [];
    exercise.dataValues.Likeds = [];

    if (exercise) {
        return res.json(exercise);
    }

    res.json(`An error occured trying to create that exercise!`);
}));


router.delete('/:exerciseId', asyncHandler(async (req, res) => {
    const exerciseId = parseInt(req.params.exerciseId);
    const exercise = await Exercise.findByPk(exerciseId);
    if (exercise) {
        await exercise.destroy();
        return res.json(`Exercise ${exerciseId} destroyed.`);
    }
    res.json(`An error occurred trying to delete Exercise ${exerciseId}`);
}));


router.put(`/:exerciseId`, asyncHandler(async (req, res) => {
    const { title, description, type, body_part,
        difficulty, equipment, video_url } = req.body;

    const exercise = await Exercise.findOne({
        where: {
            id: parseInt(req.params.exerciseId)
        },
        include: [{
            model: User, attributes: ['username']
        },
        {
            model: Rating,
            include: {
                model: User, attributes: ['username']
            }
        },
        {
            model: Comment,
            include: {
                model: User, attributes: ['username']
            },
            order: [['createdAt', 'DESC']]
        }, {
            model: Liked,
            include: {
                model: User, attributes: ['username']
            },
        }]
    });

    exercise.title = title;
    exercise.description = description;
    exercise.type = type;
    exercise.body_part = body_part;
    exercise.difficulty = difficulty;
    exercise.equipment = equipment;
    exercise.video_url = video_url;

    await exercise.save();

    let ratingCount = 0;
    let ratingSum = 0;
    exercise.dataValues.voterIds = [];
    for (let rating of exercise.Ratings) {
        exercise.dataValues.voterIds.push([rating.user_id, rating.score]);
        ratingSum += rating.score;
        ratingCount++;

        exercise.dataValues.averageRating = ratingSum / ratingCount;
        exercise.dataValues.ratingCount = ratingCount;
    }

    if (exercise) {
        return res.json(exercise);
    }

    res.json(`An error occured trying to edit that exercise!`);
}));

router.post(`/:exerciseId/ratings/`, asyncHandler(async (req, res) => {
    // Create Rating for exercise and return it
    const exerciseId = parseInt(req.params.exerciseId);
    const { score, userId } = req.body;

    const ratings = await Rating.findAll({
        where: {
            user_id: userId,
            ratableId: exerciseId,
            ratableType: 'Exercise'
        }
    });

    if (ratings.length) {
        return res.json("You've already voted on that exercise!");
    }

    const rating = await Rating.create({
        score,
        user_id: userId,
        ratableId: exerciseId,
        ratableType: 'Exercise',
    });

    if (rating) {
        return res.json(rating);
    }

    res.json(`An error occured trying to add that rating!`);
}));

router.put('/:exerciseId/ratings/', asyncHandler(async (req, res, next) => {
    const exerciseId = parseInt(req.params.exerciseId);
    const { score, userId } = req.body;

    const rating = await Rating.findOne({
        where: {
            user_id: userId,
            ratableId: exerciseId,
            ratableType: 'Exercise',
        }
    });

    if (!rating) return res.json('Cannot find rating to update!');
    const oldScore = rating.score;
    rating.score = score;
    await rating.save();
    res.json({ rating, oldScore });
}));

router.post('/:exerciseId/comments', asyncHandler(async (req, res, next) => {
    const exerciseId = parseInt(req.params.exerciseId);
    const { userId, commentInput } = req.body;

    const author = await User.findByPk(userId);

    const newComment = await Comment.create({
        content: commentInput,
        user_id: userId,
        commentableId: exerciseId,
        commentableType: 'Exercise'
    });

    if (newComment) {
        newComment.dataValues.User = { username: author.username };
        return res.json(newComment);
    }

    res.json(`Something went wrong trying to create comment!`);
}));

router.put('/:exerciseId/comments', asyncHandler(async (req, res, next) => {
    const exerciseId = parseInt(req.params.exerciseId);
    const { userId, editComment, commentId } = req.body;

    const updatedComment = await Comment.findOne({
        where: {
            id: commentId,
            user_id: userId,
            commentableId: exerciseId,
            commentableType: 'Exercise',
        },
        include: {
            model: User,
            attributes: ['username']
        }
    });


    if (updatedComment) {
        updatedComment.content = editComment;
        updatedComment.updatedAt = new Date();
        await updatedComment.save();

        return res.json({ updatedComment, exerciseId });
    }

    res.json('Cannot find comment!');
}));

router.delete('/:exerciseId/comments/:commentId', asyncHandler(async (req, res, next) => {
    const exerciseId = parseInt(req.params.exerciseId);
    const commentId = parseInt(req.params.commentId);
    const { type } = req.body;

    const comment = await Comment.findByPk(commentId);

    if (comment) {
        await comment.destroy();
        return res.json({ deletedCommentId: commentId, exerciseId });
    }

    return res.json(`Something went wrong deleting the comment!`);
}));

router.get('/:exerciseId/comments/:commentId', asyncHandler(async (req, res, next) => {
    return res.json('test');
}));

router.get('/:exerciseId/liked/:userId', asyncHandler(async (req, res, next) => {
    const exerciseId = parseInt(req.params.exerciseId);
    const userId = parseInt(req.params.userId);

    const likedExercise = await Liked.findOne({
        where: {
            user_id: userId,
            likedId: exerciseId,
            likedType: 'Exercise'
        }
    });

    if (likedExercise) {
        await likedExercise.destroy();
        return res.json(exerciseId);
    } else {
        const newLike = await Liked.create({
            user_id: userId,
            likedId: exerciseId,
            likedType: 'Exercise'
        });

        return res.json(newLike);
    }
}));

module.exports = router;
