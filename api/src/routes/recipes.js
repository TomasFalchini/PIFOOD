const { Recipe, Diet } = require("../db.js");
const { Router } = require("express");

const recipesRoute = Router();
const { updateRecipe } = require("../controllers/updateRecipe.js");
const {
  chargeRecipesFromAPI,
} = require("../controllers/chargeRecipesFromAPI.js");
const preChargeDiets = require("../controllers/preChargeDiets.js");
const { findRecipes } = require("../controllers/findRecipes.js");
const { createRecipe } = require("../controllers/createRecipe.js");
const { deleteRecipe } = require("../controllers/deleteRecipe.js");
const { dietsFilter } = require("../controllers/dietsFilter.js");
const { loadData } = require("../controllers/fetchControler.js");

recipesRoute.get("/", async (req, res, next) => {
  const { name } = req.query;
  if (name) {
    try {
      let recipes = await findRecipes(name);
      recipes.length > 0
        ? res.status(200).send(recipes)
        : res.status(404).send([{ name: "Recipe Not Found" }]);
    } catch (err) {
      res.status(404).send({ message: err.message });
    }
  } else next();
});

recipesRoute.get("/", async (req, res, next) => {
  try {
    await preChargeDiets();
    await chargeRecipesFromAPI();
    let recipes = await Recipe.findAll({
      include: Diet,
    });
    return res.status(200).send(recipes);
  } catch (err) {
    console.log(err);
    return res.status(404).send({ message: err.message });
  }
});

recipesRoute.get("/filter", async (req, res, next) => {
  const { diet } = req.query;
  try {
    let recipes = await dietsFilter(diet);
    return res.status(200).send(recipes);
  } catch (err) {
    next(err);
  }
});

recipesRoute.get("/:idReceta", async (req, res, next) => {
  const { idReceta } = req.params;
  try {
    let recipe = await Recipe.findByPk(idReceta, {
      include: Diet,
    });
    res.status(200).send(recipe);
  } catch (err) {
    err.status = 404;
    err.message = "Oops, something went wrong";
    next(err);
  }
});

recipesRoute.post("/create", async (req, res, next) => {
  const { name, resume, healthScore, steps, image, diets } = req.body;
  let concatSteps = steps?.join("***");
  try {
    let recipe = await createRecipe(
      name || null,
      resume || null,
      healthScore,
      concatSteps,
      image,
      diets,
      true
    );
    recipe
      ? res.status(200).send({ message: "The recipe has been created" })
      : next("Something went wrong with the creation of the recipe");
  } catch (err) {
    err.status = 404;
    next(err);
  }
});

recipesRoute.put("/:idReceta/edit", async (req, res, next) => {
  const { idReceta } = req.params;
  const { name, resume, healthScore, steps, image, diets } = req.body;

  try {
    await updateRecipe(
      idReceta,
      name,
      resume,
      healthScore,
      steps,
      image,
      diets
    );
    return res.status(200).send({ message: "The recipe has been updated" });
  } catch (err) {
    err.status = 404;
    next(err);
  }
});

recipesRoute.delete("/:idReceta/delete", async (req, res, next) => {
  const { idReceta } = req.params;
  try {
    await deleteRecipe(idReceta);
    res.status(200).send({ message: "The recipe has been removed" });
  } catch (err) {
    err.status = 404;
    next(err);
  }
});

module.exports = recipesRoute;
