import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../dashboard components/Dashboard.module.scss";
import axios from "axios";
import { config } from "../config";

function History() {
  const navigate = useNavigate();
  const [listLoading, setListLoading] = useState(false);
  const [storePastBorrowed, setStorePastBorrowed] = useState([]);
  useEffect(() => {
    getRegisters();
  }, []);
  const getRegisters = async () => {
    try {
      setListLoading(false);
      const server = await axios.get(`${config.api}/view_registers`);

      setStorePastBorrowed(server.data);
      setListLoading(true);
    } catch (error) {}
  };
  return (
    <>
      <div className={styles.history_bg}>
        <div className={styles.history_con}>
          <h2>Register History</h2>
          <div className={styles.get_history}>
            {listLoading ? (
              <>
                <div className={styles.pastdiv}>
                  {storePastBorrowed
                    .slice()
                    .reverse()
                    .map((get) => {
                      const sli = get.register_date;
                      const dateans = sli.slice(0, 10);

                      const currentdate = new Date();
                      const returndate = new Date(get.return_date);

                      const fnd = returndate.getTime() - currentdate.getTime();
                      const d = Math.round(fnd / (24 * 60 * 60 * 1000));
                      const days = d;
                      return (
                        <>
                          <div className={styles.pastdivbox}>
                            <div
                              className={
                                get.reg_status === "returned"
                                  ? styles.pdb_top
                                  : styles.pdb_toptwo
                              }
                            >
                              <h4>
                                <span>On : </span>
                                {dateans}
                              </h4>
                              <div>
                                <h6
                                  className={` ${
                                    get.reg_status === "borrowed"
                                      ? `
     ${days == 0 ? "todayclr" : ""}
     ${days > 0 ? "noissueclr" : ""}
     ${days < 0 ? "dueclr" : ""}`
                                      : ""
                                  }`}
                                >
                                  <span>Status : </span>
                                  {get.reg_status}
                                </h6>
                              </div>
                            </div>
                            <div className={styles.pdb_bottom}>
                              <p className={styles.pforbname}>
                                <span>Book : </span>
                                {get.selected_book}
                              </p>
                              <p>
                                <span>Person-Id : </span>
                                {get.person_id}
                              </p>

                              <p>
                                <span>Returned : </span>
                                {get.return_date}
                              </p>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </>
            ) : (
              <>
                <div class="box">
                  <div class="bouncing-bar">
                    <div class="line line_two"></div>
                    <div class="line line_two"></div>
                    <div class="line line_two"></div>
                    <div class="line line_two"></div>
                  </div>
                </div>
              </>
            )}
          </div>

          <Link to="/dashboard" className={"forback ${style.forgot}"}>
            Back
          </Link>
        </div>
      </div>
    </>
  );
}

export default History;
