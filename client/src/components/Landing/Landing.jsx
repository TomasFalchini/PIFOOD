import React from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { GetAllRecipes, GetDiets } from "../../Redux/actions/index.js";

/* landing (presentacional, con Link de react router dom), ver el evento on load, para que ya me cargue en la base de datos las recipes. */

class Landing extends React.Component {
  componentDidMount() {
    this.GetAllRecipes();
    this.GetDiets();
  }

  render() {
    return (
      <div className="Landing">
        <Link to="/recipes">start!</Link>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    GetAllRecipes: () => dispatch(GetAllRecipes()),
    GetDiets: () => dispatch(GetDiets()),
  };
}

connect(null, mapDispatchToProps)(Landing);

export default Landing;
