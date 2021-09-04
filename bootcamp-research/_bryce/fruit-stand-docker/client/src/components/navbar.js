import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/sessionActions';

const Navbar = (props) => {
	return (
		<nav className='navbar'>
			<h1 onClick={() => props.history.push('/')}>FruitApp</h1>
			<button onClick={props.logout}>Logout</button>
		</nav>
	);
};

// const msp = (state, ownProps) => {
// 	return {
// 		access_token: state.session.access_token
// 	};
// };

const mdp = (dispatch) => {
	return {
		logout: () => dispatch(logout())
	};
};

export default connect(null, mdp)(Navbar);
