import React from "react";
import { useEffect, useRef } from "react";
import { setPage } from "../../Redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import s from "./Page.module.css";

export default function Pages({ quantity }) {
  const actual = useSelector((state) => state.Page);
  const dispatch = useDispatch();
  const q = useRef(quantity);

  useEffect(() => {
    if (q.current !== quantity) {
      dispatch(setPage(1));
    }
  }, [quantity, dispatch]);

  function handleOnClick(e) {
    dispatch(setPage(Number(e.target.value)));
  }
  function handlePrevious(e) {
    dispatch(setPage(actual - 1));
  }
  function handleNext(e) {
    dispatch(setPage(actual + 1));
  }

  function setButtons(q) {
    let array = [];
    for (let i = 1; i <= q; i++) {
      array.push(
        <button
          key={i}
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
        {actual === Math.ceil(quantity / 9) || quantity === 0 ? null : (
          <button className={s.prevornext} onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
