const LOAD_ALL_ACTIVE = "LOAD_ALL_ACTIVE";
const UPDATE_NPC = "UPDATE_NPC"
const CLEAR_ALL_ACTIVE = "CLEAR_ALL_ACTIVE"
const UPDATE_INGREDIENTS = "UPDATE_INGREDIENTS"
const ADD_INGREDIENT = "ADD_INGREDIENT"
const CLEAR_INGREDIENT = "CLEAR_INGREDIENT"
const CLEAR_INGREDIENTS = "CLEAR_INGREDIENTS"
const UPDATE_POTION = "UPDATE_POTION"
const CLEAR_POTION = "CLEAR_POTION"
const INCREMENT_COUNT = "INCREMENT_COUNT"

export const loadAllActive = (data) => ({ type: LOAD_ALL_ACTIVE, data,});
export const clearAllActive = (data) => ({type: CLEAR_ALL_ACTIVE, data})
export const updateNpc = (data) => ({type: UPDATE_NPC, data})
export const updateIngredients = (data) => ({type: UPDATE_INGREDIENTS, data})
export const clearIngredients = (data) => ({type: CLEAR_INGREDIENTS, data})
export const addIngredient = (data) => ({type: ADD_INGREDIENT, data})
export const clearIngredient = (data) => ({type: CLEAR_INGREDIENT, data})
export const updatePotion = (data) => ({type: UPDATE_POTION, data})
export const clearPotion = (data) => ({type: CLEAR_POTION, data})
export const incrementCount = (countType) => ({type: INCREMENT_COUNT, countType})

const initialState = {
  npc: "",
  ailment: "",
  ingredients: [],
  potion: "",
  count: {
    requestsFulfilled: 0,
    potionsDiscovered: 0,
    potionsBrewed: 0,
  }
}

export default function activeReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_ACTIVE: 
      return {...state, ...action.data};

    case CLEAR_ALL_ACTIVE:
      return initialState;

    case INCREMENT_COUNT:
      const newCount = state.count[action.countType] ? state.count[action.countType] + 1 : 1;
      return {...state, count: {...state.count, [action.countType]: newCount } };

    case UPDATE_NPC: 
      return {...state, npc: action.data};

    case UPDATE_INGREDIENTS:
      return {...state, ingredients: action.data}

    case CLEAR_INGREDIENTS:
      return {...state, ingredients: []}

    case ADD_INGREDIENT: 
      return {...state, ingredients: [...state.ingredients, action.data]};

      // TODO: This is a hot mess. Using 'UPDATE_INGREDIENTS' for now.
    case CLEAR_INGREDIENT:
      const idx = state.ingredients.indexOf(action.data)
      const newIngredients = [ ...state.ingredients.slice(0,idx), ...state.ingredients.slice(idx+1, state.ingredients-1) ]
      return {...state, ingredients: newIngredients};

    case UPDATE_POTION:
      return {...state, potion: action.data};

    case CLEAR_POTION:
      return {...state, potion: ""};

    default: {
      return state;
    }
  }
}
