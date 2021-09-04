import { RECEIVE_COMPANY, RECEIVE_COMPANIES } from '../actions/companyActions';

const companyReducer = (state = {}, action) => {
	Object.freeze(state);

	let nextState = Object.assign({}, state);

	switch (action.type) {
		case RECEIVE_COMPANY:
			// debugger
			let newComp = { [action.payload.company.id]: action.payload.company };
			return Object.assign(nextState, newComp);
		case RECEIVE_COMPANIES:
			let newState = {};
			action.companies.forEach((c) => (newState[c.id] = c));
			return Object.assign(nextState, newState);
		default:
			return state;
	}
};

export default companyReducer;
