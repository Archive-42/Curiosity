import { SET_TOKEN, REMOVE_TOKEN, CURRENTLY_LOGGED_IN } from '../actions/authentication';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token,
        loggedIn: true,
        currentUser: action.user
      };
    }

    case REMOVE_TOKEN: {
      const newState = { ...state };
      newState.token = null;
      newState.loggedIn = false;
      newState.currentUser = {
        firstName: '',
        lastName: '',
        avatar: '',
        createdAt: '',
        Shops: [],
        FavoriteShops: [],
        FavoriteProducts: [],
        Followers: [],
        Following: []
      };
      return newState;
    }

    case CURRENTLY_LOGGED_IN: {
      return {
        ...state,
        token: action.token,
        loggedIn: true,
        currentUser: action.user
      };
    }

    default:
      return state;
  }
}