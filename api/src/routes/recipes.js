const { Recipes, Diets } = require("./db.js");
const { Router } = require("express");
const e = require("express");
const { API_KEY } = process.env;

const recipesRoute = Router();

//en ruta principal Imagen
//(imagen, nombre, tipo de plato y tipo de dieta)
//
// EN ruta de detalle imagne Nombre plato dieta health score,resume, steps.

//de todo eso en database tengo guardado nombre dieta health score resume y steps.
/* 
name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      resume: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      health_score: {
        type: DataTypes.INTEGER,
      },
      steps: {
        type: DataTypes.TEXT,
      },
      ID: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      image: {
*/

recipesRoute.get("/", async (req, res, next) => {
  let array = [];
  // cuando aprenda lo de cookie parser, agergar lo de math random etc
  await fetch(
    `https://api.spoonacular.com/recipes/complexSearch&addRecipeInformation=true&apiKey=${API_KEY}&number=100`
  )
    .then((res) => res.json())
    .then(async (data) => {
      array = data["results"].map((el) =>
        Recipes.create({
          name: el.title,
          resume: el.summary,
          health_score: el.healthScore,
          steps: concatSteps(el.analyzedInstructions[0]),
          image: el.image,
        })
      );
      await Promise.all(array);
    })
    .catch((err) => console.log(err));
});

//sacar a controler:

function concatSteps(instructions) {
  let stepbystep = instructions["steps"]?.map((el) => {
    let ingredients = el.ingredients?.map((el) => el.name).join(" ");
    `Step Number ${el.number}:
    Ingredients: ${ingredients}\n
    ${el.step}`;
  });
  return stepbystep.join("\r\n");
}

recipesRoute.get("/", async (req, res, next) => {
  const { name } = req.query;
  let recipe = await Recipes.findAll({
    where: {
      name: name,
    },
    include: Diets,
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

recipesRoute.post("/create", async (req, res, next) => {
  const { name, resume, health_score, steps, image, diet } = req.body;
  let recipe = await Recipes.create({
    name: name,
    resume: resume,
    health_score: health_score,
    steps: steps,
    image: image,
  });
  let diets = await Diets.create({
    name: diet,
  });
  recipe.setDiets(diets);
});

module.exports = recipesRoute;
