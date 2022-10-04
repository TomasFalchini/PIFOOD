import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GetAllRecipes } from "../../Redux/actions/index";
import s from "./CreateRecipe.module.css";
import chef from "../../images/undraw_chef_cu-0-r.svg";

function CreateRecipe() {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    resume: "",
    name: "",
    healthScore: 50,
    image: "",
    step: "",
  });
  const [steps, setSteps] = useState([]);
  const [diets, setDiets] = useState([]);

  const handleOnChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const addDiets = (e) => {
    setDiets((state) => [...state, e.target.value]);
  };

  const addSteps = (e) => {
    setSteps((steps) => [...steps, inputs.step]);
    e.target.value = "";
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...inputs,
      steps: steps,
      diets: diets,
    };
    fetch("http://localhost:3001/recipes/create", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        dispatch(GetAllRecipes());
      });
  };

  const regExpLettersOnly = /^[a-zA-Z\s]*$/gm;
  const regExpLettersOnly1 = /^[a-zA-Z\s]*$/gm;
  const regExpLettersAndNumbers = /^[a-zA-Z0-9./,;?:\s]*$/gm;
  const regExpLettersAndNumbers2 = /^[a-zA-Z0-9./,;?!_:\s]*$/gm;

  return (
    <div className={s.boxcontainer}>
      <img src={chef} alt="" className={s.chef} />
      <form onSubmit={handleOnSubmit}>
        <input
          id="recipename"
          placeholder="Recipe Name"
          type="text"
          name="name"
          value={inputs.name}
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <label for="recipename" className={s.form__label}>
          Recipe Name
        </label>
        <input
          id="resume"
          placeholder="Recipe Resume"
          type="text"
          onChange={handleOnChange}
          name="resume"
          value={inputs.resume}
        />
        <label for="resume" className={s.form__label}>
          Recipe Resume
        </label>

        <span>0</span>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          onChange={handleOnChange}
          value={inputs.healthScore}
        />
        <span>100</span>
        <input
          id="step"
          type="text"
          onChange={handleOnChange}
          name="step"
          placeholder="Add the next Step"
          value={inputs.step}
        />
        <label for="step" className={s.form__label}>
          Add the next Step
        </label>

        <input
          id="image"
          placeholder="Image URL"
          type="text"
          onChange={handleOnChange}
          name="image"
          value={inputs.image}
        />
        <label for="image" className={s.form__label}>
          Image URL
        </label>

        <select onChange={addDiets}>
          <option value="hiden">-- Diets --</option>
          <option value="gluten free">Gluten free</option>
          <option value="dairy free">dairy free</option>
          <option value="lacto ovo vegetarian">lacto ovo vegetarian</option>
          <option value="vegan">vegan</option>
          <option value="paleolithic">paleolithic</option>
          <option value="primal">primal</option>
          <option value="whole 30">whole 30</option>
          <option value="pescatarian">pescatarian</option>
          <option value="fodmap friendly">fodmap friendly</option>
        </select>

        <input
          disabled={!inputs.name || !inputs.resume}
          type="submit"
          value="Create"
        />
      </form>
      <button disabled={!inputs.step} onClick={addSteps}>
        Add step
      </button>
      <div className={s.RecipeExample}>
        {regExpLettersOnly.test(inputs.name) ? null : (
          <span>Invalid format</span>
        )}
        {regExpLettersOnly1.test(inputs.resume) ? null : (
          <span>Invalid format</span>
        )}
        {regExpLettersAndNumbers.test(inputs.step) ? null : (
          <span>Invalid format</span>
        )}
        {steps.length > 0 ? (
          <div>
            {steps.map((el) => {
              return <p>{el}</p>;
            })}
          </div>
        ) : null}
        {regExpLettersAndNumbers2.test(inputs.image) ? null : (
          <span>Invalid format</span>
        )}
        {diets.length > 0 ? (
          <div>
            {diets.map((el) => {
              return <p>{el}</p>;
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CreateRecipe;

//hacer renderizado condicional de options con lo q tengo en el store Diets.
