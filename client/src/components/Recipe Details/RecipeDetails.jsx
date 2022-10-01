import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GetDetails, CleanDetails } from "../../Redux/actions/index.js";

function RecipeDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const Recipe = useSelector((state) => state.RecipeDetails);
  const Loading = useSelector((state) => state.Loading);
  const [loaded, setLoaded] = useState(Loading);

  useEffect(() => {
    if (!Recipe.name) {
      dispatch(GetDetails(id));
      setLoaded(Loading);
    }
  }, [loaded]);

  console.log(Recipe.name);

  return (
    <div className="Details">
      {Recipe.name ? (
        <div>
          <h3>{Recipe.name} Hola juan carlos</h3>
          <img src={Recipe.image} alt={Recipe.image} />
          <p>{Recipe.resume}</p>
          <span>{Recipe.health_score}</span>
          {Recipe.Diets?.map((el) => (
            <span>{el.name}</span>
          ))}
          <p>{Recipe.steps}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default RecipeDetails;
