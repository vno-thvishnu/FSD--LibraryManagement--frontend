import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Addbooks.module.scss";
import { config } from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";

function Addbooks() {
  const navigate = useNavigate();
  const ref = useRef();
  useEffect(() => {
    getUsers();
    getbooks();
  }, []);
  const [storeUsers, setStoreUsers] = useState([]);
  const [storeBooks, setStoreBooks] = useState([]);

  const getUsers = async () => {
    try {
      const server = await axios.get(`${config.api}/view_users`);

      setStoreUsers(server.data);
    } catch (error) {}
  };

  const getbooks = async () => {
    try {
      const server = await axios.get(`${config.api}/view_books`);

      setStoreBooks(server.data);
    } catch (error) {}
  };

  const formik = useFormik({
    initialValues: {
      person_id: "",
      selected_book: "",
      return_date: "",
    },
    validate: (values) => {
      let error = {};

      const checkpersonid = storeUsers.some((get) => {
        return values.person_id === get.person_id;
      });
      if (checkpersonid === false) {
        error.person_id = "please enter user id";
      }

      if (values.person_id === "") {
        error.person_id = "please enter user-id";
      }

      const checkbook = storeBooks.some((get) => {
        return values.selected_book === get.book_name;
      });

      if (checkbook === false) {
        error.selected_book = "please enter correct book";
      }

      if (values.selected_book === "") {
        error.selected_book = "please enter name";
      }

      const currentdate = new Date();
      const returndate = new Date(values.return_date);
      if (returndate.getTime() && currentdate.getTime()) {
        const fnd = returndate.getTime() - currentdate.getTime();
        const days = Math.round(fnd / (24 * 60 * 60 * 1000));

        if (days < 0) {
          error.return_date = "select valid date";
        }
        if (days > 7) {
          error.return_date = "within 7 days only";
        }
      }

      if (values.return_date === "") {
        error.return_date = "please select return date";
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        setButtonLoading(true);

        const server = await axios.post(`${config.api}/add_register`, values);
        if (server.data.message === "registered successfully") {
          toast.success("Registered successfully", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setTimeout(() => formik.resetForm(), 3000);
          setButtonLoading(false);
        }
        if (server.data.message === "user already borrowed three books") {
          toast.error("User already borrowed three books", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setButtonLoading(false);
        }
        if (
          server.data.message === `already user having ${values.selected_book}`
        ) {
          toast.error(server.data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setButtonLoading(false);
        }
        if (server.data.message === "book not avaiable") {
          toast.error("Book not avaiable now", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setButtonLoading(false);
        }
        getbooks();
      } catch (error) {
        alert("error");
      }
    },
  });
  const [buttonLoading, setButtonLoading] = useState(false);

  return (
    <>
      <div className={styles._bg}>
        <h1>Register here</h1>
        <form className={styles.formrow}>
          <div className="input_group">
            {storeUsers.map((get) => {
              return (
                <>
                  {formik.values.person_id === get.person_id ? (
                    <>
                      <div className="namediv">
                        <p>User name :</p>
                        <h5> {get.user_name}</h5>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
            <input
              list="iddata"
              placeholder="User_id"
              name="person_id"
              value={formik.values.person_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="input"
              className={`
							${formik.touched.person_id && formik.errors.person_id ? "error-box" : ""}
							${formik.touched.person_id && !formik.errors.person_id ? "success-box" : ""}
   
							`}
            />
            <datalist id="iddata">
              {storeUsers.map((get) => {
                return (
                  <>
                    <option value={get.person_id}></option>
                  </>
                );
              })}
            </datalist>

            {formik.touched.person_id && formik.errors.person_id ? (
              <span className="err">{formik.errors.person_id} </span>
            ) : null}
          </div>

          <div className="input_group">
            <input
              list="idbook"
              placeholder="select books"
              name="selected_book"
              value={formik.values.selected_book}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="input"
              className={`
							${
                formik.touched.selected_book && formik.errors.selected_book
                  ? "error-box"
                  : ""
              }
							${
                formik.touched.selected_book && !formik.errors.selected_book
                  ? "success-box"
                  : ""
              }
   
							`}
            />
            {formik.touched.selected_book && formik.errors.selected_book ? (
              <span className="err">{formik.errors.selected_book} </span>
            ) : null}

            <datalist id="idbook">
              {storeBooks.map((get) => {
                return (
                  <>
                    {get.quantity > 0 ? (
                      <>
                        <option value={get.book_name}></option>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                );
              })}
            </datalist>
          </div>

          <div className="input_group">
            <input
              type="text"
              placeholder="select return date"
              ref={ref}
              onFocus={() => (ref.current.type = "date")}
              name="return_date"
              value={formik.values.return_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="input"
              className={`
							${formik.touched.return_date && formik.errors.return_date ? "error-box" : ""}
							${formik.touched.return_date && !formik.errors.return_date ? "success-box" : ""}
   
							`}
            />
            {formik.touched.return_date && formik.errors.return_date ? (
              <span className="err">{formik.errors.return_date} </span>
            ) : null}
          </div>

          <div className={styles.buttondiv}>
            <button
              onClick={formik.handleSubmit}
              type="submit"
              className="forbuttonfullscreen"
            >
              {buttonLoading ? (
                <>
                  <div class="box">
                    <div class="bouncing-bar">
                      <div class="line"></div>
                      <div class="line"></div>
                      <div class="line"></div>
                      <div class="line"></div>
                    </div>
                  </div>
                </>
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
        <Link to="/dashboard" className={"forback ${style.forgot}"}>
          Back
        </Link>
      </div>

      <ToastContainer
        transition={Flip}
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default Addbooks;
