import React from "react";
import { connect } from "react-redux";
import { ChangeTheme, GetRecipes } from "../../Redux/actions/index.js";

/* Componente searchbar. Armar la lógica. Diseño bien simple. Un rectángulo bordes redondeados de input con un placeholder que sea un icono más una lupita, un botón de submit. Investigar funcionalidad de evento de teclado ctrl+k. Y para el enter. Q sea posición fixed para q me quede sobre la nav bar. O ver si puedo hacer renderizado condicional por ruta. Este va a tener un estado local para guardarme lo q escriba en el input y dsps mandárselo al back. */

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: null,
    };
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.getRecipes(this.state);
    this.setState({ input: null });
  };

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  render() {
    return (
      <div
        className={
          this.props.DarkTheme ? "Search-Bar-Dark" : "Search-Bar-Light"
        }
      >
        <input
          type="text"
          placeholder="Search a recipe (lupita)"
          value={this.state.input}
          onChange={(e) => {
            this.handleChange(e);
          }}
        />
        <button
          onClick={(e) => {
            this.handleSearch(e);
          }}
        >
          Search
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    DarkTheme: state.DarkTheme,
    Recipes: state.Recipes,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    setTheme: () => dispatch(ChangeTheme()),
    getRecipes: (name) => dispatch(GetRecipes(name)),
  };
};

connect(mapStateToProps, mapDispatchToProps)(SearchBar);
