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
    <div className={s.exampleContainer}>
      <RecipeCard
        name={name || "Recipe Example"}
        id={"create"}
        image={image || defaultImage}
        diet={diets.map((el) => {
          return { name: el };
        })}
      />
      <div className={s.healthScore}>
        <h4
          className={
            healthScore > 75
              ? s.healthy
              : healthScore > 50
              ? s.normal
              : healthScore > 25
              ? s.bad
              : s.nothealthy
          }
        >
          {healthScore}
        </h4>
      </div>
      <p className={s.resume}>{resume || lorem}</p>
      {steps?.map((el, i) => {
        return <p className={s.steps}>{el}</p>;
      })}
      <p className={s.steps}>{step || "Add the next step"}</p>
    </div>
  );
}
