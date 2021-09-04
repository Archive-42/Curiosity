const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLFloat } = graphql;
const { withFilter } = require('apollo-server');
const mongoose = require('mongoose');
const QuestionType = require('./types/question_type');
const Question = mongoose.model('questions');
const pubsub = require('./pubsub');

const questionSubmitted = {
	type: QuestionType,
	resolve(data) {
		return data.questionSubmitted;
	},
	subscribe: withFilter(
		() => pubsub.asyncIterator(['QUESTION_SUBMITTED']),
		(payload, variables) => {
			return true;
		}
	)
};

const questionRemoved = {
	type: QuestionType,
	resolve(data) {
		return data.questionRemoved;
	},
	subscribe: withFilter(
		() => pubsub.asyncIterator(['QUESTION_REMOVED']),
		(payload, variables) => {
			return true;
		}
	)
};

const subscription = new GraphQLObjectType({
	name: 'Subscription',
	fields: () => ({ questionSubmitted, questionRemoved })
});

module.exports = subscription;
