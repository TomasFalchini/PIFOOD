const { concatSteps } = require("./concatSteps.js");
const { Recipe, Diet } = require("../db.js");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { API_KEY, API_KEY2 } = process.env;

async function loadData() {
  let dataFromAPI;
  await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${API_KEY}&number=100`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      dataFromAPI = data.results.map((el) => {
        return {
          name: el.title,
          resume: el.summary,
          health_score: el.healthScore,
          steps: concatSteps(el.analyzedInstructions[0]),
          image: el.image,
          Diets: el.diets.map((diet) => {
            return { name: diet };
          }),
        };
      });
    })
    .catch((err) => console.log(err));
  return dataFromAPI;
}

module.exports = {
  loadData: loadData,
};
