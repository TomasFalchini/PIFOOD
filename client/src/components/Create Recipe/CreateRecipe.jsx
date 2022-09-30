import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function CreateRecipe() {
  const [inputs, setInputs] = useState({
    name: "",
    resume: "",
    healthScore: 50,
    image: "",
  });
  const [steps, setSteps] = useState([]);
  const [diets, setDiets] = useState([]);

  const DIETS = useSelector((state) => state.Diets);

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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    fetch
      .post("http://localhost:3001/recipes/create")
      .then((res) => res.json())
      .then((response) => {
        console.alert(response);
      });
  };

  const regExpLettersOnly = /^[a-zA-Z\s]*$/gm;

  const regExpLettersAndNumbers = /^[a-zA-Z0-9.,;:\s]*$/gm;

  return (
    <div className="CreateRecipe">
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="name"
          value={inputs.name}
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        {regExpLettersOnly.test(inputs.name) ? null : (
          <span className="Warning">Letters only</span>
        )}
        <input
          type="text"
          onChange={handleOnChange}
          name="resume"
          value={inputs.resume}
        />
        {regExpLettersOnly.test(inputs.resume) ? null : (
          <span className="Warning">Letters only</span>
        )}
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
        {regExpLettersAndNumbers.test(inputs.steps) ? null : (
          <span className="Warning">Letters and Numbers only</span>
        )}
        {steps.length > 0 ? (
          <div>
            {steps.map((el) => {
              return <p>{el}</p>;
            })}
          </div>
        ) : null}
        <input
          type="text"
          onChange={handleOnChange}
          name="image"
          value={inputs.image}
        />
        <select onChange={addDiets} multiple={true} value={diets}>
          {DIETS.map((el) => {
            return <options value={el}>{el}</options>;
          })}
        </select>
        <input
          disabled={
            !inputs.name ||
            !inputs.resume ||
            !regExpLettersOnly.test(inputs.name) ||
            !regExpLettersOnly.test(inputs.resume) ||
            !regExpLettersAndNumbers.test(inputs.steps)
          }
          type="submit"
        />
      </form>
    </div>
  );
}

export default CreateRecipe;

//hacer renderizado condicional de options con lo q tengo en el store Diets.
