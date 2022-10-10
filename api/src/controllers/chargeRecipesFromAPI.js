const { createRecipe } = require("../controllers/createRecipe.js");
const { loadData } = require("../controllers/fetchControler.js");
const { Recipe, Diet } = require("../db.js");

module.exports = {
  chargeRecipesFromAPI: async function () {
    let recipes = await Recipe.findAll({
      include: Diet,
    });
    if (recipes.length < 100) {
      let array = await loadData();
      let array2 = [];
      for (let i = 0; i < array.length; i++) {
        let { name, resume, health_score, steps, image, Diets } = array[i];
        array2.push(
          createRecipe(name, resume, health_score, steps, image, Diets)
        );
      }
      await Promise.all(array2);
    }
  },
};
