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
  FILTER_BY_DIET,
} from "../actions/actiontypes";

const initialState = {
  Recipes: [],
  RecipeDetails: {},
  Diets: [],
  Page: 1,
};

export default function Reducer(state = initialState, action) {
  console.log("entre al reducer");
  if (action.type === GET_ALL_RECIPES) {
    return { ...state, Recipes: [...action.payload] };
  }
  if (action.type === GET_RECIPES) {
    console.log(action.payload);
    return { ...state, Recipes: [...action.payload] };
  }
  if (action.type === GET_DETAILS) {
    console.log("hago esto 3");
    return { ...state, RecipeDetails: action.payload };
  }
  if (action.type === CHANGE_THEME) {
    return { ...state, DarkTheme: !state.DarkTheme };
  }
  if (action.type === SORT_BY_ALPHABET) {
    let recipe = Array.from(state.Recipes);
    if (action.payload === "A-z") {
      recipe.sort((a, b) => a.name.localeCompare(b.name));
      console.log(recipe);
      return { ...state, Recipes: recipe };
    } else if (action.payload === "Z-a") {
      recipe.sort((a, b) => a.name.localeCompare(b.name) * -1);
      return { ...state, Recipes: recipe };
    }
  }
  if (action.type === SORT_BY_HEALTH_SCORE) {
    let recipe = Array.from(state.Recipes);
    //tiene que saber si ya se uso el otro filtro y poder combinarlo;
    //si ya se uso comparar las primeras letras iguales primero luego num
    //si no se uso directamente comparar num
    if (!action.payload[1]) {
      if (action.payload[0] === "Low") {
        recipe.sort((a, b) => a.health_score - b.health_score);
        console.log(recipe);
        return {
          ...state,
          Recipes: recipe,
        };
      } else if (action.payload[0] === "High") {
        recipe.sort((a, b) => b.health_score - a.health_score);
        return { ...state, Recipes: recipe };
      }
    } else {
      if (action.payload[0] === "Low") {
        recipe.sort((a, b) => {
          if (a.name[0] !== b.name[0]) return 0;
          return a.health_score - b.health_score;
        });
        console.log(recipe);
        return { ...state, Recipes: recipe };
      } else if (action.payload[0] === "High") {
        recipe.sort((a, b) => {
          if (a.name[0] !== b.name[0]) return 0;
          return b.health_score - a.health_score;
        });
        return { ...state, Recipes: recipe };
      }
    }
  }
  if (action.type === GET_DIETS) {
    return { ...state, Diets: action.payload };
  }
  if (action.type === CLEAN_DETAILS) {
    return { ...state, RecipeDetails: [] };
  }
  if (action.type === SET_PAGE) {
    return { ...state, Page: action.payload };
  }
  if (action.type === FILTER_BY_DIET) {
    return { ...state, Recipes: action.payload };
  }
  return state;
}
