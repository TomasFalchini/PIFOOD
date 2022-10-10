import gif from "../../images/cooking.gif";
import React from "react";
import s from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={s.Loading}>
      <img className={s.gif} src={gif} alt="" />
      <h5 className={s.text}>Loading...</h5>
    </div>
  );
}
