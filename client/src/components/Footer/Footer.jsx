//Componente Footer. Una ruta a About, un link a LinkedIn, otro a github. Mi nombre y el año.

import React from "react";
import { Link } from "react-router-dom";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Link to="/About">About Me</Link>
        <a href="pegarlink">Icono de LinkedIn</a>
        <a href="pegarotrolink">Icono de GitHub</a>
        <span>Tomás Falchini (icono de copyright)</span>
        <span>2022</span>
      </footer>
    );
  }
}

export default Footer;
