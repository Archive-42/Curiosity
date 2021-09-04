const express = require('express');
const router = express.Router();
const passport = require('passport');
const Event = require('../../models/Event');
const User = require('../../models/User');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	if (!req.user) {
		res.json({});
	} else {
		Event.find()
			.where('_id')
			.in(req.user.registrations)
			.sort({ start_date: 1 })
			.then(events => res.json(events));
	}
});

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const userId = req.user.id;
	const eventId = req.body.event_id;
	let payload = {};
	let updatedEvent = await Event.findOneAndUpdate(
		{ _id: eventId },
		{ $addToSet: { attendees: userId } },
		{ new: true }
	);
	let updatedUser = await User.findOneAndUpdate(
		{ _id: userId },
		{ $addToSet: { registrations: eventId } },
		{ new: true }
	);
	payload.attendees = updatedEvent.attendees;
	payload.registrations = updatedUser.registrations;
	return res.json(payload);
});

router.delete('/:eventId', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const userId = req.user.id;
	const eventId = req.params.eventId;
	let payload = {};
	let updatedEvent = await Event.findOneAndUpdate({ _id: eventId }, { $pull: { attendees: userId } }, { new: true });
	let updatedUser = await User.findOneAndUpdate({ _id: userId }, { $pull: { registrations: eventId } }, { new: true });
	payload.attendees = updatedEvent.attendees;
	payload.registrations = updatedUser.registrations;
	return res.json(payload);
});

module.exports = router;
