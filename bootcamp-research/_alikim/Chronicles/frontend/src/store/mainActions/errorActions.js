// ACTIONS
export const GET_ERRORS = "GET_ERRORS"
export const ADD_ERROR = "ADD_ERROR"
export const UPDATE_ERROR = "UPDATE_ERROR"
export const DELETE_ERROR = "DELETE_ERROR"
export const WIPE_ERRORS = "WIPE_ERRORS"

// ACTION CREATORS
export const getErrors = (errors) => ({ type: GET_ERRORS, errors })
export const addError = (error) => ({ type: ADD_ERROR, error })
export const updateError = (error) => ({ type: UPDATE_ERROR, error })
export const deleteError = (error) => ({ type: DELETE_ERROR, error })
export const wipeErrors = () => ({type: WIPE_ERRORS})