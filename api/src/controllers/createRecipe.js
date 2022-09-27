const { Op } = require("sequelize");
const { Recipe, Diet } = require("../db.js");

async function createRecipe(name, resume, health_score, steps, image, diet) {
  let recipe = await Recipe.create({
    name: name,
    resume: resume,
    health_score: health_score,
    steps: steps,
    image: image,
  });
  if (diet.length > 0) {
    let diets = await Diet.findAll({
      where: {
        name: {
          [Op.like]: { [Op.any]: diet },
        },
      },
    });
    await recipe.setDiets(diets);
  }

  return recipe;
}

module.exports = {
  createRecipe: createRecipe,
};
