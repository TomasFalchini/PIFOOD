import React from "react";
import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

export default function RecipeUpdate() {
  const location = useLocation();
  const { name, id, image } = location.state;
  console.log(name, id, image);
  const [initialState, setState] = useState({
    name,
    image,
  });

  const navigate = useNavigate();

  function handleOnChange(e) {
    setState({ ...initialState, [e.target.name]: e.target.value });
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/recipes/${id}/edit`, initialState)
      .then((response) => {
        window.alert(response);
        navigate(-1);
      });
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          onChange={handleOnChange}
          name="name"
          value={initialState.name}
        />
        <input type="text" onChange={handleOnChange} name="resume" />
        <input type="text" onChange={handleOnChange} name="health_score" />
        <input
          type="text"
          onChange={handleOnChange}
          name="image"
          value={initialState.image}
        />
        <input type="submit" value="UPDATE" />
      </form>
    </div>
  );
}
