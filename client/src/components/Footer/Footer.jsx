//Componente Footer. Una ruta a About, un link a LinkedIn, otro a github. Mi nombre y el año.

import React from "react";
import { Link } from "react-router-dom";
import s from "./Footer.module.css";
import github from "../../images/github.svg";
import linkedin from "../../images/linkedin.svg";

class Footer extends React.Component {
  render() {
    return (
      <footer className={s.Foot}>
        <Link to="/About">About Me</Link>
        <a href="https://www.linkedin.com/in/tomasfalchini/" target="blank">
          <img src={linkedin} alt="" />{" "}
        </a>
        <a href="https://github.com/TomasFalchini" target="blank">
          <img src={github} alt="" />
        </a>
        <span>Tomás Falchini © 2022</span>
      </footer>
    );
  }
}

export default Footer;
