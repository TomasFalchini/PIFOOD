import Reducer from "../src/Redux/reducer/index.js";
import { data } from "./data.js";
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
} from "../src/Redux/actions/actiontypes.js";

describe("Reducer", () => {
  const initialState = {
    Recipes: [],
    RecipeDetails: {},
    Diets: [],
    Page: 1,
    error: {},
  };

  it("Debería retornar el estado inicial si no se pasa un type válido", () => {
    expect(Reducer(undefined, [])).toEqual({
      Recipes: [],
      RecipeDetails: {},
      Diets: [],
      Page: 1,
      error: {},
    });
  });

  it('Debería guardar en nuestro state las recetas obtenidas de nuestro llamado al back cuando action type es "GET_ALL_RECIPES"', () => {
    const result = Reducer(initialState, {
      type: GET_ALL_RECIPES,
      payload: data.Recipes,
    });

    expect(result).not.toEqual(initialState);
    expect(result).toEqual({
      Recipes: data.Recipes,
      RecipeDetails: {},
      Diets: [],
      Page: 1,
      error: {},
    });
  });

  it('Debería guardar en nuestro state la obtenido de nuestro llamado al back cuando action type es "GET_RECIPES"', () => {
    const result = Reducer(initialState, {
      type: GET_RECIPES,
      payload: data.Recipes[0],
    });
    expect(result).not.toEqual(initialState);
    expect(result).toEqual({
      Recipes: data.Recipes[0],
      RecipeDetails: {},
      Diets: [],
      Page: 1,
      error: {},
    });
  });

  it("Debería setear una nueva pagina cuando actyontype es SET_PAGE", () => {
    const result = Reducer(initialState, {
      type: SET_PAGE,
      payload: 3,
    });
    expect(result).not.toEqual(initialState);
    expect(result).toEqual({
      Recipes: [],
      RecipeDetails: {},
      Diets: [],
      Page: 3,
      error: {},
    });
  });

  it('Debería guardar en nuestro state "DIETS"" la informacion que viene del payload cuando action type es "GET_DIETS"', () => {
    const result = Reducer(initialState, {
      type: GET_DIETS,
      payload: data.Diets,
    });
    expect(result).not.toEqual(initialState);
    expect(result).toEqual({
      Recipes: [],
      RecipeDetails: {},
      Diets: data.Diets,
      Page: 1,
      error: {},
    });
  });
});
