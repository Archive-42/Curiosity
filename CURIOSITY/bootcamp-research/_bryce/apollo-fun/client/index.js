import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './components/App';

const cache = new InMemoryCache({
	dataIdFromObject: object => object._id || null
});

const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql',
	cache,
	onError: ({ networkError, graphQLErrors }) => {
		console.log('graphQLErrors', graphQLErrors);
		console.log('networkError', networkError);
	}
});

const Root = () => {
	return (
		<ApolloProvider client={client}>
			<HashRouter>
				<App />
			</HashRouter>
		</ApolloProvider>
	);
};

ReactDOM.render(<Root />, document.querySelector('#root'));
