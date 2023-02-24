import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./Addbooks.module.scss";
import { config } from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";

function Addbooks() {
  const { _id } = useParams();

  const getbooks = async () => {
    try {
      const getting = await axios.get(`${config.api}/get_book/${_id}`);
      formik.setValues(getting.data);
    } catch (error) {
      alert("error ");
    }
  };

  useEffect(() => {
    getbooks();
  }, []);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      book_name: "",
      author: "",
      cover_photo: "",
      quantity: "",
      documentation: "",
    },
    validate: (values) => {
      let error = {};
      if (values.book_name === "") {
        error.book_name = "please enter name";
      }

      if (values.author === "") {
        error.author = "please enter author name";
      }
      if (
        values.author &&
        (values.author.length <= 2 || values.author.length > 25)
      ) {
        error.author = "Author name must be between 3 to 25 characters";
      }

      if (values.quantity <= 0) {
        error.quantity = "Must be 1 or more";
      }
      if (values.quantity === "") {
        error.quantity = "please enter quantity";
      }
      if (values.cover_photo === "") {
        error.cover_photo = "please enter valid picture link";
      }
      if (values.documentation === "") {
        error.documentation = "please enter valid link";
      }
      return error;
    },
    onSubmit: async (values) => {
      try {
        setButtonLoading(true);

        const server = await axios.put(
          `${config.api}/update_book/${_id}`,
          values
        );
        if (server.data.message === "Changes updated successfully") {
          toast.success("Changes updated successfully", {
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
        if (server.data.message === "book not found") {
          toast.error("book not found", {
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
      } catch (error) {
        alert("error");
      }
    },
  });
  const [buttonLoading, setButtonLoading] = useState(false);

  return (
    <>
      <div className={styles._bg}>
        <h1>Update Book</h1>
        <form className={styles.form}>
          <div className={styles.threeinput}>
            <div className="input_group">
              <input
                type="text"
                placeholder="Book name"
                name="book_name"
                value={formik.values.book_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="input"
                className={`
							${formik.touched.book_name && formik.errors.book_name ? "error-box" : ""}
							${formik.touched.book_name && !formik.errors.book_name ? "success-box" : ""}
   
							`}
              />
              {formik.touched.book_name && formik.errors.book_name ? (
                <span className="err">{formik.errors.book_name} </span>
              ) : null}
            </div>

            <div className="input_group">
              <input
                type="text"
                placeholder="Author name"
                name="author"
                value={formik.values.author}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="input"
                className={`
							${formik.touched.author && formik.errors.author ? "error-box" : ""}
							${formik.touched.author && !formik.errors.author ? "success-box" : ""}
   
							`}
              />
              {formik.touched.author && formik.errors.author ? (
                <span className="err">{formik.errors.author} </span>
              ) : null}
            </div>

            <div className="input_group">
              <input
                type="number"
                placeholder="Total books"
                name="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="inputnum"
                className={`
							${formik.touched.quantity && formik.errors.quantity ? "error-box" : ""}
							${formik.touched.quantity && !formik.errors.quantity ? "success-box" : ""}
   
							`}
              />
              {formik.touched.quantity && formik.errors.quantity ? (
                <span className="err">{formik.errors.quantity} </span>
              ) : null}
            </div>
          </div>

          <div className="input_group">
            <input
              type="text"
              placeholder="Cover picture link"
              name="cover_photo"
              value={formik.values.cover_photo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="inputlink"
              className={`
							${formik.touched.cover_photo && formik.errors.cover_photo ? "error-box" : ""}
							${formik.touched.cover_photo && !formik.errors.cover_photo ? "success-box" : ""}
   
							`}
            />
            {formik.touched.cover_photo && formik.errors.cover_photo ? (
              <span className="err">{formik.errors.cover_photo} </span>
            ) : null}
          </div>

          <div className="input_group">
            <input
              type="text"
              placeholder="Documentation link"
              name="documentation"
              value={formik.values.documentation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="inputlink"
              className={`
							${
                formik.touched.documentation && formik.errors.documentation
                  ? "error-box"
                  : ""
              }
							${
                formik.touched.documentation && !formik.errors.documentation
                  ? "success-box"
                  : ""
              }
   
							`}
            />
            {formik.touched.documentation && formik.errors.documentation ? (
              <span className="err">{formik.errors.documentation} </span>
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
