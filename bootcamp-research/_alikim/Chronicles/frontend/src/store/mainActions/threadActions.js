// ACTIONS
export const GET_THREADS = "GET_THREADS"
export const ADD_THREAD = "ADD_THREAD"
export const UPDATE_THREAD = "UPDATE_THREAD"
export const DELETE_THREAD = "DELETE_THREAD"


// ACTION CREATORS
export const getThreads = (threads) => ({ type: GET_THREADS, threads })
export const addThread = (content) => ({ type: ADD_THREAD, thread: content.thread, choices: content.choices })
export const updateThread = (content) => ({ type: UPDATE_THREAD, thread: content.thread, choices: content.choices })
export const deleteThread = (id) => ({ type: DELETE_THREAD, id})