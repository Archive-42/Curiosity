const graphql = require('graphql')
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql
const mongoose = require('mongoose')

// grab the user Model so that we can return a User Object in our author field
const UserType = require('./user_type')
const User = mongoose.model('user')

const PostType = new GraphQLObjectType({
	name: 'PostType',
	fields: {
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		body: { type: GraphQLString },
		author: {
			// here we have to tell GraphQL we are explicitly returning another type.
			// The Author field will return a User Type!
			type: UserType,
			// we don't need any arguments because parentValue already has the author information
			resolve(parentValue) {
				return User.findById(parentValue.author)
					.then(user => user)
					.catch(err => null)
			}
		}
	}
})

module.exports = PostType
