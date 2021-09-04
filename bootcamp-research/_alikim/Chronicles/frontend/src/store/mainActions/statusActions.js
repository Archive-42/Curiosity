// ACTIONS
export const GET_STATUSES = "GET_STATUSES"
export const ADD_STATUS = "ADD_STATUS"
export const UPDATE_STATUS = "UPDATE_STATUS"
export const DELETE_STATUS = "DELETE_STATUS"


// ACTION CREATORS
export const getStatuses = (statuses) => ({ type: GET_STATUSES, statuses })
export const addStatus = (status) => ({ type: ADD_STATUS, status })
export const updateStatus = (status) => ({ type: UPDATE_STATUS, status })
export const deleteStatus = (status) => ({ type: DELETE_STATUS, status })