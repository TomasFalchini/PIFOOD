import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetDetails, ClearDetails } from "../../Redux/actions/index.js";
import s from "./RecipeDetails.module.css";
import Loading from "../Loading/Loading";
import { useSpring, animated } from "react-spring";

function RecipeDetails() {
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 100,
  });
  const dispatch = useDispatch();
  const { id } = useParams();

  const Recipe = useSelector((state) => state.RecipeDetails);

  useEffect(() => {
    dispatch(GetDetails(id));
    return dispatch(ClearDetails());
  }, []);

  return (
    <animated.div style={props}>
      <div className={s.ContainerDetails}>
        {Recipe.name ? (
          <div>
            <div className={s.similCard}>
              <div className={s.title}>
                <h2>{Recipe.name}</h2>
                <p className={s.healthscore}>{Recipe.health_score}</p>
                <div className={s.dietscont}>
                  {Recipe.Diets?.map((el) => (
                    <b className={s.diets}>{el.name.toUpperCase()}</b>
                  ))}
                </div>
              </div>
              <img src={Recipe.image} alt={Recipe.image} />
            </div>
            <h4 className={s.tit}>Resume:</h4>
            <p className={s.resume}>{Recipe.resume?.replace(/<[^>]*>/g, "")}</p>
            <h4 className={s.tit}>Steps:</h4>
            <p className={s.steps}>{Recipe.steps?.replace(/[*]/g, " ")}</p>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </animated.div>
  );
}

export default RecipeDetails;
