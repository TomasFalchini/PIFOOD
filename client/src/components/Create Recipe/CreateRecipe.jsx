import React from "react";
import { useState } from "react";

function CreateRecipe() {
  const [inputs, setInputs] = useState({
    name: "",
    resume: "",
    healthScore: 50,
    image: "",
  });
  const [steps, setSteps] = useState([]);
  const [diets, setDiets] = useState([]);

  const handleOnChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const addDiets = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setDiets(values);
  };

  const addSteps = (e) => {
    setSteps(steps.push(e.target.value));
    e.target.value = "";
  };

  return (
    <div className="CreateRecipe">
      <form action="">
        <input
          type="text"
          name="name"
          value={inputs.name}
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <input
          type="text"
          onChange={handleOnChange}
          name="resume"
          value={inputs.resume}
        />
        <input
          type="range"
          onChange={handleOnChange}
          value={inputs.healthScore}
        />
        <input
          type="text"
          onChange={addSteps}
          value=""
          placeholder="Add the next Step"
        />
        <input
          type="text"
          onChange={handleOnChange}
          name="image"
          value={inputs.image}
        />
        <select onChange={addDiets} multiple={true} value={diets}>
          <options value="Vegan">Vegan</options>
          <options></options>
          <options></options>
          <options></options>
          <options></options>
          <options></options>
          <options></options>
          <options></options>
          <options></options>
          <options></options>
          <options></options>
        </select>
      </form>
    </div>
  );
}

export default CreateRecipe;

//hacer renderizado condicional de options con lo q tengo en el store Diets.
