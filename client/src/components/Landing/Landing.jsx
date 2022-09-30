import React from "react";
import { Link } from "react-router-dom";

/* landing (presentacional, con Link de react router dom), ver el evento on load, para que ya me cargue en la base de datos las recipes. */

class Landing extends React.Component {
  render() {
    return (
      <div className="Landing">
        <Link to="/recipes">start!</Link>
      </div>
    );
  }
}

export default Landing;
