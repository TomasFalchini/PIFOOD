import React from "react";

import { useSelector, useDispatch } from "react-redux";

import RecipeCard from "../Recipe Card/RecipeCard";
import Filters from "../Filters/Filters";

import s from "./RecipeCards.module.css";
import cooking from "../../images/undraw_cooking_re_g99p (1).svg";
import { useEffect, useState } from "react";
import { GetAllRecipes, GetDiets } from "../../Redux/actions/index.js";
import Page from "../Page/Page.jsx";

function RecipeCards() {
  let Recipes = useSelector((state) => state.Recipes);
  let Diets = useSelector((state) => state.Diets);
  let actualPage = useSelector((state) => state.Page);

  let dispatch = useDispatch();

  console.log(actualPage);

  useEffect(() => {
    if (!Diets[0]) {
      console.log("entre aca");
      dispatch(GetAllRecipes());
      dispatch(GetDiets());
    }
  }, [Diets, actualPage]);

  return (
    <div className={s.ContainerOfCards}>
      <Filters />
      {Recipes[0] ? null : <span>Loading...</span>}
      <img className={s.cooking} src={cooking} alt="" />
      {Recipes.map((el) => {
        return (
          <RecipeCard
            key={el.ID}
            name={el.name}
            id={el.ID}
            image={el.image}
            diet={el.Diets}
          />
        );
      }).slice(9 * (actualPage - 1), 9 * actualPage)}
      <Page quantity={Recipes.length} />
    </div>
  );
}

export default RecipeCards;
