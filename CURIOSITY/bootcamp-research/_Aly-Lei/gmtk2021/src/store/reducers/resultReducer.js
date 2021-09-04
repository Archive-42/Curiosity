const LOAD_RESULTS = "LOAD_RESULTS";
const ADD_RESULTS = "ADD_RESULTS";

export const addResults = (data) => ({
  type: ADD_RESULTS,
  data,
});

export const loadResults = (data) => ({
  type: LOAD_RESULTS,
  data,
});

export default function resultReducer(state = {}, action) {
  switch (action.type) {
    case ADD_RESULTS: {
      return action.data;
    }
    default: {
      return state;
    }
  }
}
