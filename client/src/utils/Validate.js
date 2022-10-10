export default function Validate(state) {
  const regExpLettersOnly = /^[a-zA-Z\s]*$/gm;
  const regExpLettersOnly1 = /^[a-zA-Z./,.;\s]*$/gm;
  const regExpLettersAndNumbers = /^[a-zA-Z0-9./,;?:\s]*$/gm;
  const regExpLettersAndNumbers2 = /^[a-zA-Z0-9./,;?%#&!_:\s?=!-]*$/gm;

  const example = {
    name: regExpLettersOnly.test(state.name) ? state.name : "Invalid format",
    resume: regExpLettersOnly1.test(state.resume)
      ? state.resume
      : "Invalid format",
    image: regExpLettersAndNumbers2.test(state.image)
      ? state.image
      : "Invalid URL",
    step: regExpLettersAndNumbers.test(state.step)
      ? state.step
      : "Step not valid",
  };

  return example;
}
