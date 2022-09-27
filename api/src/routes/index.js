const { Router } = require("express");
const recipesRoute = require("./recipes");
const dietsRoute = require("./diets");
const { Recipe, Diet } = require("../db.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use("/recipes", recipesRoute);
router.use("/diets", dietsRoute);

router.get("/", async (req, res, next) => {
  res.status(200).end();
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
