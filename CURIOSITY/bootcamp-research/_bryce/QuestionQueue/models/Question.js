const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = mongoose.model('users');

const QuestionSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	date: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	}
});

QuestionSchema.statics.findAuthor = function(questionId) {
	return this.findById(questionId).then(question => User.findById(question.user_id).then(user => user.name));
};

module.exports = mongoose.model('questions', QuestionSchema);
