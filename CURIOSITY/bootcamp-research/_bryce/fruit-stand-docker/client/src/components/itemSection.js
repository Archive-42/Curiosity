import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchItems } from '../actions/itemActions';

import ItemForm from './itemForm';
import ItemList from './itemList';

const ItemSection = (props) => {
	// NOTE #3
	const [ currentTab, setCurrentTab ] = useState('fruit');

	const { fetchItems, companyId, items } = props;

	// NOTE #4
	useEffect(
		() => {
			fetchItems(companyId, currentTab);
		},
		[ currentTab, fetchItems, companyId ]
	);

	return (
		<section className='product-section'>
			<h2>{currentTab}</h2>

			<div className='tabs'>
				<button
					className={currentTab === 'fruit' ? 'selected' : ''}
					name='fruit'
					// NOTE #5
					onClick={() => setCurrentTab('fruit')}
				>
					Fruit
				</button>
				<button
					className={currentTab === 'fruit' ? '' : 'selected'}
					name='Vegetables'
					onClick={() => setCurrentTab('vegetable')}
				>
					Vegetables
				</button>
			</div>

			<ItemList items={items} />

			<ItemForm companyId={companyId} currentTab={currentTab} updateTab={setCurrentTab} />
		</section>
	);
};

// NOTE #1
const msp = (state, ownProps) => {
	let companyId = ownProps.match.params.companyId;
	return {
		companyId: companyId,
		company: state.companies[companyId],
		items: Object.values(state.items) || []
	};
};

// NOTE #2
const mdp = (dispatch) => {
	return {
		fetchItems: (id, type) => dispatch(fetchItems(id, type))
	};
};

export default withRouter(connect(msp, mdp)(ItemSection));
