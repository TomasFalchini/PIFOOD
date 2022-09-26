const { Recipes, Diets } = require("./db.js");
const { Router } = require("express");

const dietsRoute = Router();

const types = [
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Lacto-Vegetarian",
  "Ovo-Vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleo",
  "Primal",
  "Low FODMAP",
  "Whole30",
];

dietsRoute.get("/", async (req, res, next) => {
  //precargar en la data base los tipos de dieta ya definidos, dsps ir agregando los otros
  let diets = await Diets.findAll();

  res.status(200).send(diets);
});

module.exports = dietsRoute;
