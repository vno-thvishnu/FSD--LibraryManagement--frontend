import React, { useContext } from "react";
import { useFormik } from "formik";
import { config } from "../config";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.scss";
import css from "./Forgotpassword.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";

function Forgotpassword() {
  const navigate = useNavigate();

  const [emailDiv, setEmailDiv] = useState(true);

  const [adminPassId, setAdminPassId] = useState("");
  const [adminOtpDiv, setAdminOtpDiv] = useState(false);
  const [adminPasswordDiv, setAdminPasswordDiv] = useState(false);

  const formikEmail = useFormik({
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
        const server = await axios.post(`${config.api}/admin/forgot`, values);

        if (server.data.message === "admin_id finded") {
          setButtonLoading(false);

          setAdminPassId(server.data.email);
          setEmailDiv(false);
          setAdminOtpDiv(true);
          setAdminPasswordDiv(false);
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

  const AdminformikOtp = useFormik({
    initialValues: {
      otp: "",
    },
    validate: (values) => {
      let error = {};

      if (values.otp === "") {
        error.otp = "please enter Otp";
      }

      if (values.otp.length >= 1 && values.otp.length != 5) {
        error.otp = "please enter correct Otp";
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        setButtonLoading(true);

        const server = await axios.post(
          `${config.api}/admin/forgot/otp/${adminPassId}`,
          values
        );

        if (server.data.message === "OTP correct") {
          setButtonLoading(false);

          setAdminOtpDiv(false);

          setAdminPasswordDiv(true);
          AdminformikOtp.resetForm();
        }
        if (server.data.message === "OTP incorrect") {
          toast.error("OTP incorrect", {
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

  const AdminformikPassword = useFormik({
    initialValues: {
      newpassword: "",
      confirmpassword: "",
      email: "",
    },
    validate: (values) => {
      let error = {};

      if (values.newpassword === "") {
        error.newpassword = "please enter new password";
      }

      if (values.confirmpassword === "") {
        error.confirmpassword = "please enter new password again";
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

        const server = await axios.post(
          `${config.api}/admin/forgot/otp/new_password/${adminPassId}`,
          values
        );

        if (server.data.message === "Admin Password Created Successfully") {
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
            () => AdminformikPassword.resetForm(),

            3000
          );
          setButtonLoading(false);

          setTimeout(() => navigate("/layout"), 5500);
        }
      } catch (error) {
        alert("error");
      }
    },
  });

  const back = () => {
    setEmailDiv(true);

    setAdminOtpDiv(false);
    setAdminPasswordDiv(false);
    AdminformikOtp.resetForm();
    AdminformikPassword.resetForm();
  };

  const backfunction = () => {
    setEmailDiv(true);
  };

  const [buttonLoading, setButtonLoading] = useState(false);

  return (
    <>
      <div className={styles.top}>
        <form className={styles.form_container}>
          {emailDiv ? (
            <>
              <h1>Forgot Password</h1>

              <p className={css.form_p}>
                Hi , please enter your registered mail id.
                <br />
                Click the button below to proceed , <br />
                OTP has been sended to email
              </p>

              <input
                type="email"
                placeholder="Email"
                name="email"
                onBlur={formikEmail.handleBlur}
                value={formikEmail.values.email}
                onChange={formikEmail.handleChange}
                id={styles.input}
                className={`
							${formikEmail.touched.email && formikEmail.errors.email ? "error-box" : ""}
							${formikEmail.touched.email && !formikEmail.errors.email ? "success-box" : ""}

							`}
              />
              {formikEmail.touched.email && formikEmail.errors.email ? (
                <span className="err">{formikEmail.errors.email} </span>
              ) : null}
              <button
                onClick={formikEmail.handleSubmit}
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

              <Link to="/layout" className={"forback ${style.forgot}"}>
                Back
              </Link>
            </>
          ) : null}
          <></>
          {adminOtpDiv ? (
            <>
              <h1>OTP</h1>

              <p className={css.form_p}>
                Hi , please enter your Received <br /> OTP. Click the button
                below to <br />
                proceed , to change your password
              </p>

              <input
                type="text"
                placeholder="OTP"
                name="otp"
                value={AdminformikOtp.values.otp}
                onChange={AdminformikOtp.handleChange}
                onBlur={AdminformikOtp.handleBlur}
                id={styles.input}
                className={`
                  ${
                    AdminformikOtp.touched.otp && AdminformikOtp.errors.otp
                      ? "error-box"
                      : ""
                  }
                  ${
                    AdminformikOtp.touched.otp && !AdminformikOtp.errors.otp
                      ? "success-box"
                      : ""
                  }
    
                  `}
              />
              {AdminformikOtp.touched.otp && AdminformikOtp.errors.otp ? (
                <span className="err">{AdminformikOtp.errors.otp} </span>
              ) : null}

              <button
                onClick={AdminformikOtp.handleSubmit}
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

              <button onClick={back} className={"forback ${style.forgot}"}>
                Back
              </button>
            </>
          ) : null}
          {adminPasswordDiv ? (
            <>
              <h1>Create Password</h1>

              <p className={css.form_p}>
                Hi , please enter your New password. <br /> Click the button
                below to proceed .
              </p>

              <input
                type="text"
                placeholder="New Password"
                name="newpassword"
                value={AdminformikPassword.values.newpassword}
                onChange={AdminformikPassword.handleChange}
                onBlur={AdminformikPassword.handleBlur}
                id={styles.input}
                className={`
							${
                AdminformikPassword.touched.newpassword &&
                AdminformikPassword.errors.newpassword
                  ? "error-box"
                  : ""
              }
							${
                AdminformikPassword.touched.newpassword &&
                !AdminformikPassword.errors.newpassword
                  ? "success-box"
                  : ""
              }

							`}
              />
              {AdminformikPassword.touched.newpassword &&
              AdminformikPassword.errors.newpassword ? (
                <span className="err">
                  {AdminformikPassword.errors.newpassword}{" "}
                </span>
              ) : null}
              <input
                type="text"
                placeholder="Confirm New Password"
                name="confirmpassword"
                value={AdminformikPassword.values.confirmpassword}
                onBlur={AdminformikPassword.handleBlur}
                onChange={AdminformikPassword.handleChange}
                id={styles.input}
                className={`
                  ${
                    AdminformikPassword.touched.confirmpassword &&
                    AdminformikPassword.errors.confirmpassword
                      ? "error-box"
                      : ""
                  }
                  ${
                    AdminformikPassword.touched.confirmpassword &&
                    !AdminformikPassword.errors.confirmpassword
                      ? "success-box"
                      : ""
                  }
    
                  `}
              />
              {AdminformikPassword.touched.confirmpassword &&
              AdminformikPassword.errors.confirmpassword ? (
                <span className="err">
                  {AdminformikPassword.errors.confirmpassword}{" "}
                </span>
              ) : null}
              <button
                onClick={AdminformikPassword.handleSubmit}
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

              <button onClick={back} className={"forback ${style.forgot}"}>
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

export default Forgotpassword;
