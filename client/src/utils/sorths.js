export default function sorths(state, action) {
  let recipe = Array.from(state.Recipes);
  if (action.payload[0] === "Low") {
    recipe.sort((a, b) => {
      if (action.payload[1] && a.name[0] !== b.name[0]) return 0;
      return a.health_score - b.health_score;
    });
    return recipe;
  } else if (action.payload[0] === "High") {
    recipe.sort((a, b) => {
      if (action.payload[1] && a.name[0] !== b.name[0]) return 0;
      return b.health_score - a.health_score;
    });
    return recipe;
  }
}
