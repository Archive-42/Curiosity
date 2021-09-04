import {
  GET_STATUSES,
  ADD_STATUS,
  UPDATE_STATUS,
  DELETE_STATUS,
} from '../mainActions/statusActions'
import { GET_USER_CREATIONS } from '../mainActions/userActions'


export default function statusesReducer(state = {}, action) {
  let newState = { ...state }
  switch (action.type) {

    case GET_USER_CREATIONS:
      Object.values(action.content.statuses).forEach(status => newState[status.id] = status)
      return newState
    
    case GET_STATUSES:
      return action.statuses
    case ADD_STATUS:
      newState[action.status.id] = action.status
      return newState
    case UPDATE_STATUS:
      newState[action.status.id] = action.status
      return newState
    case DELETE_STATUS:
      delete newState[action.status.id]
      return newState

    default:
      return state
  }
}