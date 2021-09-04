import { baseUrl } from '../../config';

export const TOKEN_KEY = 'token';
export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const CURRENTLY_LOGGED_IN = 'CURRENTLY_LOGGED_IN';

export const removeToken = () => ({ type: REMOVE_TOKEN });
export const setToken = (token, user) => ({ type: SET_TOKEN, token, user });
export const getLoggedIn = (token, user) => ({ type: CURRENTLY_LOGGED_IN, token, user });

export const login = (email, password) => async dispatch => {
  const response = await fetch(`${baseUrl}/users/token`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (response.ok) {
    const { token, user } = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem('userId', user.id);
    window.localStorage.setItem('user', JSON.stringify(user));
    await dispatch(setToken(token, user));
    return null;
  } else {
    const { error: { errors } } = await response.json();
    return errors;
  }
};

export const signup = (userInfo) => async dispatch => {
  const response = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
  });

  if (response.ok) {
    const { token, newUser } = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem('userId', newUser.id);
    window.localStorage.setItem('user', JSON.stringify(newUser));
    await dispatch(setToken(token, newUser));
    return null;
  } else {
    const { error: { errors } } = await response.json();
    return errors;
  }
};

export const logout = () => async (dispatch, getState) => {
  const {
    authentication: { token }
  } = getState();
  const response = await fetch(`${baseUrl}/users/token`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (response.ok) {
    window.localStorage.removeItem(TOKEN_KEY);
    await dispatch(removeToken());
  }
};

export const loadCurrentUser = () => (dispatch) => {
  if (window.localStorage.getItem('token')) {
    const token = window.localStorage.getItem(TOKEN_KEY);
    const user = JSON.parse(window.localStorage.getItem('user'));
    dispatch(getLoggedIn(token, user));
  }
};

export const reloadCurrentUser = () => async (dispatch, getState) => {
  const {
    authentication: {
      currentUser: { id }
    }
  } = getState();
  const response = await fetch(`${baseUrl}/users/token/loggedin`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  });
  if (response.ok) {
    const { token, user } = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem('userId', user.id);
    window.localStorage.setItem('user', JSON.stringify(user));
    await dispatch(setToken(token, user));
  }
};