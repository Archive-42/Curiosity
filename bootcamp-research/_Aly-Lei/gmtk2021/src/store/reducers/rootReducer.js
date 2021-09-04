import { combineReducers } from "redux";

import active from './activeReducer'
import npcs from "./npcsReducer";
import potions from "./potionsReducer";
import ailments from "./ailmentsReducer";
import ingredients from './ingredientsReducer'

const appReducer = combineReducers({
  active,
  npcs,
  ingredients,
  ailments,
  potions,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
