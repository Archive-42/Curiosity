const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('../config/keys.js').MONGO_URI;

const app = express();
app.use(express.static('public'));

const expressGraphQL = require('express-graphql');
const models = require('./models/index');
const schema = require('./schema/schema');

if (!db) {
	throw new Error('You must provide a string to connect to MongoDB Atlas');
}

mongoose
	// The configuration object we pass into connect()
	// prevents an error being thrown by the latest release of MongoDB's driver
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('Connected to MongoDB successfully'))
	.catch(err => console.log(err));

// We use body-parser in order to be able to parse
// incoming requests in middleware before they are handled
app.use(bodyParser.json());

app.use(
	'/graphql',
	expressGraphQL({
		schema,
		graphiql: true
	})
);

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
