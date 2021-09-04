import React from 'react';

const ItemList = (props) => {
	let itemEls = props.items.map((c) => (
		<li key={c.id} className='product-list__item'>
			<label>{c.name}</label>
			<img src={c.imgSrc} alt={c.name} />
		</li>
	));
	let list = <ul className='product-list'>{itemEls}</ul>;
	return list;
};

export default ItemList;
