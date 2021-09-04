const express = require('express');
const router = express.Router();
const passport = require('passport');
const Event = require('../../models/Event');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	if (!req.user) {
		res.json({});
	} else {
		Event.find()
			.where('_id')
			.in(req.user.liked_events)
			.sort({ start_date: 1 })
			.populate('location.city')
			.then(events => res.json(events));
	}
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const user = req.user;
	const idx = user.liked_events.indexOf(req.body.event_id);
	if (idx < 0) {
		user.liked_events.push(req.body.event_id);
	} else {
		user.liked_events = user.liked_events.slice(0, idx).concat(user.liked_events.slice(idx + 1));
	}
	user.save().then(user => {
		const payload = {
			liked_events: user.liked_events
		};
		return res.json(payload);
	});
});

module.exports = router;
