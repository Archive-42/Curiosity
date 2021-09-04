require('dotenv').config();
const multer = require('multer');
var AWS = require('aws-sdk');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Category = require('../../models/Category');
const Type = require('../../models/Type');
const City = require('../../models/City');

const Event = require('../../models/Event');
const validateEventInput = require('../../validation/events');

router.get('/', (req, res) => {
	// Example queryFilters structure:
	//
	// const queryFilters = {
	// 	type: 'Festival',
	// 	category: 'Food & Drink',
	// 	start_date: 'June 13, 2019 11:13:00',
	// 	end_date: 'July 26, 2019 11:13:00',
	// 	city: { city: 'Dover', state: 'DE' }
	// }

	const queryFilters = req.query;

	const populateFilters = {
		creator: { path: 'creator', select: 'full_name email' },
		type: { path: 'type' },
		category: { path: 'category' },
		city: { path: 'location.city' }
	};

	if (queryFilters.currentUserId) {
		populateFilters.creator.match = { _id: queryFilters.currentUserId };
	}
	if (queryFilters.type) {
		populateFilters.type.match = { name: queryFilters.type };
	}
	if (queryFilters.type) {
		populateFilters.type.match = { name: queryFilters.type };
	}
	if (queryFilters.category) {
		populateFilters.category.match = { name: queryFilters.category };
	}
	if (queryFilters.city) {
		let cityRegex = new RegExp('^' + queryFilters.city, 'i');
		populateFilters.city.match = { city: cityRegex };
	}

	queryFilters.start_date = queryFilters.start_date ? new Date(parseInt(queryFilters.start_date)) : new Date();

	queryFilters.end_date = queryFilters.end_date
		? new Date(parseInt(queryFilters.end_date))
		: new Date(9999, 11, 31, 23, 59, 59, 999);

	Event.find({ title: new RegExp(queryFilters.title, 'i') })
		.populate(populateFilters.creator)
		.populate(populateFilters.type)
		.populate(populateFilters.category)
		.populate(populateFilters.city)
		.where('start_date')
		.gte(queryFilters.start_date)
		.lte(queryFilters.end_date)
		.sort({ start_date: 1 })
		.then(events => {
			events = events.filter(
				event => event.creator && event.type && event.category && (event.location.city || event.online_url)
			);
			res.json(events);
		})
		.catch(err => {
			res.status(404).json({ noEventsFound: 'No events found' });
		});
});

router.get('/auto', (req, res) => {
	let queryRegex = new RegExp(req.query.events, 'i');
	Event.aggregate([
		{ $match: { title: queryRegex } },
		{ $limit: 10 },
		{
			$lookup: {
				from: 'cities',
				localField: 'location.city',
				foreignField: '_id',
				as: 'city_info'
			}
		},
		{ $unwind: '$city_info' }
	])
		.then(events => res.json(events))
		.catch(error => res.status(404).json({ noEventsFound: 'No events found' }));
});

router.get('/:id', (req, res) => {
	const eventId = req.params.id;
	Event.findById(eventId)
		.populate({ path: 'location.city' })
		.then(event => res.json(event))
		.catch(err => res.status(404).json({ invalidEventId: 'Event not found' }));
});

router.post('/', upload.single('file'), (req, res) => {
	const { errors, isValid } = validateEventInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const file = req.file;
	const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

	let s3bucket = new AWS.S3({
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		region: process.env.AWS_REGION
	});

	var params = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: file.originalname,
		Body: file.buffer,
		ContentType: file.mimetype,
		ACL: 'public-read'
	};

	s3bucket.upload(params, function(err, data) {
		if (err) {
			res.status(500).json({ error: true, Message: err });
		} else {
			delete req.body.file;
			req.body.image_url = s3FileURL + file.originalname;

			if (!req.body.online_url) {
				City.findOne({ city: req.body.location.city.city, state: req.body.location.city.state })
					.then(city => {
						req.body.location.city = city._id;
						const newEvent = new Event(req.body);
						newEvent
							.save()
							.then(event => res.json({ success: true, event }))
							.catch(err => res.status(400).json(err));
					})
					.catch(err => res.status(404).json({ invalidCity: 'City not found' }));
			} else {
				delete req.body.location.city;
				const newEvent = new Event(req.body);
				newEvent
					.save()
					.then(event => res.json({ success: true, event }))
					.catch(err => res.status(400).json(err));
			}
		}
	});
});

router.patch('/:id', upload.single('file'), async (req, res) => {
	const { errors, isValid } = validateEventInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	if (!req.body.online_url) {
		await City.findOne({ city: req.body.location.city.city, state: req.body.location.city.state })
			.then(city => {
				req.body.location.city = city._id;
			})
			.catch(err => {
				res.status(404).json({ invalidCity: 'City not found' });
			});
	} else {
		delete req.body.location.city;
	}

	delete req.body.attendees;
	delete req.body.creator;

	const file = req.file;

	if (file) {
		const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

		let s3bucket = new AWS.S3({
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
			region: process.env.AWS_REGION
		});

		var params = {
			Bucket: process.env.AWS_BUCKET_NAME,
			Key: file.originalname,
			Body: file.buffer,
			ContentType: file.mimetype,
			ACL: 'public-read'
		};

		s3bucket.upload(params, function(err, data) {
			if (err) {
				res.status(500).json({ error: true, Message: err });
			} else {
				delete req.body.file;
				req.body.image_url = s3FileURL + file.originalname;
				Event.findOneAndUpdate({ _id: req.body.id }, { $set: req.body }, { new: true })
					.then(event => {
						res.json({ success: true, event });
					})
					.catch(err => {
						res.status(400).json(err);
					});
			}
		});
	} else {
		Event.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
			.then(event => {
				res.json({ success: true, event });
			})
			.catch(err => {
				res.status(400).json(err);
			});
	}
});

module.exports = router;
