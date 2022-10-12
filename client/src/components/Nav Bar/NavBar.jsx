//
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import s from "./NavBar.module.css";
import icon5 from "../../images/nav-icon5.png";
import icon7 from "../../images/nav-icon7.png";
import BANNER from "../../images/banner_bg.png";
import one from "../../images/1.png";
import two from "../../images/2.png";
import three from "../../images/3.png";

export default function NavBar() {
  const error = useSelector((state) => state.error);
  const navigate = useNavigate();

  useEffect(() => {
    if (error.hasOwnProperty("message")) {
      navigate("/notfound");
    }
  }, [error, navigate]);

  return (
    <div>
      <img className={s.Banner} src={BANNER} alt="" />
      <img className={s.one} src={one} alt="" />
      <img className={s.two} src={two} alt="" />
      <img className={s.three} src={three} alt="" />
      <nav className={s.NavBarContainerLight}>
        <h3>FoodApp</h3>
        <div className={s.DivMenu}>
          <NavLink
            className={(navData) => (navData.isActive ? "link active" : "link")}
            to="/home/recipes"
          >
            <img className={s.Icons} src={icon7} alt="" />
            <b className={s.redirects}>HOME</b>
          </NavLink>

          <NavLink
            className={(navData) => (navData.isActive ? "link active" : "link")}
            to="/home/create"
          >
            <img className={s.Icons} src={icon5} alt="" />
            <b className={s.redirects}>CREATE</b>
          </NavLink>
        </div>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
