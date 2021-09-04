const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Event = require('./Event')

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: true
  },
  full_name: {
    type: String
  },
  password: {
    type: String,
    require: true
  },
  liked_events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  registrations: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
})

module.exports = mongoose.model('User', UserSchema)
