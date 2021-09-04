const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const GodType = require('./god_type');
const God = mongoose.model('god');
const EmblemType = require('./emblem_type');
const Emblem = mongoose.model('emblem');
const AbodeType = require('./abode_type');
const Abode = mongoose.model('abode');

const RootQuery = new GraphQLObjectType({
	// remember to name your query properly
	name: 'RootQueryType',
	fields: () => ({
		// this root query will return all gods,
		// therefore it's won't need an argument
		gods: {
			type: new GraphQLList(GodType),
			resolve() {
				// this is just the mongoose method to return all gods
				return God.find({});
			}
		},
		god: {
			// we are only returning a single god here so we don't need a GraphQLList
			type: GodType,
			// we will take in an `id` for this root query to find the single god
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parentValue, { id }) {
				return God.findById(id);
			}
		},
		emblems: {
			type: new GraphQLList(EmblemType),
			resolve() {
				return Emblem.find({});
			}
		},
		emblem: {
			type: EmblemType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parentValue, { id }) {
				return Emblem.findById(id);
			}
		},
		abodes: {
			type: new GraphQLList(AbodeType),
			resolve() {
				return Abode.find({});
			}
		},
		abode: {
			type: AbodeType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parentValue, { id }) {
				return Abode.findById(id);
			}
		}
	})
});

module.exports = RootQuery;
