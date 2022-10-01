import React from "react";

import { Link } from "react-router-dom";

function RecipeCard({ name, id, image, diet }) {
  return (
    <div>
      <h4>{name.toUpperCase()}</h4>
      <img src={image} alt={image} />
      <p>{diet.map((el) => el.name.toUpperCase())}</p>
      <Link to={`/home/${id}`}>See Details</Link>
    </div>
  );
}

export default RecipeCard;
