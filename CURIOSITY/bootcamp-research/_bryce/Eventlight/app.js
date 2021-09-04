const mongoose = require('mongoose');
const express = require('express');
const app = express();
const db = process.env.MONGO_URI || require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const events = require('./routes/api/events');
const cities = require('./routes/api/cities');
const likes = require('./routes/api/likes');
const registrations = require('./routes/api/registrations');
const categories = require('./routes/api/categories');
const types = require('./routes/api/types');
const passport = require('passport');
const path = require('path');

require('dotenv').config();
const cors = require('cors');
app.use(cors());

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('frontend/build'));
	app.get('/', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
	});
}

mongoose
	.connect(db, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
	.then(() => console.log('Connected to MongoDB successfully'))
	.catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (_, res) => res.send('Eventlight all day'));
app.use('/api/users', users);
app.use('/api/events', events);
app.use('/api/cities', cities);
app.use('/api/likes', likes);
app.use('/api/registrations', registrations);
app.use('/api/categories', categories);
app.use('/api/types', types);
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log(`Server is running on port ${port}`));
