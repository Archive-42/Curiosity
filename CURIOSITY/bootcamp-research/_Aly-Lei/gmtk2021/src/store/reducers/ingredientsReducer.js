const LOAD_INGREDIENTS = "LOAD_INGREDIENTS";

export const loadIngredients = (data) => ({
  type: LOAD_INGREDIENTS,
  data,
});

export default function ingredientsReducer(state = {}, action) {
  switch (action.type) {

    case LOAD_INGREDIENTS: {
      return action.data;
    }
    default: {
      return state;
    }
  }
}
