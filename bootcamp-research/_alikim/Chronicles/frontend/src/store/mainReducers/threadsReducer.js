import {
  GET_THREADS,
  ADD_THREAD,
  UPDATE_THREAD,
  DELETE_THREAD
} from '../mainActions/threadActions'
import { DELETE_TALE } from '../mainActions/taleActions'
import { DELETE_CHRONICLE } from '../mainActions/chronicleActions'
import { GET_USER_CREATIONS } from '../mainActions/userActions'


export default function threadsReducer(state = {}, action) {
  const newState = { ...state }

  switch (action.type) {
    
    case GET_USER_CREATIONS:
      Object.values(action.content.threads).forEach(thread => newState[thread.id] = thread)
      return newState
    
    case GET_THREADS:
      return action.threads
    case ADD_THREAD:
      newState[action.thread.id] = action.thread
      return newState
    case UPDATE_THREAD:
      newState[action.thread.id] = action.thread
      return newState
    case DELETE_THREAD:
      delete newState[action.id]
      return newState

    case DELETE_TALE:
      return Object.values(state).filter(thread => thread.tale_id !== action.tale.id)

    case DELETE_CHRONICLE:
      return Object.values(state).filter(thread => !action.chronicle.tale_ids.includes(thread.tale_id))

    default:
      return state
  }
}