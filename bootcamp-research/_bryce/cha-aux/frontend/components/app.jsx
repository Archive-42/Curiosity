import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginForm from '../components/session/login_form_container';
import SignupForm from '../components/session/signup_form_container';
import Splash from '../components/splash/splash';
import ServerNav from '../components/servers/server_nav_container';
import ServerForm from '../components/servers/server_form_container';
import ServerIndex from '../components/servers/server_index_container';

const App = () => {
	return (
		<div className="app">
			<ProtectedRoute path="/servers" component={ServerNav} />
			<ProtectedRoute path="/server-discovery" component={ServerNav} />
			<AuthRoute exact path="/" component={Splash} />
			<AuthRoute path="/login" component={LoginForm} />
			<AuthRoute path="/signup" component={SignupForm} />
		</div>
	);
};

export default App;
