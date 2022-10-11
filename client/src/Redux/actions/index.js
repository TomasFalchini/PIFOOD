import {
  GET_ALL_RECIPES,
  GET_RECIPES,
  GET_DETAILS,
  SORT_BY_ALPHABET,
  SORT_BY_HEALTH_SCORE,
  GET_DIETS,
  SET_PAGE,
  FILTER_BY_DIET,
  SET_ERROR,
  CLEAN_ERROR,
  DELETE_RECIPE,
  UPDATE_RECIPE,
} from "./actiontypes.js";

import axios from "axios";

export const setPage = (number) => {
  return {
    type: SET_PAGE,
    payload: number,
  };
};

export function GetAllRecipes() {
  return async function (dispatch) {
    let response = await fetch("http://localhost:3001/recipes");
    let data = await response.json();
    if (response.status > 400) dispatch({ type: SET_ERROR, payload: data });
    else dispatch({ type: GET_ALL_RECIPES, payload: data });
  };
}

export const GetRecipes = (name) => {
  return async (dispatch) => {
    let response = await fetch(
      `http://localhost:3001/recipes?name=${name.input}`
    );
    let data = await response.json();
    dispatch({ type: GET_RECIPES, payload: data });
  };
};
/* export const GetRecipes = (name) => {
  return (dispatch) => {
    fetch(
      `http://localhost:3001/recipes?name=${name.input}`
    ).then((data)=> data.json()).then((response)=>{
    dispatch({type: GET_RECIPES, payload: response})
    })

    axios.get("path").then(data => dispatch({type.... payload:data}))
  };
}; */

export const GetDetails = (id) => {
  return async (dispatch) => {
    let response = await fetch(`http://localhost:3001/recipes/${id}`);
    let data = await response.json();
    if (response.status > 400) dispatch({ type: SET_ERROR, payload: data });
    else dispatch({ type: GET_DETAILS, payload: data });
  };
};

export const GetDiets = () => {
  return async (dispatch) => {
    let response = await fetch(`http://localhost:3001/diets`);
    let data = await response.json();
    if (response.status > 400) dispatch({ type: SET_ERROR, payload: data });
    else dispatch({ type: GET_DIETS, payload: data });
  };
};

export const SortByAlphabet = (sort) => {
  return {
    type: SORT_BY_ALPHABET,
    payload: sort,
  };
};

export const SortByHelathScore = (sort, alph) => {
  return {
    type: SORT_BY_HEALTH_SCORE,
    payload: [sort, alph],
  };
};

export const FilterByDiets = (diet) => {
  return {
    type: FILTER_BY_DIET,
    payload: diet,
  };
  /*  return async (dispatch) => {
    let response = await fetch(
      `http://localhost:3001/recipes/filter?diet=${diet}`
    );
    let data = await response.json();
    if (response.status > 400) dispatch({ type: SET_ERROR, payload: data });
    else
      dispatch({
        type: FILTER_BY_DIET,
        payload: data,
      });
  }; */
};

export const CleanError = () => {
  return {
    type: CLEAN_ERROR,
  };
};

export const DeleteRecipe = (id) => {
  return async (dispatch) => {
    let response = await fetch(`http://localhost:3001/recipes/${id}/delete`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = response.json();
    if (response.status > 400) dispatch({ type: SET_ERROR, payload: data });
    else dispatch({ type: DELETE_RECIPE, payload: id });
  };
};

export const UpdateRecipe = () => {
  return;
};
