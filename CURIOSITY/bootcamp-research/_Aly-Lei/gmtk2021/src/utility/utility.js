import { potions } from "../data/data";

export const matchRecipes = (ingredients) => {
  const sortedIngredients = ingredients.sort();
  const match = potions.find((recipe) => {
    const ingredients = recipe.ingredients.sort();
    return (
      ingredients.length === sortedIngredients.length &&
      ingredients.every((item, idx) => item === sortedIngredients[idx])
    );
  });
  if (!match) return "smelly-potion"
  return match.id;
};

export function getRandomNpc(npcsData, resolvedNpcIds) {
  const npcs = Object.values(npcsData)

  if (npcs?.length === resolvedNpcIds.length) {
      return null;
  }

  const npcIndex = Math.floor(Math.random() * npcs.length);
  const npc = npcs[npcIndex];

  if (!resolvedNpcIds.includes(npc.id)) {
    return npcs[npcIndex].id
  }
  return getRandomNpc(npcsData, resolvedNpcIds);
}

export function normalizeData(data) {
    const normalized = {}
    data.forEach(item => {
        normalized[item.id] = item
    })
    return normalized
}
