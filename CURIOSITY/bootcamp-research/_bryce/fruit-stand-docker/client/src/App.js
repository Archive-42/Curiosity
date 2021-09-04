import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { PrivateRoute, AuthRoute } from './utils/routeUtils';
import { loadToken, TOKEN_KEY } from './actions/sessionActions';

import Home from './components/home';
import Session from './components/session';
import CompanyShow from './components/companyShow';
import Navbar from './components/navbar';

import './index.css';

const App = (props) => {
	const { loadToken } = props;

	// NOTE #3
	useEffect(
		() => {
			loadToken();
		},
		[ loadToken ]
	);

	let localStorageToken = window.localStorage.getItem(TOKEN_KEY);
	let access_token = localStorageToken ? localStorageToken : props.access_token;

	let loggedIn = access_token ? true : false;

	// debugger
	return (
		<BrowserRouter>
			{/* NOTE #4 */}
			{loggedIn ? <Route path='/' component={Navbar} /> : null}

			<Switch>
				{/* NOTE #5 */}
				<AuthRoute path='/session' component={Session} loggedIn={loggedIn} />

				{/* NOTE #6*/}
				<PrivateRoute path='/companies/:companyId' component={CompanyShow} loggedIn={loggedIn} />

				<PrivateRoute exact={true} path='/' component={Home} loggedIn={loggedIn} />
			</Switch>
		</BrowserRouter>
	);
};

// NOTE #1
const msp = (state) => {
	return {
		access_token: state.session.access_token
	};
};

// NOTE #2
const mdp = (dispatch) => {
	return {
		loadToken: () => dispatch(loadToken())
	};
};

export default connect(msp, mdp)(App);
