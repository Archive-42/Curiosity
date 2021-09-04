import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';

const msp = state => {
	return {
		username: state.entities.users[state.session.id].username,
		iconUrl: state.entities.users[state.session.id].icon_image
	};
};

const mdp = dispatch => {
	return {
		logout: () => dispatch(logout())
	};
};

const Logout = props => (
	<button className="logout-button" onClick={() => props.logout()}>
		<img className="user-icon" src={props.iconUrl} alt={`${props.username}_user_icon_image`} />
		<p>Logout {props.username}</p>
	</button>
);

export default connect(msp, mdp)(Logout);
