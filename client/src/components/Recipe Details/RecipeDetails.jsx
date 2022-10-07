import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetDetails } from "../../Redux/actions/index.js";
import s from "./RecipeDetails.module.css";

function RecipeDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  let navigate = useNavigate();

  const Recipe = useSelector((state) => state.RecipeDetails);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    async function LoadDetails() {
      await dispatch(GetDetails(id));
      setLoaded(true);
    }

    LoadDetails();
  }, []);

  console.log(Recipe.name);

  return (
    <div className={s.ContainerDetails}>
      {loaded ? (
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Back Home
          </button>
          <div className={s.similCard}>
            <h2>{Recipe.name}</h2>
            {Recipe.Diets?.map((el) => (
              <span>{el.name}</span>
            ))}
            <img src={Recipe.image} alt={Recipe.image} />
          </div>
          <p>{Recipe.resume}</p>
          <p>{Recipe.health_score}</p>

          <p>{Recipe.steps}</p>
        </div>
      ) : (
        <p className={s.Loading}>Loading...</p>
      )}
    </div>
  );
}

export default RecipeDetails;
