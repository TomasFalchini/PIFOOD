const { Recipes, Diets } = require("./db.js");
const { Router } = require("express");

const recipesRoute = Router();

recipesRoute.get("/", (req, res, next) => {
  const { name } = req.query;
});

recipesRoute.get("/:idReceta", (req, res, next) => {
  const { idReceta } = req.params;
});

recipesRoute.post("/", (req, res, next) => {
  const { destructurarAcaLoQueMandePorForm } = req.body;
});

module.exports = recipesRoute;
