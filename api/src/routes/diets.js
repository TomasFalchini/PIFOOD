const { Recipe, Diet } = require("../db.js");
const { Router } = require("express");
const preChargeDiets = require("../controllers/preChargeDiets.js");

const dietsRoute = Router();

dietsRoute.get("/", async (req, res, next) => {
  let diets = await preChargeDiets();
  res.status(200).send(diets);
});

module.exports = dietsRoute;
