import { baseApiUrl } from '../config';

const TOKEN_KEY = 'authentication/TOKEN_KEY';
const SET_TOKEN = 'authentication/SET_TOKEN';
const REMOVE_TOKEN = 'authentication/REMOVE_TOKEN';

export const removeToken = () => ({ type: REMOVE_TOKEN });
export const setToken = token => ({ type: SET_TOKEN, token });

export const loadToken = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  if (token) {
    dispatch(setToken(token));
  }
};


export const signUp = user => async dispatch => {
  const response = await fetch(`${baseApiUrl}/users`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    const { token } = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    dispatch(setToken(token));
  }
}


export const login = (username, password) => async dispatch => {
  const response = await fetch(`${baseApiUrl}/session`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  
  if (response.ok) {
    const token = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    dispatch(setToken(token));
  }
};


export const logout = () => async dispatch => {
  console.log('LOGOUT!!!!!!!!!!!')
  window.localStorage.removeItem(TOKEN_KEY);
  dispatch(removeToken());
}


export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }

    case REMOVE_TOKEN: {
      const newState = { ...state };
      delete newState.token;
      return newState;
    }

    default: return state;
  }
}