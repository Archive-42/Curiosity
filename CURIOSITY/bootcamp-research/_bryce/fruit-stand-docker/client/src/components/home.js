import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchCompanies } from '../actions/companyActions';

const Home = (props) => {
	const { fetchCompanies, access_token } = props;

	// NOTE #3
	useEffect(
		() => {
			// debugger
			access_token && fetchCompanies();
		},
		[ fetchCompanies, access_token ]
	);

	// NOTE #4
	let items = props.companies.map((c, i) => (
		<li
			className='company__item'
			key={i}
			// NOTE #5
			onClick={() => props.history.push(`/companies/${c.id}`)}
		>
			{c.name}
		</li>
	));

	return (
		<div>
			<h3>Stores near you:</h3>

			<ul className='company-list'>{items}</ul>
		</div>
	);
};

// NOTE #1
const msp = (state, ownProps) => {
	return {
		companies: Object.values(state.companies),
		access_token: state.session.access_token
	};
};

// NOTE #2
const mdp = (dispatch) => {
	return {
		fetchCompanies: () => dispatch(fetchCompanies())
	};
};

export default connect(msp, mdp)(Home);
