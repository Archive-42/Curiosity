import React, { useState } from 'react';
import { connect } from 'react-redux';

import { login } from '../actions/sessionActions';

const SessionForm = (props) => {
	// NOTE #2
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	// NOTE #4
	const handleChange = (e) => {
		let method = e.target.name === 'email' ? setEmail : setPassword;
		method(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// debugger
		props.login(email, password);
	};

	return (
		<div className='session-form'>
			<h1>Login Below</h1>

			{/* NOTE #5 */}
			<form onSubmit={handleSubmit}>
				<label>Email</label>

				{/* NOTE #3 */}
				<input name='email' value={email} onChange={handleChange} />
				<label>Password</label>
				<input name='password' type='password' value={password} onChange={handleChange} />
				<button type='submit'>Login</button>
			</form>
		</div>
	);
};

// const msp = (state, ownProps) => {
//   return {
//     access_token: state.session.access_token,
//   };
// };

// NOTE #1
const mdp = (dispatch) => {
	return {
		login: (email, password) => dispatch(login(email, password))
	};
};

export default connect(null, mdp)(SessionForm);
