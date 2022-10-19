import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetAllRecipes } from "../../Redux/actions/index.js";
import RecipeCard from "../Recipe Card/RecipeCard";
import Filters from "../Filters/Filters";
import Page from "../Page/Page.jsx";
import RecipeNotFound from "../Recipe Not Found (404)/RecipeNotFound";
import Loading from "../Loading/Loading";
import cooking from "../../images/undraw_cooking_re_g99p (1).svg";
import s from "./RecipeCards.module.css";
import { useSpring, animated } from "react-spring";

function RecipeCards() {
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 100,
  });

  let Recipes = useSelector((state) => state.Recipes);
  let actualPage = useSelector((state) => state.Page);

  let dispatch = useDispatch();

  useEffect(() => {
    if (!Recipes[0]) {
      dispatch(GetAllRecipes());
    }
  }, []);

  useEffect(() => {
    return function cleanUp() {
      Recipes = [];
    };
  });

  return (
    <animated.div style={props}>
      <div className={s.ContainerOfCards}>
        <Filters />
        {Recipes[0] ? null : <Loading />}
        <img className={s.cooking} src={cooking} alt="" />
        {Recipes.length
          ? Recipes.map((el) => {
              if (el.name === "Recipe Not Found") {
                return (
                  <div>
                    <RecipeNotFound />
                  </div>
                );
              }
              return (
                <RecipeCard
                  key={el.ID}
                  name={el.name}
                  id={el.ID}
                  image={el.image}
                  diet={el.Diets}
                  created={el.created}
                />
              );
            }).slice(9 * (actualPage - 1), 9 * actualPage)
          : null}
        <Page quantity={Recipes.length} />
      </div>
    </animated.div>
  );
}

export default RecipeCards;
