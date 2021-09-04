const jwt = require('jsonwebtoken');
const key = require('../config/keys').secretOrKey;
const User = require('../models/User');
const Question = require('../models/Question');
const pubsub = require('../schema/pubsub');

const addQuestion = async (data, context) => {
	const token = context.token;
	const { title, body } = data;
	const decoded = jwt.verify(token, key);
	const { id } = decoded;
	if (id) {
		let question = new Question({
			user_id: id,
			title,
			body
		});

		await question.save();
		await pubsub.publish('QUESTION_SUBMITTED', { questionSubmitted: question });
		return question;
	} else {
		throw new Error('Sorry, you need to be logged in to submit a question.');
	}
};

const updateQuestion = async ({ id, title, body }) => {
	const updateObj = {};

	if (id) updateObj.id = id;
	if (title) updateObj.title = title;
	if (body) updateObj.body = body;

	return Question.findOneAndUpdate({ _id: id }, { $set: updateObj }, { new: true }, (err, question) => {
		return question;
	});
};

const deleteQuestion = async (data, context) => {
	try {
		const token = context.token;

		const decoded = await jwt.verify(token, key);
		const { id } = decoded;

		const { _id } = data;
		let question = await Question.findById(_id);

		if (question.user_id != id) {
			throw new Error('Cannot delete questions that are not your own');
		}

		await question.remove();
		await pubsub.publish('QUESTION_REMOVED', { questionRemoved: question });

		return question;
	} catch (err) {
		throw err;
	}
};

module.exports = { addQuestion, updateQuestion, deleteQuestion };
