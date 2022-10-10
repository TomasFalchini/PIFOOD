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
} from "../actions/actiontypes";

import sorths from "../../utils/sorths.js";
import sortalph from "../../utils/sortalph";

const initialState = {
  Recipes: [],
  RecipeDetails: {},
  Diets: [],
  Page: 1,
  error: {},
};

export default function Reducer(state = initialState, action) {
  if (action.type === GET_ALL_RECIPES) {
    return { ...state, Recipes: [...action.payload] };
  }
  if (action.type === GET_RECIPES) {
    return { ...state, Recipes: [...action.payload] };
  }
  if (action.type === GET_DETAILS) {
    return { ...state, RecipeDetails: action.payload };
  }
  if (action.type === SORT_BY_ALPHABET) {
    let recipe = sortalph(state, action);
    return { ...state, Recipes: recipe };
  }
  if (action.type === SORT_BY_HEALTH_SCORE) {
    let recipe = sorths(state, action);
    return { ...state, Recipes: recipe };
  }

  if (action.type === GET_DIETS) {
    return { ...state, Diets: action.payload };
  }
  if (action.type === SET_PAGE) {
    return { ...state, Page: action.payload };
  }
  if (action.type === FILTER_BY_DIET) {
    return { ...state, Recipes: action.payload };
  }
  if (action.type === SET_ERROR) {
    return { ...state, error: action.payload };
  }
  if (action.type === CLEAN_ERROR) {
    return { ...state, error: {} };
  }
  if (action.type === DELETE_RECIPE) {
    return {
      ...state,
      Recipes: state.Recipes.filter((el) => el.ID !== action.payload),
    };
  }
  if (action.type === UPDATE_RECIPE) {
  }
  return state;
}
