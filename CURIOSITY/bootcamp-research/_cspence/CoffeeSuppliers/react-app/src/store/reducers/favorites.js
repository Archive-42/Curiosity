import { ADD_FAVORITE, REMOVE_FAVORITE, SET_FAVORITES } from '../actions/favorites';

export default function reducer(state = [], action) {
    let newState = state;

    switch (action.type) {
        case ADD_FAVORITE:
            newState.push(action.productId);
            return newState;
        case REMOVE_FAVORITE:
            newState = newState.filter(fav => fav !== action.productId);
            return newState;
        case SET_FAVORITES:
            newState = action.favoriteIds;
            return newState;
        default:
            return state;
    }
}
