import React from "react";

import { Link } from "react-router-dom";
import s from "./RecipeCard.module.css";

function RecipeCard({ name, id, image, diet }) {
  const styles = {
    textDecoration: "none",
  };
  console.log(diet);
  return (
    <div className={s.Card}>
      <div className={s.Text}>
        <Link style={styles} to={`/home/${id}`}>
          <div>
            <h4>{name.toUpperCase()}</h4>
            <div>
              {diet?.map((el) => (
                <p>{el.name.toUpperCase()}</p>
              ))}
            </div>
          </div>
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
