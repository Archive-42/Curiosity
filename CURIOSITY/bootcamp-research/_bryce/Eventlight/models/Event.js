const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
	title: {
		type: String,
		required: true,
		index: true
	},
	description: {
		type: String,
		required: true
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	organizer_name: {
		type: String,
		index: true
	},
	organizer_description: {
		type: String
	},
	start_date: {
		type: Date,
		required: true,
		index: true
	},
	end_date: {
		type: Date,
		required: true
	},
	location: {
		location_name: {
			type: String,
			index: true
		},
		location_address: {
			type: String
		},
		city: {
			type: Schema.Types.ObjectId,
			ref: 'City',
			required: false
		}
	},
	online_url: {
		type: String
	},
	price: {
		type: Number,
		required: true
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category'
	},
	type: {
		type: Schema.Types.ObjectId,
		ref: 'Type'
	},
	capacity: {
		type: Number,
		required: true
	},
	image_url: {
		type: String
	},
	attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Event', EventSchema);
