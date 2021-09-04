import { baseUrl } from "../config";



const LOAD = "pokedex/pokemon/LOAD";
const SET_CURRENT = "I WANT TO LOAD SOME DETAILS ON A POKEMON";
const GET_POKEMON_TYPES = "GET_POKEMON_TYPES";

export const load = (list) =>{
    return{
        type: LOAD,
        list
    }
}

const setCurrent = (current) =>{
    return {
        type: SET_CURRENT,
        current
    }
}

const getTypes = (types) =>{
    return {
        type: GET_POKEMON_TYPES,
        pokemonTypes: types
    }
}


export const findPokemon = (id) => async (dispatch, getState) =>{
    const {authentication: {token}} = getState();
    const response = await fetch(`${baseUrl}/pokemon/${id}`, {
        headers: { Authorization: `Bearer ${token}`}
    });
    if (response.ok) {
        const pokemonDetail = await response.json();
        dispatch(setCurrent(pokemonDetail))
    }
}


export const getPokemon = () => async (dispatch, getState) => {
    const { authentication: { token } } = getState();
    const response = await fetch(`${baseUrl}/pokemon`, {
        headers: { Authorization: `Bearer ${token}`}
      });
      if (response.ok) {
        const pokemon = await response.json();
        dispatch(load(pokemon))
      } else{
          console.error("Did get stuff")
      }
    // Handle response
  };



export default (state = {}, action) =>{
    switch(action.type){
        case LOAD:{
            return {...state, list: action.list}
        }
        case SET_CURRENT:{
            return {...state, current: action.current}
        }
        case GET_POKEMON_TYPES:{
            return {...state, pokemonTypes: action.pokemonTypes}
        }
        default: return state;
    }
}


export const getPokemonTypesThunk = () => async(dispatch, getState) =>{
    const { authentication: { token } } = getState();
    const response = await fetch(`${baseUrl}/pokemon/types`, {
        headers: { Authorization: `Bearer ${token}`},
      });
      if (response.ok) {
        const types = await response.json();
        dispatch(getTypes(types))
      }
    }


export const addPokemonThunk = (pokemon) => async(dispatch, getState)=>{
    const {authentication: {token}} = getState();
    const response = await fetch(`${baseUrl}/pokemon`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',},
        body: JSON.stringify(pokemon)
    });
    if(response.ok){
        getPokemon()(dispatch, getState)
    }
}


