import * as APIUtil from '../util/session_api_util'
import jwt_decode from 'jwt-decode'

export const RECEIVE_USER_LOGOUT = 'RECEIVE_USER_LOGOUT'
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS'
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const RECEIVE_USER_SIGN_IN = 'RECEIVE_USER_SIGN_IN'
export const BEGIN_SIGNUP = 'BEGIN_SIGNUP'

// Simple Action Creators ---------------------------------

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
})

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
})

export const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGN_IN
})

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
})

// Thunks -------------------------------------------------

export const register = user => dispatch =>
  APIUtil.register(user).then(
    () => dispatch(login(user)),
    err => dispatch(receiveErrors(err.response.data))
  )

export const login = user => dispatch =>
  APIUtil.login(user)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      APIUtil.setAuthToken(token)
      const decoded = jwt_decode(token)
      dispatch(receiveCurrentUser(decoded))
    })
    .catch(err => {
      dispatch(receiveErrors(err.response.data))
    })

export const logout = () => dispatch => {
  // Remove the token from local storage
  localStorage.removeItem('jwtToken')
  // Remove the token from the common axios header
  APIUtil.setAuthToken(false)
  // Dispatch a logout action
  dispatch(logoutUser())
}

export const checkForExistingEmail = email => dispatch =>
  APIUtil.checkForExistingEmail(email)
    .then(res => {
      const exists = res.data.exists
      if (!exists)
        dispatch({
          type: BEGIN_SIGNUP,
          email
        })
      return exists
    })
    .catch(err => {
      dispatch(receiveErrors(err.response.data))
    })

export const getCurrentUser = () => dispatch => {
  return APIUtil.getCurrentUser()
    .then(res => {
      dispatch(receiveCurrentUser(res.data))
    })
    .catch(err => {
      dispatch(receiveErrors(err.response.data))
    })
}
