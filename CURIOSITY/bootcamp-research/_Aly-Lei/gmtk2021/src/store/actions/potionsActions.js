import { addResults } from "../reducers/resultReducer";
import { saveRecipe, saveNpc } from "../reducers/saveReducer";

export const updateSaveLog = ({potion, npc}) => async (dispatch) => {
  await saveRecipe(potion);
  saveNpc(npc);

  // return dispatch(addResults(potion));
};
