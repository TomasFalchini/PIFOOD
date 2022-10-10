const { Recipe } = require("../db.js");

async function deleteRecipe(idReceta) {
  let recipe = await Recipe.findByPk(idReceta);
  await recipe.destroy();
}

module.exports = {
  deleteRecipe: deleteRecipe,
};
