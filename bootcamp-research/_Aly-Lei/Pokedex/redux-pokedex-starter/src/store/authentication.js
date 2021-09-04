import {baseUrl} from "../config"

const TOKEN_KEY = "non-empty-string";
const SET_TOKEN = 'pokedex/authentication/SET_TOKEN';
const REMOVE_TOKEN = "Remove-my-token-please-and-thankyou"

export const setToken = (token) =>{
    return{
        type: SET_TOKEN,
        tokenProperty: token
    }
}

export const removeToken=()=>{
    return{
        type: REMOVE_TOKEN,
    }
}


export const login = (email, password) => async dispatch => {
    const response = await fetch(`${baseUrl}/session`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password}),
      });
  
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem(TOKEN_KEY, token)
        dispatch(setToken(token))
      }
  }

  export const loadToken = () => async (dispatch) =>{
      const token = localStorage.getItem(TOKEN_KEY);
      dispatch(setToken(token));
  }



  export default function reducer(state = {}, action){
      switch (action.type){
          case SET_TOKEN:{
              return {...state, token: action.tokenProperty}
          }
          case REMOVE_TOKEN:{
                const newState = { ...state };
                delete newState.token;
                return newState;
          }
          default:{
              return state;
          }
      }
  }

  export const logout = () => async (dispatch, getState) =>{
    const { authentication: { token } } = getState();
        const res = await fetch(`${baseUrl}/session`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}`}
        });
        if(res.ok){
            localStorage.clear(TOKEN_KEY);
            dispatch(removeToken())
        }
  }


