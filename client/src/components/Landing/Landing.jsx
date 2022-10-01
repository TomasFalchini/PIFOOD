import React from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { GetAllRecipes, GetDiets } from "../../Redux/actions/index";

/* landing (presentacional, con Link de react router dom), ver el evento on load, para que ya me cargue en la base de datos las recipes. */

export class Landing extends React.Component {
  componentDidMount() {
    this.props.GetAllRecipes();
  }

  render() {
    return (
      <div className="Landing">
        <Link to="/home/recipes">start!</Link>
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
