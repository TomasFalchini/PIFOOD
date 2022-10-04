import React from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { GetAllRecipes, GetDiets } from "../../Redux/actions/index";
import s from "./Landing.module.css";

/* landing (presentacional, con Link de react router dom), ver el evento on load, para que ya me cargue en la base de datos las recipes. */

export class Landing extends React.Component {
  componentDidMount() {
    this.props.GetAllRecipes().then(() => this.props.GetDiets());
  }

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

export const mapDispatchToProps = (dispatch) => {
  return {
    GetAllRecipes: () => dispatch(GetAllRecipes()),
    GetDiets: () => dispatch(GetDiets()),
    dispatch,
  };
};

export const mapStateToProps = (state) => {
  return {
    Recipes: state.Recipes,
  };
};

export default connect(null, mapDispatchToProps)(Landing);
