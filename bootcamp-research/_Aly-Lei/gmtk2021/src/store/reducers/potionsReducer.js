const LOAD_POTIONS = "LOAD_POTIONS";
const ADD_POTION = "ADD_POTION";

export const addPotion = (data) => ({
  type: ADD_POTION,
  data,
});

export const loadPotions = (data) => ({
  type: LOAD_POTIONS,
  data,
});

export default function potionsReducer(state = {}, action) {
  switch (action.type) {

    case LOAD_POTIONS: 
      return action.data;


    case ADD_POTION: 
      return {...state, [action.data.id]: action.data};
    
    default: 
      return state;
    
  }
}
