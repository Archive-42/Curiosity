import { baseUrl } from "../config";

const POKEMON_DETAIL = "I WANT TO LOAD SOME DETAILS ON A POKEMON";

const setPokemon = (pokemonDetails) =>{
    return {
        type: POKEMON_DETAIL,
        pokemonDetails
    }
}

export const pokemonDetailReducer = (state = {}, action) =>{
    switch (action.type){
        case POKEMON_DETAIL:{
            return {...action.pokemonDetails}
        }
        default:
            return state;
    }
    
}

export const findPokemon = (id) => async (dispatch, getState) =>{
    const {authentication: {token}} = getState();
    const response = await fetch(`${baseUrl}/pokemon/${id}`, {
        headers: { Authorization: `Bearer ${token}`}
    });
    if (response.ok) {
        const pokemonDetail = await response.json();
        dispatch(setPokemon(pokemonDetail))
    }
}