const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } = graphql;
const mongoose = require('mongoose');
const DogType = require('./dog_type');
const ToyType = require('./toy_type');

const Dog = mongoose.model('dog');
const Toy = mongoose.model('toy');

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		// this will be the name of this mutation
		newDog: {
			// creating a Dog type
			type: DogType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				breed: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parentValue, { name, breed }) {
				return new Dog({ name, breed }).save();
			}
		},
		updateDog: {
			// creating a Dog type
			type: DogType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) },
				name: { type: new GraphQLNonNull(GraphQLString) },
				breed: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parentValue, { _id, name, breed }) {
				console.log(_id, name, breed);
				return Dog.findOneAndUpdate({ _id: _id }, { $set: { name, breed } }, { new: true }, (err, dog) => {
					return dog;
				});
			}
		},
		updateToy: {
			// creating a Toy type
			type: ToyType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) },
				name: { type: new GraphQLNonNull(GraphQLString) },
				color: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parentValue, { _id, name, color }) {
				console.log(_id, name, color);
				return Toy.findOneAndUpdate({ _id: _id }, { $set: { name, color } }, { new: true }, (err, toy) => {
					return toy;
				});
			}
		},
		newToy: {
			// creating a Toy type
			type: ToyType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				color: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parentValue, { name, color }) {
				return new Toy({ name, color }).save();
			}
		},
		addToytoDog: {
			// creating a Toy type
			type: DogType,
			args: {
				dogId: { type: new GraphQLNonNull(GraphQLID) },
				toyId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parentValue, { dogId, toyId }) {
				// returns the dog the toy was added to
				return Dog.addnewToy(dogId, toyId);
			}
		}
	}
});

module.exports = mutation;
