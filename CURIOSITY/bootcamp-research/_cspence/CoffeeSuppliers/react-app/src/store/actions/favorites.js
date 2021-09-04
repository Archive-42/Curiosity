export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const SET_FAVORITES = 'SET_FAVORITES';
export const CLEAR_FAVORITES = 'CLEAR_FAVORITES';

export const addFavorite = productId => ({ type: ADD_FAVORITE, productId });
export const removeFavorite = productId => ({ type: REMOVE_FAVORITE, productId });
export const setFavorites = favoriteIds => ({ type: SET_FAVORITES, favoriteIds });
export const clearFavorites = () => ({ type: CLEAR_FAVORITES });

export const addFavoriteThunk = (userId, productId) => async dispatch => {
    let favorite = await fetch(`/api/users/${userId}/favorites`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
    });
    if (favorite.ok) {
        favorite = await favorite.json();
        await dispatch(addFavorite(favorite.productId));
    }
};

export const removeFavoriteThunk = (userId, productId) => async dispatch => {
    let favorite = await fetch(`/api/users/${userId}/favorites`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
    });
    if (favorite.ok) {
        favorite = await favorite.json();
        await dispatch(removeFavorite(favorite.productId));
    }
};

export const setFavoritesThunk = userId => async dispatch => {
    let favorites = await fetch(`/api/users/${userId}/favorites`);
    if (favorites.ok) {
        favorites = await favorites.json();
        await dispatch(setFavorites(favorites.ids));
    }
};
