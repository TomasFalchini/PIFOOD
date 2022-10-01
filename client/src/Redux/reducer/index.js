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
} from "../actions/actiontypes";

const initialState = {
  Recipes: [],
  RecipeDetails: {},
  Loading: false,
  Diets: [],
  DarkTheme: false,
  SortBy: null,
  Page: 1,
};

export default function Reducer(state = initialState, action) {
  if (action.type === GET_ALL_RECIPES) {
    return { ...state, Recipes: [...action.payload] };
  }
  if (action.type === GET_RECIPES) {
    return { ...state, RecipeDetails: [...action.payload] };
  }
  if (action.type === GET_DETAILS) {
    return { ...state, Recipes: action.payload, Loading: true };
  }
  if (action.type === CHANGE_THEME) {
    return { ...state, DarkTheme: !state.DarkTheme };
  }
  if (action.type === SORT_BY_ALPHABET) {
    return { ...state, SortBy: action.payload };
  }
  if (action.type === SORT_BY_HEALTH_SCORE) {
    return { ...state, SortBy: action.payload };
  }
  if (action.type === GET_DIETS) {
    return { ...state, Diets: action.payload };
  }
  if (action.type === CLEAN_DETAILS) {
    return { ...state, RecipeDetails: [] };
  }
  if (action.type === SET_PAGE) {
    if (action.payload === 1 || action.payload === -1) {
      return { ...state, Page: state.Page + action.payload };
    } else return { ...state, Page: action.payload };
  }
  return state;
}
