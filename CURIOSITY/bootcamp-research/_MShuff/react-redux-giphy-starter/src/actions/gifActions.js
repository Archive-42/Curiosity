// TODO: Import all of your importing your API util function
import * as APIUtil from '../util/apiUtil';
// TODO: Set and export a constant for your`RECEIVE_GIFS` action type
export const RECEIVE_GIFS = 'RECEIVE_GIFS';

// TODO: Write a function that returns your `action` object literal
const receiveGifs = gifs => (
  {
    type: RECEIVE_GIFS,
    gifs,
  }
);
// TODO: Write a thunk action creator
export const fetchGifs = searchTerm => dispatch => (
  APIUtil.fetchGifs(searchTerm)
    .then(res => res.json())
    .then(res => dispatch(receiveGifs(res.data)))
);
