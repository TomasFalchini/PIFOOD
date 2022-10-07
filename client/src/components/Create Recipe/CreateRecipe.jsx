import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GetAllRecipes } from "../../Redux/actions/index";
import s from "./CreateRecipe.module.css";
import chef from "../../images/undraw_chef_cu-0-r.svg";
import { useNavigate } from "react-router-dom";
import RecipeExample from "../RecipeExample/RecipeExample.jsx";

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
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    console.log(e.target.name);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const addDiets = (e) => {
    if (e.target.value === "hiden") return;
    let diet = new Set([...diets, e.target.value]);
    setDiets((state) => [...diet]);
  };

  const addSteps = (e) => {
    setSteps((steps) => [...steps, inputs.step]);
    setInputs({ ...inputs, step: "" });
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
        alert(response.message);
        navigate(-1);
      });
  };

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
        <label htmlFor="recipename" className={s.form__label}>
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
        <label htmlFor="resume" className={s.form__label}>
          Recipe Resume
        </label>

        <span>0</span>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          name="healthScore"
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
        <label htmlFor="step" className={s.form__label}>
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
        <label htmlFor="image" className={s.form__label}>
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
        <RecipeExample
          resume={Validate(inputs).resume}
          name={Validate(inputs).name}
          healthScore={inputs.healthScore}
          image={Validate(inputs).image}
          steps={steps}
          diets={diets}
          step={Validate(inputs).step}
        />
      </div>
    </div>
  );
}

function Validate(state) {
  const regExpLettersOnly = /^[a-zA-Z\s]*$/gm;
  const regExpLettersOnly1 = /^[a-zA-Z\s]*$/gm;
  const regExpLettersAndNumbers = /^[a-zA-Z0-9./,;?:\s]*$/gm;
  const regExpLettersAndNumbers2 = /^[a-zA-Z0-9./,;?!_:\s?=!-]*$/gm;

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
  /*  <div className={s.RecipeExample}>
    {regExpLettersOnly.test(inputs.name) ? (
      <span>{inputs.name || "Recipe Example"}</span>
    ) : (
      <span className={s.Invalid}>Invalid format</span>
    )}
    {regExpLettersOnly1.test(inputs.resume) ? (
      <span>
        {inputs.resume ||
          "Recipe Resume Example; LLorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nostrum quas molestiae modi, est qui error recusandae amet aliquid reiciendis officia dolorem expedita nisi totam ducimus neque eos provident dolores? "}
      </span>
    ) : (
      <span className={s.Invalid}>Invalid format</span>
    )}

    {steps.length > 0 ? (
      <div className={s.steps}>
        {steps.map((el) => {
          return <p>{el}</p>;
        })}
      </div>
    ) : null}
    {regExpLettersAndNumbers.test(inputs.step) ? (
      <span className={s.stepsi}>{inputs.step}</span>
    ) : (
      <span className={s.Invalid}>Invalid format</span>
    )}
    {regExpLettersAndNumbers2.test(inputs.image) ? (
      <img
        className={s.imgexample}
        src={
          inputs.image ||
          "https://media.istockphoto.com/photos/fried-pork-and-vegetables-on-white-background-picture-id1190330112?k=20&m=1190330112&s=612x612&w=0&h=_TrmthJupdqYmMU-NC-es85TEvaBJsynDS383hqiAvM="
        }
        alt=""
      />
    ) : (
      <span>Invalid format</span>
    )}
    {diets.length > 0 ? (
      <div>
        {diets.map((el) => {
          return <p>{el}</p>;
        })}
      </div>
    ) : null}
  </div>; */
}

export default CreateRecipe;

//hacer renderizado condicional de options con lo q tengo en el store Diets.
