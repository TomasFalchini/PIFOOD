const { Recipes, Diets } = require("./db.js");
const { Router } = require("express");

const dietsRoute = Router();

dietsRoute.get("/", (req, res, next) => {
  //precargar en la data base los tipos de dieta ya definidos, dsps ir agregando los otros
});

module.exports = dietsRoute;
