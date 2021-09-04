const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const cors = require('cors');
const app = express();
const db = require('./config/keys').mongoURI;
const User = require('./models/User');
const Question = require('./models/Question');
const schema = require('./schema/schema');
const path = require('path');
const { ApolloServer, gql } = require('apollo-server-express');
const { execute, subscribe } = require('graphql');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('/', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('Connected to MongoDB successfully'))
	.catch(err => console.log(err));

app.use(bodyParser.json());
app.use(cors());

app.use('/graphql', expressGraphQL(req => ({ schema, context: { token: req.headers.authorization }, graphiql: true })));

const ws = createServer(app);

SubscriptionServer.create(
	{
		execute,
		subscribe,
		schema
	},
	{
		server: ws,
		path: '/'
	}
);

const port = process.env.PORT || 5000;

ws.listen(port, () => {
	console.log(`Server is running on port ${port}`);
	console.log(`WebSocket listening on port ${port}`);
});

module.exports = app;
