const { Recipe, Diet } = require("../db.js");
const { Op } = require("sequelize");

async function updateRecipe(idReceta, name, image, diets) {
  console.log(name, diets);
  let recipe = await Recipe.findByPk(idReceta);
  await recipe.update({
    name: name,
    image: image,
  });
  if (diets?.length > 0) {
    let diet = await Diet.findAll({
      where: {
        name: {
          [Op.like]: { [Op.any]: diets },
        },
      },
    });
    await recipe.setDiets(diet);
  }
}

module.exports = {
  updateRecipe: updateRecipe,
};
