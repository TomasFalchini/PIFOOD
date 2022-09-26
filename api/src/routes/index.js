const { Router } = require("express");
const recipesRoute = require("./recipes");
const dietsRoute = require("./diets");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use("/recipes", recipesRoute);
router.use("/diets", dietsRoute);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
