export const fetchAllPokemon = () => {
    return $.ajax({
        method: 'GET',
        url: '/api/pokemon'
    });
}

export const fetchPokemonById = (id) => {
    return $.ajax({
        method: 'GET',
        url: `/api/pokemon/${id}`
    });
}

export const createPokemon = (pokemon) => {
    return $.ajax({
        method: 'POST',
        url: '/api/pokemon',
        data: { pokemon }
    })
}