import React from "react";
import { useState } from "react";
import { setPage } from "../../Redux/actions/index.js";
import { useDispatch } from "react-redux";

import s from "./Page.module.css";
import { useEffect } from "react";

/* 
quiero renderizar de 9 en 9, 
el estado quantity va a estar en Cards y se lo paso por props a este. en realidad ni siquiera es un estado, sino q es Recipes.length que tengo en RecipeCards.
esa quantity el math.ceil es la cantidad de paginas q tengo q poder mostrar, con los botones de prev y de next. (estos ultimos dos con renderizado condicional dependiendo de la pagina en la q estoy.)
un estado en este componente q me vaya diciendo cual es la pagina actual. eso se lo tengo q pasar al componente padre para q me vaya mostrando cuales renderizar (del 9*(actual-1) al 9*actual -1 )

*/

export default function Pages({ quantity }) {
  const [actual, setActual] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("entre");
    setActual(1);
    dispatch(setPage(1));
  }, [quantity]);

  function handleOnClick(e) {
    setActual(Number(e.target.value));
    dispatch(setPage(Number(e.target.value)));
  }
  function handlePrevious(e) {
    setActual((state) => state - 1);
    dispatch(setPage(actual - 1));
  }
  function handleNext(e) {
    setActual((state) => state + 1);
    dispatch(setPage(actual + 1));
  }

  function setButtons(q) {
    let array = [];
    for (let i = 1; i <= q; i++) {
      array.push(
        <button
          className={actual === i ? s.active : null}
          value={i}
          onClick={handleOnClick}
        >
          {i}
        </button>
      );
    }
    return array;
  }

  return (
    <div className={s.forCentrate}>
      <div className={s.Container}>
        {actual === 1 ? null : (
          <button className={s.prevornext} onClick={handlePrevious}>
            Prev
          </button>
        )}
        {quantity > 8 ? setButtons(Math.ceil(quantity / 9)) : null}
        {actual === Math.ceil(quantity / 9) ? null : (
          <button className={s.prevornext} onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
