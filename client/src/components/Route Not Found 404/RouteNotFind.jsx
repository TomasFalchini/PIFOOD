import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import notfoundimage from "../../images/not found 404.png";
import s from "./RouteNotFind.module.css";
import { CleanError } from "../../Redux/actions";

export default function NotFound() {
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  function resetError() {
    dispatch(CleanError());
  }

  return (
    <div className={s.cont}>
      <img src={notfoundimage} className={s.background} alt="" />
      <h4 className={s.text}>
        {error.message || "Oops, something went wrong"}
      </h4>
      <h5 className={s.text2}>
        Sorry, we are not able to find what you were looking for
      </h5>
      <label>
        <Link style={{ textDecoration: "none" }} to="/home/recipes">
          <button onClick={resetError} className={s.boton}>
            BACK TO HOME
          </button>
        </Link>
      </label>
    </div>
  );
}
