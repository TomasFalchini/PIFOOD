import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import s from "./Page.module.css";

export default function Pages() {
  const Recipes = useSelector((state) => state.Recipes);
  const [quantity, setQuantity] = useState(Math.ceil(Recipes.length / 9));
  const [actual, setActual] = useState(1);

  useEffect(() => {
    setQuantity(Math.ceil(Recipes.length / 9));
  }, [Recipes.length]);

  function handleOnClick(e) {
    setActual(e.target.value);
  }
  function handlePrevious(e) {
    setActual((state) => state - 1);
  }
  function handleNext(e) {
    setActual((state) => state + 1);
  }

  function setButtons(q) {
    let array = [];
    for (let i = 1; i <= q; i++) {
      array.push(<button onClick={handleOnClick}>i</button>);
    }
    return array;
  }

  return (
    <div className={s.Container}>
      {actual === 1 && quantity > 1 ? null : (
        <button onClick={handlePrevious}>Prev</button>
      )}
      {quantity > 1 ? setButtons(quantity) : null}
      {actual === quantity ? null : <button onClick={handleNext}>Next</button>}
    </div>
  );
}
