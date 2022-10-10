import React from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import s from "./RecipeCard.module.css";
import { DeleteRecipe } from "../../Redux/actions/index.js";

function RecipeCard({ name, id, image, diet, created }) {
  const styles = {
    textDecoration: "none",
  };
  console.log(name, id, image);

  const dispatch = useDispatch();

  async function deleteRecipe(e) {
    e.preventDefault();
    dispatch(DeleteRecipe(id));
  }

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
      {created ? (
        <Link
          style={styles}
          to={`/home/${id}/edit`}
          state={{ name, id, image }}
        >
          Edit
        </Link>
      ) : null}
      {created ? <button onClick={deleteRecipe}>Delete</button> : null}
    </div>
  );
}

export default RecipeCard;
