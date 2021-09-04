import {
  GET_ERRORS,
  ADD_ERROR,
  UPDATE_ERROR,
  DELETE_ERROR,
  WIPE_ERRORS
} from '../mainActions/errorActions'

export default function errorsReducer(state = [], action) {
  const newState = [ ...state ]
  switch (action.type) {
    case GET_ERRORS:
      return action.errors
    case ADD_ERROR:
      newState.push(action.error)
      return newState
    case UPDATE_ERROR:
      newState.push(action.error)
      return newState
    case DELETE_ERROR:
      const i = newState.indexOf(action.error)
      newState.splice(i, 1)
      return newState
    case WIPE_ERRORS:
      return []
    default:
      return state
  }
}