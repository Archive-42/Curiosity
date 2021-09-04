import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchCompany } from '../actions/companyActions';

import ItemSection from './itemSection';

const CompanyShow = (props) => {
	const { fetchCompany, companyId } = props;

	// NOTE #3
	useEffect(
		() => {
			fetchCompany(companyId);
		},
		[ fetchCompany, companyId ]
	);

	if (!props.company) return null;

	return (
		<div>
			<h1>{props.company.name}</h1>

			{/* NOTE #4 */}
			<ItemSection />
		</div>
	);
};

// NOTE #1
const msp = (state, ownProps) => {
	let companyId = ownProps.match.params.companyId;
	return {
		companyId: companyId,
		company: state.companies[companyId]
	};
};

// NOTE #2
const mdp = (dispatch) => {
	return {
		fetchCompany: (id) => dispatch(fetchCompany(id))
	};
};

export default connect(msp, mdp)(CompanyShow);
