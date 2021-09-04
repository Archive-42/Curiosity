// ACTIONS
export const GET_USER_CREATIONS = "GET_USER_CREATIONS"
export const LOGOUT_USER = "LOGOUT_USER"
export const CREATE_USER = "CREATE_USER"

// ACTION CREATORS
export const getCreations = (content) => ({ type: GET_USER_CREATIONS, content })
export const logoutUser = () => ({type: LOGOUT_USER})
export const createUser = (user) => ({type: CREATE_USER, user})