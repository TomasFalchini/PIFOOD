import {
  GET_ALL_RECIPES,
  GET_RECIPES,
  GET_DETAILS,
  CHANGE_THEME,
  SORT_BY_ALPHABET,
  SORT_BY_HEALTH_SCORE,
  GET_DIETS,
  SET_PAGE,
} from "../actions/actiontypes";

const initialState = {
  Recipes: [],
  RecipeDetails: [],
  Diets: [],
  DarkTheme: false,
  SortBy: null,
  Page: 1,
};

export default function Reducer(state = initialState, action) {
  if (action === GET_ALL_RECIPES) {
    return { ...state, Recipes: [...action.payload] };
  }
  if (action === GET_RECIPES) {
  }
  if (action === GET_DETAILS) {
    return { ...state, Recipes: [...action.payload] };
  }
  if (action === CHANGE_THEME) {
    return { ...state, DarkTheme: !state.DarkTheme };
  }
  if (action === SORT_BY_ALPHABET) {
    return { ...state, SortBy: action.payload };
  }
  if (action === SORT_BY_HEALTH_SCORE) {
    return { ...state, SortBy: action.payload };
  }
  if (action === GET_DIETS) {
    return { ...state, Diets: action.payload };
  }
  if (action === SET_PAGE) {
    if (action.payload === 1 || action.payload === -1) {
      return { ...state, Page: state.Page + action.payload };
    } else return { ...state, Page: action.payload };
  }
  return state;
}
