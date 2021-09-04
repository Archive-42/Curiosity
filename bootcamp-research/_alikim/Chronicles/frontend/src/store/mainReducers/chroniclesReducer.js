import {
  GET_GALLERY_CHRONICLES,
  GET_CHRONICLE,
  GET_CHRONICLES,
  ADD_CHRONICLES,
  ADD_CHRONICLE,
  UPDATE_CHRONICLE,
  DELETE_CHRONICLE
} from '../mainActions/chronicleActions'
import { GET_USER_CREATIONS } from '../mainActions/userActions'

export default function chroniclesReducer(state = {gallery_ids: []}, action) {
  const newState = { ...state }
  // newState.gallery_ids = new Set(state.gallery_ids)
  switch (action.type) {

    case GET_USER_CREATIONS:
      Object.values(action.content.chronicles).forEach(chronicle => newState[chronicle.id] = chronicle)
      return newState
    case GET_CHRONICLE:
      newState[action.chronicle.id] = action.chronicle
      return newState
      case GET_GALLERY_CHRONICLES:
      action.chronicles.forEach(chronicle => { newState[chronicle.id] = chronicle })
      newState.gallery_ids = action.chronicles.map(chronicle => chronicle.id)
      return newState
    case GET_CHRONICLES:
      action.chronicles.forEach(chronicle => newState[chronicle.id] = chronicle)
      return newState
    case ADD_CHRONICLES:
      action.chronicles.forEach(chronicle => newState[chronicle.id] = chronicle)
      return newState
    case ADD_CHRONICLE:
      newState[action.chronicle.id] = action.chronicle
      return newState
    case UPDATE_CHRONICLE:
      newState[action.chronicle.id] = action.chronicle
      return newState
    case DELETE_CHRONICLE:
      delete newState[action.chronicle.id]
      return newState

    default:
      return state
  }
}