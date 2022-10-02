import React from "react";

import { useSelector } from "react-redux";

import RecipeCard from "../Recipe Card/RecipeCard";

import s from "./RecipeCards.module.css";
import cooking from "../../images/undraw_cooking_re_g99p (1).svg";

function RecipeCards() {
  const Recipes = useSelector((state) => state.Recipes);
  console.log(Recipes);
  return (
    <div className={s.ContainerOfCards}>
      <img className={s.cooking} src={cooking} alt="" />
      {Recipes.map((el) => {
        return (
          <RecipeCard
            name={el.name}
            id={el.ID}
            image={el.image}
            diet={el.Diets}
          />
        );
      })}
    </div>
  );
}

export default RecipeCards;
