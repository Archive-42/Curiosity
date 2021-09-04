import React from 'react';
import { Switch } from 'react-router-dom';
import AuthRoute from '../util/route_util';
import Login from './session/Login';
import Signup from './session/Signup';
import Main from './main/Main';
import './app.scss';

const App = () => {
	return (
		<div className="app-container">
			<Switch>
				<AuthRoute exact path="/signin" component={Login} routeType="auth" />
				<AuthRoute exact path="/signup" component={Signup} routeType="auth" />
				<AuthRoute path="/" component={Main} routeType="protected" />
			</Switch>
		</div>
	);
};

export default App;
