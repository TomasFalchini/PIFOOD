import React from "react";

import { Link } from "react-router-dom";
import s from "./RecipeCard.module.css";

function RecipeCard({ name, id, image, diet }) {
  return (
    <div className={s.Card}>
      <div className={s.Text}>
        <h4>{name.toUpperCase()}</h4>
        <p>{diet.map((el) => el.name.toUpperCase())}</p>
        <Link to={`/home/${id}`}>See Details</Link>
      </div>
      <div className={s.photo}>
        <img src={image} alt={image} />
      </div>
    </div>
  );
}

export default RecipeCard;
