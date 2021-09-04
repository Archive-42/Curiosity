import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const NavBar = props => {
	return (
		<nav>
			{props.location.pathname === '/' ? null : <Link to="/">Back to Index</Link>}
			{props.location.pathname === '/new' ? null : <Link to="/new">Create</Link>}
		</nav>
	);
};

export default withRouter(NavBar);
