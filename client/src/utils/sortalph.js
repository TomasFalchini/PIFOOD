export default function sortalph(state, action) {
  let recipe = Array.from(state.Recipes);
  if (action.payload === "A-z") {
    recipe.sort((a, b) => a.name.localeCompare(b.name));
    return recipe;
  } else if (action.payload === "Z-a") {
    recipe.sort((a, b) => a.name.localeCompare(b.name) * -1);
    return recipe;
  }
}
