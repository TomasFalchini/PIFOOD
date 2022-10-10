const { Recipe, Diet } = require("../db.js");
const { Op } = require("sequelize");

module.exports = {
  dietsFilter: async function dietsFilter(diet) {
    let recipes = await Recipe.findAll({
      include: {
        model: Diet,
        where: {
          name: {
            [Op.iLike]: `%${diet}%`,
          },
        },
      },
    });
    return recipes;
  },
};
