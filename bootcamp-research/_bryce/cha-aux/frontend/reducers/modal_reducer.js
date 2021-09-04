import { CLOSE_MODAL, OPEN_MODAL } from '../actions/modal_actions';

const _defaultState = {
	open: false
};

const modalReducer = (state = _defaultState, action) => {
	Object.freeze(state);
	switch (action.type) {
		case CLOSE_MODAL:
			return _defaultState;
		case OPEN_MODAL:
			return { open: true, form: action.form };
		default:
			return state;
	}
};

export default modalReducer;
