import React from "react";

import { Link } from "react-router-dom";
import s from "./Landing.module.css";

export default class Landing extends React.Component {
  render() {
    return (
      <div className={s.Landing}>
        <div className={s.innerLanding}>
          <h1>FoodApp</h1>
          <h3>CREATE DELICIOUS RECIPES</h3>
          <Link
            to="/home/recipes"
            style={{
              textDecoration: "none",
              color: "white",
              border: "2px solid white",
              padding: "0.5rem",
              margin: "1rem",
            }}
          >
            Get Started
          </Link>
        </div>
      </div>
    );
  }
}
