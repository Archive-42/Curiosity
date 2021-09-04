import { combineReducers } from 'redux'
import session from './session_api_reducer'
import errors from './errors_reducer'
import events from './events_reducer'
import UiReducer from './ui_reducer'
import types from './types_reducer'
import categories from './categories_reducer'

const RootReducer = combineReducers({
	session,
	events,
	errors,
	types,
	categories,
	ui: UiReducer
})

export default RootReducer
