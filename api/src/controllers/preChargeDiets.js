const { Diet } = require("../db.js");

module.exports = async () => {
  let diets = await Diet.bulkCreate([
    { name: "gluten free" },
    { name: "dairy free" },
    { name: "lacto ovo vegetarian" },
    { name: "ovo vegetarian" },
    { name: "lacto vegetarian" },
    { name: "vegan" },
    { name: "paleolithic" },
    { name: "primal" },
    { name: "whole 30" },
    { name: "pescatarian" },
    { name: "fodmap friendly" },
  ]);
  return diets;
};
