import React, { useContext } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../config";
import { useState } from "react";
import styles from "./Changepassword.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import css from "./Signup.module.scss";

function Chnagepassword() {
  const navigate = useNavigate();

  const [emailDiv, setEmailDiv] = useState(true);

  const [adminPasswordDiv, setAdminPasswordDiv] = useState(false);

  const [adminPassId, setAdminPassId] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      let error = {};

      if (values.email === "") {
        error.email = "please enter Email";
      }
      if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-z]{2,4}$/i.test(values.email)
      ) {
        error.email = " please enter a valid email";
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        setButtonLoading(true);

        const server = await axios.post(`${config.api}/admin/change`, values);

        if (server.data.message === "admin_id finded") {
          setButtonLoading(false);

          setAdminPassId(server.data.email);
          setEmailDiv(false);
          setAdminPasswordDiv(true);
        }
        if (server.data.message === "Account not found in this email-Id") {
          toast.error("Account not found in this email-Id", {
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

  const back = () => {
    setEmailDiv(true);
    setAdminPasswordDiv(false);

    adminformikpassword.resetForm();
  };

  const adminformikpassword = useFormik({
    initialValues: {
      currentpassword: "",
      newpassword: "",
      confirmpassword: "",
    },
    validate: (values) => {
      let error = {};

      if (!values.currentpassword) {
        error.currentpassword = "please enter current password";
      }

      if (
        values.currentpassword &&
        (values.currentpassword.length <= 7 ||
          values.currentpassword.length > 12)
      ) {
        error.currentpassword = "Password must be between 8 to 12 characters";
      }
      if (values.newpassword === "") {
        error.newpassword = "please enter New password";
      }

      if (values.confirmpassword === "") {
        error.confirmpassword = "please enter New Password again";
      }

      if (
        values.confirmpassword &&
        (values.confirmpassword.length <= 7 ||
          values.confirmpassword.length > 12)
      ) {
        error.confirmpassword = "Password must be between 8 to 12 characters";
      }
      if (
        values.newpassword &&
        (values.newpassword.length <= 7 || values.newpassword.length > 12)
      ) {
        error.newpassword = "Password must be between 8 to 12 characters";
      }
      if (
        values.newpassword.length > 7 &&
        values.confirmpassword.length > 7 &&
        values.newpassword.length < 13 &&
        values.confirmpassword.length < 13 &&
        values.newpassword !== values.confirmpassword
      ) {
        error.newpassword = "Password not matching";
        error.confirmpassword = "Password not matching";
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        setButtonLoading(true);

        const server = await axios.put(
          `${config.api}/admin/change/${adminPassId}`,
          values
        );
        if (server.data.message === "Admin Password Changed Successfully") {
          toast.success("Password Created Successfully", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setTimeout(
            () => adminformikpassword.resetForm(),

            3000
          );
          setButtonLoading(false);

          setTimeout(() => navigate("/layout"), 5500);
        }
        if (server.data.message === "Current Password Incorrect") {
          toast.error("Current Password Incorrect", {
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
      <div className={css.top}>
        <form className={css.form_container}>
          {emailDiv ? (
            <>
              <h1>Change Password</h1>

              <p className={styles.form_p}>
                Hi , please enter your registered <br /> mail id. Click the
                button below to <br />
                proceed.
              </p>

              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                id={styles.input}
                className={`
							${formik.touched.email && formik.errors.email ? "error-box" : ""}
							${formik.touched.email && !formik.errors.email ? "success-box" : ""}

							`}
              />
              {formik.touched.email && formik.errors.email ? (
                <span className="err">{formik.errors.email} </span>
              ) : null}
              <button
                onClick={formik.handleSubmit}
                type="submit"
                className="forbutton"
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
                  "Proceed"
                )}
              </button>

              <Link to="/layout" className="forback">
                Back
              </Link>
            </>
          ) : null}

          {adminPasswordDiv ? (
            <>
              <h1>Update New Password</h1>

              <p className={styles.form_p}>
                please enter your <br /> Current password & New password
              </p>

              <input
                type="text"
                placeholder="Current password"
                name="currentpassword"
                value={adminformikpassword.values.currentpassword}
                onBlur={adminformikpassword.handleBlur}
                onChange={adminformikpassword.handleChange}
                id={styles.input}
                className={`
							${
                adminformikpassword.touched.currentpassword &&
                adminformikpassword.errors.currentpassword
                  ? "error-box"
                  : ""
              }
							${
                adminformikpassword.touched.currentpassword &&
                !adminformikpassword.errors.currentpassword
                  ? "success-box"
                  : ""
              }

							`}
              />
              {adminformikpassword.touched.currentpassword &&
              adminformikpassword.errors.currentpassword ? (
                <span className="err">
                  {adminformikpassword.errors.currentpassword}{" "}
                </span>
              ) : null}

              <input
                type="text"
                placeholder="New password"
                name="newpassword"
                value={adminformikpassword.values.newpassword}
                onBlur={adminformikpassword.handleBlur}
                onChange={adminformikpassword.handleChange}
                id={styles.input}
                className={`
							${
                adminformikpassword.touched.newpassword &&
                adminformikpassword.errors.newpassword
                  ? "error-box"
                  : ""
              }
							${
                adminformikpassword.touched.newpassword &&
                !adminformikpassword.errors.newpassword
                  ? "success-box"
                  : ""
              }

							`}
              />
              {adminformikpassword.touched.newpassword &&
              adminformikpassword.errors.newpassword ? (
                <span className="err">
                  {adminformikpassword.errors.newpassword}{" "}
                </span>
              ) : null}

              <input
                type="text"
                placeholder="Confirm new password"
                name="confirmpassword"
                value={adminformikpassword.values.confirmpassword}
                onBlur={adminformikpassword.handleBlur}
                onChange={adminformikpassword.handleChange}
                id={styles.input}
                className={`
							${
                adminformikpassword.touched.confirmpassword &&
                adminformikpassword.errors.confirmpassword
                  ? "error-box"
                  : ""
              }
							${
                adminformikpassword.touched.confirmpassword &&
                !adminformikpassword.errors.confirmpassword
                  ? "success-box"
                  : ""
              }

							`}
              />
              {adminformikpassword.touched.confirmpassword &&
              adminformikpassword.errors.confirmpassword ? (
                <span className="err">
                  {adminformikpassword.errors.confirmpassword}{" "}
                </span>
              ) : null}

              <button
                onClick={adminformikpassword.handleSubmit}
                type="submit"
                className="forbutton"
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
                  "Proceed"
                )}
              </button>

              <button onClick={back} className="forback">
                Back
              </button>
            </>
          ) : null}
        </form>
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

export default Chnagepassword;
