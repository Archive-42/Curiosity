const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const keys = require('../../config/keys');
const passport = require('passport');

const validateLoginInput = require('../../validation/login');
const validateRegisterInput = require('../../validation/register');

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
	if (req.user) {
		res.json({
			id: req.user.id,
			full_name: req.user.full_name,
			email: req.user.email,
			liked_events: req.user.liked_events,
			registrations: req.user.registrations
		});
	} else {
		res.status(400).json({ error: 'No current user' });
	}
});

router.get('/check_email', (req, res) => {
	User.findOne({ email: req.query.email }).then(user => {
		if (user) {
			return res.json({
				exists: true
			});
		} else {
			return res.json({
				exists: false
			});
		}
	});
});

router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			errors.email = 'User already exists';
			return res.status(400).json(errors);
		} else {
			const newUser = new User({
				email: req.body.email,
				full_name: req.body.full_name,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => {
							const payload = {
								id: user.id,
								email: user.email,
								full_name: user.full_name,
								liked_events: user.liked_events,
								registrations: user.registrations
							};

							jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
								res.json({
									success: true,
									token: 'Bearer ' + token
								});
							});
						})
						.catch(err => console.log(err));
				});
			});
		}
	});
});

router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email }).then(user => {
		if (!user) {
			errors.email = 'This user does not exist';
			return res.status(400).json(errors);
		}

		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				const payload = {
					id: user.id,
					email: user.email,
					full_name: user.full_name,
					liked_events: user.liked_events,
					registrations: user.registrations
				};

				jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
					res.json({
						success: true,
						token: 'Bearer ' + token
					});
				});
			} else {
				errors.password = 'Incorrect password';
				return res.status(400).json(errors);
			}
		});
	});
});

router.patch('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const userId = req.user.id;
	const requestedUpdate = req.body.user;

	let updatedUser = await User.findOneAndUpdate(
		{ _id: userId },
		{ $set: { full_name: requestedUpdate.full_name, email: requestedUpdate.email } },
		{ new: true }
	);

	return res.json({
		id: updatedUser.id,
		full_name: updatedUser.full_name,
		email: updatedUser.email,
		liked_events: updatedUser.liked_events,
		registrations: updatedUser.registrations
	});
});

module.exports = router;
