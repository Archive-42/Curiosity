import {
  GET_TALES,
  ADD_TALE,
  UPDATE_TALE,
  DELETE_TALE
} from '../mainActions/taleActions'
import { DELETE_CHRONICLE, GET_CHRONICLE } from '../mainActions/chronicleActions'
import { GET_USER_CREATIONS } from '../mainActions/userActions'


export default function talesReducer(state = {}, action) {
  const newState = { ...state }
  switch (action.type) {
    
    case GET_USER_CREATIONS:
      Object.values(action.content.tales).forEach(tale => newState[tale.id] = tale)
      return newState
    
    case GET_TALES:
      action.tales.forEach(tale => newState[tale.id] = tale)
      return newState
    case ADD_TALE:
      newState[action.tale.id] = action.tale
      return newState
    case UPDATE_TALE:
      newState[action.tale.id] = action.tale
      return newState
    case DELETE_TALE:
      delete newState[action.tale.id]
      return newState
    
    case GET_CHRONICLE:
      action.tales.forEach(tale => newState[tale.id] = tale)
      return newState
    case DELETE_CHRONICLE:
      return Object.values(state).filter(tale => tale.chronicle_id !== action.chronicle.id)
      
    default:
      return state
  }
}