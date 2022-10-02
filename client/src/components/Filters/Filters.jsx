//
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import s from "./Filters.module.css";

function Filters() {
  const diets = useSelector((state) => state.Diets);
  const [states, setStates] = useState({});

  function handleOnClick(e) {}

  return (
    <div className={s.filters}>
      {
        <select>
          <option selected={true} value="A-z">
            A-z
          </option>
          <option value="Z-a">Z-a</option>
        </select>
        /*  Botones/Opciones para filtrar por por tipo de dieta
[ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por health score (nivel de comida saludable). 
boton de reseteo de filtros
boton de reseteo de busqueda
*/
      }
      {
        <select>
          <option selected={true}>Lower Health Score</option>
          <option>Higher Health Score</option>
        </select>
      }
      {
        <select multiple={true}>
          {diets.map((el) => {
            return <option value={el}>{el}</option>;
          })}
        </select>
      }
      <button onClick={handleOnClick}>RESET ALL</button>
    </div>
  );
}

export default Filters;
