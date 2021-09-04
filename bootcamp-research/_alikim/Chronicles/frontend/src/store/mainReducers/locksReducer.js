import {
  GET_LOCKS,
  ADD_LOCK,
  UPDATE_LOCK,
  DELETE_LOCK,
} from '../mainActions/lockActions'
// import {
//   ADD_CHOICE,
//   UPDATE_CHOICE,
//   DELETE_CHOICE,
// } from '../mainActions/choiceActions'
// import { DELETE_THREAD } from '../mainActions/threadActions'
// import { DELETE_TALE } from '../mainActions/taleActions'
// import { DELETE_CHRONICLE } from '../mainActions/chronicleActions'
// import { GET_USER_CREATIONS } from '../mainActions/userActions'


export default function locksReducer(state = {}, action) {
  let newState = { ...state }
  switch (action.type) {

    // case GET_USER_CREATIONS:
    // Object.values(action.content.s).forEach( => newState[.id] = )
    // return newState
    
    case GET_LOCKS:
      return action.locks
    case ADD_LOCK:
      newState[action.lock.id] = action.lock
      return newState
    case UPDATE_LOCK:
      newState[action.lock.id] = action.lock
      return newState
    case DELETE_LOCK:
      delete newState[action.lock.id]
      return newState

    // case ADD_CHOICE:
    //   action.locks.forEach(lock => newState[lock.id] = lock)
    //   return newState
    // case UPDATE_CHOICE:
    //   newState = Object.values(state).filter(lock => lock.choice_id !== action.choice.id)
    //   action.locks.forEach(lock => newState[lock.id] = lock)
    //   return newState
    // case DELETE_CHOICE:
    //   return Object.values(state).filter(lock => lock.choice_id !== action.choice.id)

    // case DELETE_THREAD:
      // return Object.values(state).filter(lock => action.thread.choices.includes(...?))

    // case DELETE_TALE:
      // return Object.values(state).filter(lock => action.tale.thread_ids.includes(lock.choice_ids???))

    // case DELETE_CHRONICLE:
      // return Object.values(state).filter(lock => action.chronicle.tale_ids.includes(lock.tale_id???))

    default:
      return state
  }
}