function concatSteps(instructions) {
  if (instructions) {
    let stepbystep = instructions.steps.map((el) => {
      let ingredients = el.ingredients?.map((el) => el.name);
      return `Step Number ${el.number}***Ingredients:,${ingredients}***${el.step}***`;
    });

    return stepbystep.join("");
  }

  return;
}

module.exports = {
  concatSteps: concatSteps,
};
