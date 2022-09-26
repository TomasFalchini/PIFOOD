const { Recipes, Diets } = require("./db.js");
const { Router } = require("express");
const { API_KEY } = process.env;

const recipesRoute = Router();

recipesRoute.get("/", async (req, res, next) => {
  const { name } = req.query;
  let recipe = await Recipes.findAll({
    where: {
      name: name,
    },
  });
  recipe ? res.status(200).send(recipe) : res.status(404).send("No existe");
});

/* 
Obtener el detalle de una receta en particular
Debe traer solo los datos pedidos en la ruta de detalle de receta
Incluir los tipos de dieta asociados
*/

recipesRoute.get("/:idReceta", async (req, res, next) => {
  const { idReceta } = req.params;
  let recipe = await Recipes.findByPk(idReceta);
  await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true&`
  );
});

recipesRoute.post("/", (req, res, next) => {
  const { destructurarAcaLoQueMandePorForm } = req.body;
});

module.exports = recipesRoute;
