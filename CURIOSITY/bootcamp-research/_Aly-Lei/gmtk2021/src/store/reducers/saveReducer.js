import { get } from "lodash";

export const loadRecipeBook = () => {
//   const savedSession = localStorage.getItem("RecipeBook");
//   if (!savedSession) {
//     return localStorage.setItem("RecipeBook", JSON.stringify({}));
//   }
//   const saveData = JSON.parse(savedSession);
//   return saveData;
};

export const saveRecipe = (result) => {
  // if (!result) return {};
  // const recipeBook = loadRecipeBook();
  // const recipeToUpdate = get(recipeBook, result.id, undefined);
  // if (!recipeToUpdate) {
  //   recipeBook[result.id] = {
  //     ...result,
  //     date: new Date().toISOString().slice(0, 10),
  //     count: 1,
  //   };
  // } else {
  //   recipeBook[result.id].count += 1;
  // }
  // localStorage.setItem("RecipeBook", JSON.stringify(recipeBook));
};

export const loadResolvedNpcs = () => {
  const savedSession = localStorage.getItem("ResolvedNPCs");
  if (!savedSession) {
    return localStorage.setItem("ResolvedNPCs", JSON.stringify({}));
  }
  const saveData = JSON.parse(savedSession);
  return saveData;
};

export const saveNpc = (result) => {
  if (!result) return {};
  const npc = loadResolvedNpcs();
  const npcToUpdate = get(npc, result.id, undefined);
  if (!npcToUpdate) {
    npc[result.id] = {
      ...result,
      date: new Date().toISOString().slice(0, 10),
      count: 1,
    };
  } else {
    npc[result.id].count += 1;
  }

  localStorage.setItem("ResolvedNPCs", JSON.stringify(npc));
}

export const clearData = () => {
  localStorage.setItem("RecipeBook", JSON.stringify({}));
  localStorage.setItem("ResolvedNPCs", JSON.stringify({}));
}

export default function saveReducer(state = {}, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
