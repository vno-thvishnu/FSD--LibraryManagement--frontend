import React from "react";
import css from "./Layout.module.scss";
import rack1 from "../assets/rack1.png";
import rack2 from "../assets/rack2.png";
import rack3 from "../assets/rack3.png";
import { Link, Outlet } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

function layout() {
  return (
    <>
      <div className={css.overallbg}>
        <div className={css.container_box}>
          <></>
          <Outlet />
        </div>
        <Link to="/" className={`forback ${css.welcomeback}`}>
          {" "}
          <BiArrowBack /> Welcome page
        </Link>
      </div>
    </>
  );
}

export default layout;
