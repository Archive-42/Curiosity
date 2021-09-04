// ACTIONS
export const GET_LOCKS = "GET_LOCKS"
export const ADD_LOCK = "ADD_LOCK"
export const UPDATE_LOCK = "UPDATE_LOCK"
export const DELETE_LOCK = "DELETE_LOCK"


// ACTION CREATORS
export const getLocks = (locks) => ({ type: GET_LOCKS, locks })
export const addLock = (lock) => ({ type: ADD_LOCK, lock})
export const updateLock = (lock) => ({ type: UPDATE_LOCK, lock})
export const deleteLock = (lock) => ({ type: DELETE_LOCK, lock })