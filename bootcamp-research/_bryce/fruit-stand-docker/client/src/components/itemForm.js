import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createItem } from '../actions/itemActions';

const ItemForm = (props) => {
	// NOTE #1
	let { createItem, companyId, updateTab, currentTab } = props;

	const [ imgSrc, setImgSrc ] = useState('');
	const [ name, setName ] = useState('');
	const [ type, setType ] = useState('');

	const handleChange = (e) => {
		if (e.target.name === 'name') {
			setName(e.target.value);
		} else if (e.target.name === 'type') {
			setType(e.target.value);
		} else {
			setImgSrc(e.target.value);
		}
	};

	// NOTE #3
	const handleSubmit = (e) => {
		e.preventDefault();
		let newItem = { name: name, imgSrc: imgSrc, type: type };

		createItem(newItem, companyId);

		if (type !== currentTab && [ 'fruit', 'vegetable' ].includes(type.toLowerCase())) {
			updateTab(type);
		}
		setImgSrc('');
		setName('');
		setType('');
	};
	let form = (
		<form className='product-form' onSubmit={handleSubmit}>
			<input value={name} name='name' placeholder='Enter item name...' onChange={handleChange} />

			<input value={imgSrc} name='imgSrc' placeholder='Enter item imgSrc...' onChange={handleChange} />

			<input value={type} name='type' placeholder='Enter item type...' onChange={handleChange} />

			<button type='submit'>{`Add new ${currentTab}`}</button>
		</form>
	);
	return form;
};

const mdp = (dispatch) => {
	return {
		createItem: (item, id) => dispatch(createItem(item, id))
	};
};

export default connect(null, mdp)(ItemForm);
