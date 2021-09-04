export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const EDIT_USER = 'EDIT_USER';
export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';

export const addUser = user => ({ type: ADD_USER, user });
export const removeUser = userId => ({ type: REMOVE_USER, userId });
export const editUser = user => ({ type: EDIT_USER, user });
export const getUser = user => ({ type: GET_USER, user });
export const getUsers = users => ({ type: GET_USERS, users });
