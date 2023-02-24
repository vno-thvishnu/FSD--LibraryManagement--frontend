import React from "react";
import css from "./Welcome.module.scss";
import libgreen from "../assets/lib green.png";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <>
      <div className={css.overallbg}>
        <div className={css.contentbox}>
          <div className={css.contentbox__left}>
            <p className={css.contentbox__left__heading}>
              secret <b>Bookracks</b>
            </p>
            <div className={css.contentbox__left__text}>
              <h4>Library Management</h4>
              <h6>BOOKRACKS</h6>
              <p>
                A library is a collection of materials, books or media that are
                accessible for use and not just for display purposes. A library
                provides physical or digital access materials, and may be a
                physical location or a virtual space, or both
              </p>
              <h5>
                <span>Admin</span> login here
              </h5>
              <Link to="/layout" className={`forbutton ${css.forbutton}`}>
                Next page
              </Link>
            </div>
          </div>
          <div className={css.contentbox__right}>
            <div className={css.contentbox__right__img}>
              <img src={libgreen} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
