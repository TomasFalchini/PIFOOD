//
import React from "react";
import { NavLink, Link, Routes, Route, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChangeTheme } from "../../Redux/actions/index.js";
import SearchBar from "../Search Bar/SearchBar.jsx";
//Ver nav bar. Varios links a distintas rutas. Armar lo q va a tener. Va a tener el search bar, un botón a home, un botón a diets, un botón a create recipes, un botón de theme dark White.

import s from "./NavBar.module.css";
import icon5 from "../../images/nav-icon5.png";
import icon7 from "../../images/nav-icon7.png";
import BANNER from "../../images/banner_bg.png";

export default function NavBar() {
  const dispatch = useDispatch();
  const DarkTheme = useSelector((state) => state.DarkTheme);

  function turnOn() {
    dispatch(ChangeTheme());
  }

  return (
    <div>
      <img className={s.Banner} src={BANNER} alt="" />
      <nav className={s.NavBarContainerLight}>
        <h3>FoodApp</h3>
        <div className={s.DivMenu}>
          <NavLink
            className={(navData) => (navData.isActive ? "link active" : "link")}
            to="/home/recipes"
          >
            <img className={s.Icons} src={icon7} alt="" /> HOME
          </NavLink>

          <NavLink
            className={(navData) => (navData.isActive ? "link active" : "link")}
            to="/home/create"
          >
            <img className={s.Icons} src={icon5} alt="" /> CREATE
          </NavLink>
        </div>
        {/* <button onClick={turnOn}>On / Off</button> */}
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
