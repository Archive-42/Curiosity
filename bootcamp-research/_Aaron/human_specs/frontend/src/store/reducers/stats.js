import {
  SET_TYPING,
  SET_REACTION,
  SET_MEMORY,
  REMOVE_STATS,
} from "../actions/stats";

const initialState = { user: null };
const statsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_TYPING:
      newState = Object.assign({}, state);
      newState.user = { ...newState.user, typing: action.payload };
      return newState;
    case SET_REACTION:
      newState = Object.assign({}, state);
      newState.user = { ...newState.user, reaction: action.payload };
      return newState;
    case SET_MEMORY:
      newState = Object.assign({}, state);
      newState.user = { ...newState.user, memory: action.payload };
      return newState;
    case REMOVE_STATS:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default statsReducer;
