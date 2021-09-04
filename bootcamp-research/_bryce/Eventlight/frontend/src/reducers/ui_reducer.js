import { combineReducers } from 'redux'
import FiltersReducer from './filters_reducer'
import AutocompleteReducer from './autocomplete_reducer'
import SignInErrorModalReducer from './signin_error_modal_reducer'

const UiReducer = combineReducers({
  filter: FiltersReducer,
  autocomplete: AutocompleteReducer,
  signin_error_modal: SignInErrorModalReducer
})

export default UiReducer
