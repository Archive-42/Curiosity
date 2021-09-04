const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const UserType = require('./user_type');
const User = mongoose.model('users');
const Question = mongoose.model('questions');
const QuestionType = require('./question_type');

const RootQueryType = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: () => ({
		users: {
			type: new GraphQLList(UserType),
			resolve() {
				return User.find({});
			}
		},
		user: {
			type: UserType,
			args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(_, args) {
				return User.findById(args._id);
			}
		},
		questions: {
			type: new GraphQLList(QuestionType),
			resolve() {
				return Question.find({}).populate('users');
			}
		},
		question: {
			type: QuestionType,
			args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(_, args) {
				return Question.findById(args._id);
			}
		}
	})
});

module.exports = RootQueryType;
