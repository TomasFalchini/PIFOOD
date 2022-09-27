const { Recipe, Diet } = require("../db.js");
const { Router } = require("express");
const { Op } = require("sequelize");

const recipesRoute = Router();
const { loadData } = require("../controllers/fetchControler.js");
const preChargeDiets = require("../controllers/preChargeDiets.js");
const { findRecipes } = require("../controllers/findRecipes.js");
const { createRecipe } = require("../controllers/createRecipe.js");

//en ruta principal Imagen
//(imagen, nombre, tipo de plato y tipo de dieta)
//
// EN ruta de detalle imagne Nombre plato dieta health score,resume, steps.

//de todo eso en database tengo guardado nombre dieta health score resume y steps.

//con esta linea me trae todo lo q tenga en la base de datos. si no tengo nada, hago el fetch por primera vez para buscar los datos y guardarlos.

//apikey1 =
// apikey 2= 0c3aa48c3e9d4c7a9c8855e88ea27c40
//si hay algo en database, responder con lo q tengo en database. si es la primera vez q cargo la pagina, hacer el llamado a la api, sino traer lo q esta en database. cuando filtro por name, fijarme de buscar aquella receta tanto en data base como en la api, y responder con eso al front. (todo lo q me traiga de la api guardarlo en data base).
//fijarme q el llamado en get a data base lo haga siempre una vez que ya se cargaron las cosas, cosa q en este get me quede guardado lo q posteo (recetas nuevas) y lo que busque y filtre por nombre tambien. asi no tengo q hacer llamados a la api constantemente.

recipesRoute.get("/", async (req, res, next) => {
  const { name } = req.query;
  if (name) {
    let recipes = await findRecipes(name);
    console.log(recipes);
    recipes.length > 0
      ? res.status(200).send(recipes)
      : res.status(404).send("No existe");
  } else next();
});

recipesRoute.get("/", async (req, res, next) => {
  preChargeDiets();
  let recipes = await Recipe.findAll({
    include: Diet,
  });
  if (recipes.length > 0) {
    return res.status(200).send(recipes);
  }
  let array = await loadData();
  recipes = await Recipe.bulkCreate(array, {
    include: Diet,
  });

  return res.status(200).send(recipes);
});

recipesRoute.get("/:idReceta", async (req, res, next) => {
  const { idReceta } = req.params;
  try {
    let recipe = await Recipe.findByPk(idReceta, {
      include: Diet,
    });
    recipe
      ? res.status(200).send(recipe)
      : res.status(404).send("Recipe Not Found");
  } catch (err) {
    res.status(404).send("Recipe Not Found");
  }
});

recipesRoute.post("/create", async (req, res, next) => {
  const { name, resume, health_score, steps, image, diet } = req.body;
  //diet va a ser un array de lo q seleccione en los selects.
  console.log(name, resume, health_score, steps, image, diet);
  try {
    let recipe = await Recipe.create({
      name: name,
      resume: resume,
      health_score: health_score,
      steps: steps,
      image: image,
    });
    let diets = await Diet.findAll({
      where: {
        name: {
          [Op.like]: { [Op.any]: diet },
        },
      },
    });
    await recipe.setDiets(diets);
    res.status(200).send("Se ha creado la receta con exito!");
  } catch (err) {
    res.status(404).send(err.message);
  }
});
//sacar a controller createRecipe.js

module.exports = recipesRoute;
