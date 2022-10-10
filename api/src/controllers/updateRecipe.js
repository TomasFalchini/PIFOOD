const { Recipe, Diet } = require("../db.js");

async function updateRecipe(
  idReceta,
  name,
  resume,
  health_score,
  steps,
  image,
  diets
) {
  let recipe = await Recipe.findByPk(idReceta, {
    include: Diet,
  });
  await recipe.update({
    name: name,
    resume: resume,
    health_score: health_score,
    steps: steps,
    image: image,
    diets: diets,
  });
}

module.exports = {
  updateRecipe: updateRecipe,
};
