import React from "react";
import RecipeCard from "../Recipe Card/RecipeCard.jsx";
import s from "./RecipeExample.module.css";

export default function RecipeExample({
  resume,
  name,
  healthScore,
  image,
  steps,
  diets,
  step,
}) {
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus minus recusandae, iste dolore laudantium mollitia sint animi ea aliquam adipisci sit atque nihil sed explicabo. Vitae necessitatibus vel consectetur consequatur?";
  const defaultImage =
    "https://media.self.com/photos/61e9dae8808d098c8ccc3b58/1:1/w_768,c_limit/15-Bean-Soup-Vegetarian.jpg";
  return (
    <div>
      <RecipeCard
        name={name || "Recipe Example"}
        id={"create"}
        image={image || defaultImage}
        diet={diets.map((el) => {
          return { name: el };
        })}
      />
      <h4>{healthScore}</h4>
      <p>{resume || lorem}</p>
      {steps?.map((el) => {
        return <p>{el}</p>;
      })}
      <p>{step || "Add the next step"}</p>
    </div>
  );
}
