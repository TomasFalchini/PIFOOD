//
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChangeTheme } from "../../Redux/actions/index.js";

//Ver nav bar. Varios links a distintas rutas. Armar lo q va a tener. Va a tener el search bar, un botón a home, un botón a diets, un botón a create recipes, un botón de theme dark White.

export default function NavBar() {
  const dispatch = useDispatch();
  const DarkTheme = useSelector((state) => state.DarkTheme);

  function turnOn() {
    dispatch(ChangeTheme());
  }

  return (
    <div
      className={DarkTheme ? "NavBar-Container-Dark" : "NavBar-Container-Light"}
    >
      <Link to="/recipes">Home</Link>
      <Link to="/diets">Diets</Link>
      <Link to="/recipes/create">Create Recipe</Link>
      <button onClick={turnOn}>On / Off</button>
    </div>
  );
}
