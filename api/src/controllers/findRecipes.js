const { Recipe, Diet } = require("../db.js");
const { Op } = require("sequelize");

module.exports = {
  findRecipes: async (query) => {
    console.log(query);
    let recipes = await Recipe.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`,
        },
      },
      include: Diet,
    });
    return recipes;
  },
};
