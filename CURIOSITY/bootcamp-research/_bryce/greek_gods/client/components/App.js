import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GodsList from './gods/GodsList';
import CreateIndex from './create/CreateIndex';
import NavBar from './NavBar';
import GodDetail from './gods/GodDetail';

const App = () => {
	return (
		<div>
			<NavBar />
			<Switch>
				<Route exact path="/gods/:id" component={GodDetail} />
				<Route exact path="/new" component={CreateIndex} />
				<Route path="/" component={GodsList} />
			</Switch>
		</div>
	);
};

export default App;
