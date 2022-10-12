import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllRecipes, GetDiets } from "../../Redux/actions/index";
import s from "./CreateRecipe.module.css";
import chef from "../../images/undraw_chef_cu-0-r.svg";
import { useNavigate } from "react-router-dom";
import RecipeExample from "../RecipeExample/RecipeExample.jsx";
import Validate from "../../utils/Validate.js";
import handlePost from "../../utils/handlePost.js";

function CreateRecipe() {
  const diet = useSelector((state) => state.Diets);
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

  useEffect(() => {
    dispatch(GetDiets());
  }, []);

  const handleOnChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const addDiets = (e) => {
    if (e.target.value === "hiden") return;
    let diet = new Set([...diets, e.target.value]);
    setDiets([...diet]);
  };

  const addSteps = (e) => {
    setSteps((steps) => [
      ...steps,
      `Step Number ${steps.length + 1}: ${inputs.step}`,
    ]);
    setInputs({ ...inputs, step: "" });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handlePost(inputs, steps, diets).then((res) => {
      dispatch(GetAllRecipes());
      alert(res.message);
      navigate(-1);
    });
  };

  return (
    <div className={s.boxcontainer}>
      <img src={chef} alt="" className={s.chef} />
      <form autoComplete="off" onSubmit={handleOnSubmit}>
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
        <div className={s.health}>
          <span className={s.cero}>0</span>
          <input
            className={s.range}
            type="range"
            min="0"
            max="100"
            step="1"
            name="healthScore"
            onChange={handleOnChange}
            value={inputs.healthScore}
          />
          <span className={s.onehundred}>100</span>
        </div>
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
          {diet.map((el) => {
            return <option value={el.name}>{el.name}</option>;
          })}
        </select>

        <input
          className={s.submit}
          disabled={
            !inputs.name ||
            !inputs.resume ||
            Validate(inputs).name === "Invalid format" ||
            Validate(inputs).resume === "Invalid format"
          }
          type="submit"
          value="Create"
        />
      </form>
      <button
        className={s.addstep}
        disabled={!inputs.step || Validate(inputs).step === "Step not valid"}
        onClick={addSteps}
      >
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

export default CreateRecipe;
