import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer';
import companyReducer from './companyReducer';
import itemReducer from './itemReducer';

const rootReducer = combineReducers({
	session: sessionReducer,
	companies: companyReducer,
	items: itemReducer
});

export default rootReducer;
