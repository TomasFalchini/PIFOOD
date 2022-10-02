import React from "react";
import { connect } from "react-redux";
import { ChangeTheme, GetRecipes } from "../../Redux/actions/index.js";
import s from "./SearchBar.module.css";
import lupa from "../../images/lupita.svg";

/* Componente searchbar. Armar la lógica. Diseño bien simple. Un rectángulo bordes redondeados de input con un placeholder que sea un icono más una lupita, un botón de submit. Investigar funcionalidad de evento de teclado ctrl+k. Y para el enter. Q sea posición fixed para q me quede sobre la nav bar. O ver si puedo hacer renderizado condicional por ruta. Este va a tener un estado local para guardarme lo q escriba en el input y dsps mandárselo al back. */

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.getRecipes(this.state);
    this.setState({ input: "" });
  };

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  render() {
    return (
      <div className={s.SearchBar}>
        <input
          className={s.textInput}
          type="text"
          placeholder="Search a recipe..."
          value={this.state.input}
          onChange={(e) => {
            this.handleChange(e);
          }}
        />
        <label
          className={s.submit}
          onClick={(e) => {
            this.handleSearch(e);
          }}
        >
          <img className={s.lupa} src={lupa} alt="" />
        </label>
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    DarkTheme: state.DarkTheme,
    Recipes: state.Recipes,
  };
}

export const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    setTheme: () => dispatch(ChangeTheme()),
    getRecipes: (name) => dispatch(GetRecipes(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
