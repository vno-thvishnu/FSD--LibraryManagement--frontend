import React from "react";
import css from "./Layout.module.scss";
import rack1 from "../assets/rack1.png";
import rack2 from "../assets/rack2.png";
import rack3 from "../assets/rack3.png";
import { Link, Outlet } from "react-router-dom";
import {BiArrowBack} from "react-icons/bi"

function layout() {
  return (
    <>
      <div className={css.overallbg}>
        {/* <img src={rack1}/> */}
        <div className={css.container_box}>
          <>
          {/* <h2>Secret Bookracks</h2>
          <div className={css.input_box}>

            <div className="input_group">

              <div className="input_family">
                <label>Name :</label>
                <div className="inputtag">
                  <input placeholder="your name" />
                </div>
              </div>

              <div className="input_family">
                <label>password :</label>
                <div className="inputtag">
                  <input placeholder="your name" type={} />
                  <span></span>
                </div>
              </div>
              
            </div>
            <button className="forbutton">Login</button>

          </div> */}
          </>
          <Outlet/>
        </div>
        <Link to="/" className={`forback ${css.welcomeback}`}> <BiArrowBack/> Welcome page</Link>

      </div>
    </>
  );
}

export default layout;
