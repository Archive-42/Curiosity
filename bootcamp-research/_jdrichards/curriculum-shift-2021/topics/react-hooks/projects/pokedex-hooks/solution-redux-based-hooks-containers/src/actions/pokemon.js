import { baseUrl } from '../config';

export const HIDE_FORM = 'HIDE_FORM';
export const LOAD = 'LOAD';
export const LOAD_TYPES = 'LOAD_TYPES';
export const SET_CURRENT = 'SET_CURRENT';
export const SHOW_FORM = 'SHOW_FORM';

export const hideForm = () => ({
  type: HIDE_FORM,
});

export const showForm = () => ({
  type: SHOW_FORM,
});

const load = list => ({
  type: LOAD,
  list,
});

const loadTypes = types => ({
  type: LOAD_TYPES,
  types,
});

const setCurrent = current => ({
  type: SET_CURRENT,
  current,
});

export const createPokemon = data => async (dispatch, getState) => {
  const { authentication: { token } } = getState();
  const response = await fetch(`${baseUrl}/pokemon`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    dispatch(hideForm());
    dispatch(getPokemon());
  }
};

export const getOnePokemon = id => async (dispatch, getState) => {
  const { authentication: { token } } = getState();
  const response = await fetch(`${baseUrl}/pokemon/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const current = await response.json();
    dispatch(setCurrent(current));
  }
};

export const getPokemon = () => async (dispatch, getState) => {
  const { authentication: { token } } = getState();
  const response = await fetch(`${baseUrl}/pokemon`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const getPokemonTypes = () => async (dispatch, getState) => {
  const { authentication: { token } } = getState();
  const response = await fetch(`${baseUrl}/pokemon/types`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const list = await response.json();
    dispatch(loadTypes(list));
  }
};
