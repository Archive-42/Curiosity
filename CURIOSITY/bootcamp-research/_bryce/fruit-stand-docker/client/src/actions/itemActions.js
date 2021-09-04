import { baseUrl } from '../config';

export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const RECEIVE_ITEM = 'RECEIVE_ITEM';

const receiveItems = (items) => {
	return {
		type: RECEIVE_ITEMS,
		items
	};
};

const receiveItem = (item) => {
	return {
		type: RECEIVE_ITEM,
		item
	};
};

export const fetchItems = (companyId, type) => async (dispatch) => {
	const response = await fetch(`${baseUrl}/items/${companyId}/${type}`);

	if (response.ok) {
		const { items } = await response.json();
		dispatch(receiveItems(items));
	}
};

export const createItem = (item, companyId) => async (dispatch) => {
	let response = await fetch(`${baseUrl}/items/${companyId}/new`, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(item)
	});

	response = await response.json();
	if (response.ok) {
		const { item } = response;
		dispatch(receiveItem(item));
	} else {
		console.log(response);
	}
};
