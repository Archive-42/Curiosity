const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLFloat, GraphQLList } = graphql;
const mongoose = require('mongoose');
const UserType = require('./types/user_type');
const QuestionType = require('./types/question_type');
const AuthService = require('./../services/auth');
const QuestionService = require('./../services/questions');

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		signup: {
			type: UserType,
			args: {
				name: { type: GraphQLString },
				email: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve(_, args) {
				return AuthService.signup(args);
			}
		},
		logout: {
			type: UserType,
			args: {
				_id: { type: GraphQLID }
			},
			resolve(_, args) {
				return AuthService.logout(args);
			}
		},
		login: {
			type: UserType,
			args: {
				email: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve(_, args) {
				return AuthService.login(args);
			}
		},
		verifyUser: {
			type: UserType,
			args: {
				token: { type: GraphQLString }
			},
			resolve(_, args) {
				return AuthService.verifyUser(args);
			}
		},
		newQuestion: {
			type: QuestionType,
			args: {
				title: { type: GraphQLString },
				body: { type: GraphQLString },
				user_id: { type: GraphQLID }
			},
			resolve(_, args, context) {
				return QuestionService.addQuestion(args, context);
			}
		},
		deleteQuestion: {
			type: QuestionType,
			args: { _id: { type: GraphQLID } },
			resolve(_, args, context) {
				return QuestionService.deleteQuestion(args, context);
			}
		},
		updateQuestion: {
			type: QuestionType,
			args: {
				_id: { type: GraphQLID },
				titel: { type: GraphQLString },
				body: { type: GraphQLString }
			},
			resolve(_, args, context) {
				return QuestionService.updateQuestion(args, context);
			}
		}
	}
});

module.exports = mutation;
