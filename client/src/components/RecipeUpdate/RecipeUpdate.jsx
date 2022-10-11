import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RecipeCard from "../Recipe Card/RecipeCard.jsx";
import s from "./RecipeUpdate.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { GetAllRecipes } from "../../Redux/actions/index.js";

export default function RecipeUpdate() {
  const location = useLocation();
  const { name, id, image, diet } = location.state;
  const dispatch = useDispatch();

  const [initialState, setState] = useState({
    name,
    image,
  });

  const [diets, setDiets] = useState(diet.map((el) => el.name));

  const navigate = useNavigate();

  function handleOnChange(e) {
    setState({ ...initialState, [e.target.name]: e.target.value });
  }

  const addDiets = (e) => {
    if (e.target.value === "hiden") return;
    if (diets.includes(e.target.value))
      setDiets(diets.filter((el) => el !== e.target.value));
    else setDiets((state) => [...state, e.target.value]);
  };

  function handleOnSubmit(e) {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/recipes/${id}/edit`, {
        ...initialState,
        diets,
      })
      .then((response) => {
        window.alert(response.data.message);
        dispatch(GetAllRecipes());
        navigate(-1);
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  }

  return (
    <div className={s.ContainerUpdate}>
      <form className={s.forms} onSubmit={handleOnSubmit}>
        <input
          className={s.inputs}
          type="text"
          onChange={handleOnChange}
          name="name"
          value={initialState.name}
        />
        <input
          className={s.inputs}
          type="text"
          onChange={handleOnChange}
          name="image"
          value={initialState.image}
        />
        <select className={s.selects} onChange={addDiets}>
          <option value="hiden">-- Add or Remove Diets --</option>
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
        <input className={s.Update} type="submit" value="UPDATE" />
      </form>
      <div className={s.RecipeCardUpdated}>
        <RecipeCard
          name={initialState.name}
          id={"create"}
          image={initialState.image}
          diet={diets.map((el) => {
            return { name: el };
          })}
        />
      </div>
    </div>
  );
}
