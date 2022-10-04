import React from "react";

import { Link } from "react-router-dom";
import s from "./RecipeCard.module.css";

function RecipeCard({ name, id, image, diet }) {
  const styles = {
    textDecoration: "none",
  };
  return (
    <div className={s.Card}>
      <div className={s.Text}>
        <Link style={styles} to={`/home/${id}`}>
          <h4>{name.toUpperCase()}</h4>
          <p>{diet.map((el) => el.name.toUpperCase())}</p>
          <span className={s.hidden}>SEE DETAILS</span>
        </Link>
      </div>
      <div className={s.photo}>
        <img src={image} alt={image} />
      </div>
    </div>
  );
}

export default RecipeCard;
