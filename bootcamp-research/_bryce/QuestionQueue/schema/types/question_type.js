const mongoose = require('mongoose');
const graphql = require('graphql');
const graphqlisodate = require('graphql-iso-date');
const { GraphQLDateTime } = graphqlisodate;
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Question = mongoose.model('questions');

const QuestionType = new GraphQLObjectType({
	name: 'QuestionType',
	fields: () => ({
		_id: { type: GraphQLID },
		user_id: { type: GraphQLID },
		author: {
			type: GraphQLString,
			resolve(parentValue) {
				return Question.findAuthor(parentValue._id);
			}
		},
		title: { type: GraphQLString },
		body: { type: GraphQLString },
		date: { type: GraphQLDateTime }
	})
});

module.exports = QuestionType;
