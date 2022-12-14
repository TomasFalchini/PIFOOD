const { Diet } = require("../db.js");

module.exports = async () => {
  let diets = await Diet.findAll();
  if (diets.length < 1) {
    diets = await Diet.bulkCreate([
      { name: "gluten free" },
      { name: "dairy free" },
      { name: "lacto ovo vegetarian" },
      { name: "vegan" },
      { name: "paleolithic" },
      { name: "primal" },
      { name: "whole 30" },
      { name: "pescatarian" },
      { name: "fodmap friendly" },
    ]);
  }
  return diets;
};
