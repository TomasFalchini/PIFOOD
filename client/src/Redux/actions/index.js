import {
  GET_ALL_RECIPES,
  GET_RECIPES,
  GET_DETAILS,
  CHANGE_THEME,
  SORT_BY_ALPHABET,
  SORT_BY_HEALTH_SCORE,
  GET_DIETS,
  SET_PAGE,
  CLEAN_DETAILS,
} from "./actiontypes.js";

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
    dispatch({ type: GET_ALL_RECIPES, payload: data });
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

export const GetDetails = (id) => {
  return async (dispatch) => {
    let response = await fetch(`http://localhost:3001/recipes/${id}`);
    let data = await response.json();
    dispatch({ type: GET_DETAILS, payload: data });
  };
};

export const GetDiets = () => {
  return async (dispatch) => {
    let response = await fetch(`http://localhost:3001/diets`);
    let data = await response.json();
    dispatch({ type: GET_DIETS, payload: data });
  };
};

export const SortByAlphabet = () => {
  return {
    type: SORT_BY_ALPHABET,
    payload: "Alphabet",
  };
};

export const SortByHelathScore = () => {
  return {
    type: SORT_BY_HEALTH_SCORE,
    payload: "Health Score",
  };
};

export const ChangeTheme = () => {
  return {
    type: CHANGE_THEME,
  };
};
export const CleanDetails = () => {
  return {
    type: CLEAN_DETAILS,
  };
};
