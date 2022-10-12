const { concatSteps } = require("./concatSteps.js");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { API_KEY, API_KEY2, API_KEY3 } = process.env;

async function loadData() {
  let dataFromAPI;
  await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${API_KEY3}&number=100&offset=250`
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
          Diets: el.diets,
        };
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
  return dataFromAPI;
}

module.exports = {
  loadData: loadData,
};
