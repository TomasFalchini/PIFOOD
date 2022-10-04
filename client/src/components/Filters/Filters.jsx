//
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  GetAllRecipes,
  SortByAlphabet,
  SortByHelathScore,
  FilterByDiets,
} from "../../Redux/actions/index";
import s from "./Filters.module.css";

function Filters() {
  const [states, setStates] = useState({
    alphabetic: "",
    health_score: "",
    diets: "All diets", //array
  });
  const dispatch = useDispatch();

  function handleReset(e) {
    e.preventDefault();
    dispatch(GetAllRecipes());
    setStates({
      alphabetic: "",
      health_score: "",
      diets: "All diets", //array
    });
  }

  function handleChangeSortA(e) {
    e.preventDefault();
    if (e.target.value !== "hide") {
      setStates({ ...states, alphabetic: e.target.value });
      dispatch(SortByAlphabet(e.target.value));
    }
  }

  function handleChangeSortB(e) {
    e.preventDefault();
    if (e.target.value !== "hide") {
      setStates({ ...states, health_score: e.target.value });
      dispatch(SortByHelathScore(e.target.value, states.alphabetic));
    }
  }

  function filterByDiets(e) {
    e.preventDefault();
    setStates({ ...states, diets: e.target.value });
    if (e.target.value === "All diets") return dispatch(GetAllRecipes()); //ver como combinar esto con todos los demas ordenamientos
    dispatch(FilterByDiets(e.target.value));
  }

  return (
    <div className={s.filters}>
      <select value={states.alphabetic} onChange={handleChangeSortA}>
        <option value="hide">Name</option>
        <option value="A-z">A-z</option>
        <option value="Z-a">Z-a</option>
      </select>

      <select value={states.health_score} onChange={handleChangeSortB}>
        <option value="hide">Health Score</option>
        <option value="Low">Lower</option>
        <option value="High">Higher</option>
      </select>

      {
        <select value={states.diets} onChange={filterByDiets}>
          <option value="All diets">All diets</option>
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
      }
      <button onClick={handleReset}>RESET ALL</button>
    </div>
  );
}

export default Filters;
