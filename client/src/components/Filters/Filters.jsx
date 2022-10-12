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
  const [states, setStates] = useState(() => {
    return {
      alphabetic: "",
      health_score: "",
      diets: "All diets",
    };
  });

  const dispatch = useDispatch();
  function handleReset(e) {
    e.preventDefault();
    dispatch(GetAllRecipes());
    setStates({
      alphabetic: "",
      health_score: "",
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
    (async () => {
      await dispatch(GetAllRecipes());
      if (e.target.value !== "All diets")
        dispatch(FilterByDiets(e.target.value));
      if (states.alphabetic) dispatch(SortByAlphabet(states.alphabetic));
      if (states.health_score)
        dispatch(SortByHelathScore(states.health_score, states.alphabetic));
    })();

    /* (async () => {
      if (e.target.value === "All diets") await dispatch(GetAllRecipes());
      else await dispatch(FilterByDiets(e.target.value));
      if (states.alphabetic) dispatch(SortByAlphabet(states.alphabetic));
      if (states.health_score)
        dispatch(SortByHelathScore(states.health_score, states.alphabetic));
    })(); */
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
        <select onChange={filterByDiets}>
          <option value="All diets">All diets</option>
          <option value="gluten free">Gluten free</option>
          <option value="dairy free">Dairy free</option>
          <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="paleolithic">Paleolithic</option>
          <option value="primal">Primal</option>
          <option value="whole 30">Whole 30</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="fodmap friendly">Fodmap friendly</option>
        </select>
      }
      <button onClick={handleReset}>RESET ALL</button>
    </div>
  );
}

export default Filters;
