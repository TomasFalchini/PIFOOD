import React from "react";
import plato from "../../images/slider-img4.png";
import s from "./RecipeNotFound.module.css";

export default function RecipeNotFound() {
  return (
    <div className={s.NotFound}>
      <h1 className={s.child}>4</h1>
      <img src={plato} alt="" />
      <h1 className={s.child2}>4</h1>
      <p>RECIPE NOT FOUND</p>
      <p>Please, use the Search Box again or use the Reset Button</p>
    </div>
  );
}
