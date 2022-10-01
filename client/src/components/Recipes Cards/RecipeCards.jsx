import React from "react";

import { useSelector } from "react-redux";

import RecipeCard from "../Recipe Card/RecipeCard";

function RecipeCards() {
  const Recipes = useSelector((state) => state.Recipes);
  console.log(Recipes);
  return (
    <div>
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
