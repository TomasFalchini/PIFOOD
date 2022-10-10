const { Router } = require("express");
const preChargeDiets = require("../controllers/preChargeDiets.js");

const dietsRoute = Router();

dietsRoute.get("/", async (req, res, next) => {
  try {
    let diets = await preChargeDiets();
    res.status(200).send(diets);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

module.exports = dietsRoute;
