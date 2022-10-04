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

  let dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(Diets);
    if (!Diets[0]) {
      dispatch(GetAllRecipes());
      dispatch(GetDiets());
    }
  }, [dispatch, Diets]);

  useEffect(() => {
    console.log("entre aca");
    setLoading(false);
    if (Recipes[0]) {
      setLoading(true);
    }
  }, [Recipes]);

  return (
    <div className={s.ContainerOfCards}>
      <Filters />
      {/* {loading ? null : <span>Loading...</span>} */}
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
      })}
      <Page />
    </div>
  );
}

export default RecipeCards;
