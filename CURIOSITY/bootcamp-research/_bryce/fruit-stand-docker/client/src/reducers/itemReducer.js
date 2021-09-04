import { RECEIVE_ITEMS, RECEIVE_ITEM } from '../actions/itemActions';
import { RECEIVE_COMPANY } from '../actions/companyActions';

const itemReducer = (state = {}, action) => {
	Object.freeze(state);

	let nextState = Object.assign({}, state);
	let newState = {};

	switch (action.type) {
		case RECEIVE_ITEMS:
			action.items.forEach((i) => (newState[i.id] = i));
			return newState;
		case RECEIVE_COMPANY:
			action.payload.items.forEach((i) => {
				if (i.type === 'fruit') newState[i.id] = i;
			});
			return newState;
		case RECEIVE_ITEM:
			return Object.assign(nextState, { [action.item.id]: action.item });
		default:
			return state;
	}
};

export default itemReducer;
