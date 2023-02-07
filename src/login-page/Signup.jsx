import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { config } from "../config";

import styles from "./Signup.module.scss";

function Signup() {


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      otp: "",
    },
    validate: (values) => {
      let error = {};

      if (values.name === "") {
        error.name = "please enter Name";
      }
      if (values.name && (values.name.length <= 2 || values.name.length > 15)) {
        error.name = "Name must be between 3 to 15 characters";
      }
      if (values.email === "") {
        error.email = "please enter Email";
      }
      if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-z]{2,4}$/i.test(values.email)
      ) {
        error.email = " please enter a valid email";
      }

      if (values.password === "") {
        error.password = "please enter Password";
      }
      if (
        values.password &&
        (values.password.length <= 7 || values.password.length > 12)
      ) {
        error.password = "Password must be between 8 to 12 characters";
      }
      if (values.confirmpassword === "") {
        error.confirmpassword = "please enter Password again";
      }
      if (
        values.confirmpassword &&
        (values.confirmpassword.length <= 7 ||
          values.confirmpassword.length > 12)
      ) {
        error.confirmpassword = "Password must be between 8 to 12 characters";
      }

      if (
        values.password.length > 7 &&
        values.confirmpassword.length > 7 &&
        values.password.length < 13 &&
        values.confirmpassword.length < 13 &&
        values.password !== values.confirmpassword
      ) {
        error.password = "Password not matching";
        error.confirmpassword = "Password not matching";
      }
      return error;
    },
    onSubmit: async (values) => {
      try {
        const createAcc = await axios.post(`/register`, values);

        if (createAcc.data.message === "Account created successfully") {
          formik.resetForm();
        }
        if (
          createAcc.data.message === "Email-id already registered, use another"
        ) {
        }
      } catch (error) {
        alert("error");
      }
    },
  });
  const [passwordDispaly, setPasswordDisplay] = useState("Show");

  const [passwordType, setPasswordType] = useState("password");
  const changeType = () => {
    if (passwordType === "password") {
      setPasswordDisplay("Hide");
      setPasswordType("text");
    } else {
      setPasswordType("password");
      setPasswordDisplay("Show");
    }
  };

  const [passwordDispalyTwo, setPasswordDisplayTwo] = useState("Show");

  const [passwordTypeTwo, setPasswordTypeTwo] = useState("password");
  const changeTypeTwo = () => {
    if (passwordTypeTwo === "password") {
      setPasswordDisplayTwo("Hide");
      setPasswordTypeTwo("text");
    } else {
      setPasswordTypeTwo("password");
      setPasswordDisplayTwo("Show");
    }
  };

 

  return (
    <>
      
          
          <div className={styles.top}>
            <form className={styles.form_container}>
              <h1>
                Create Admin 
              </h1>
              <input
                type="text"
                placeholder=" Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                required
                id={styles.input}
                className={`
							${formik.touched.name && formik.errors.name ? "error-box" : ""}
							${formik.touched.name && !formik.errors.name ? "success-box" : ""}

							`}
              />
              {formik.touched.name && formik.errors.name ? (
                <span className="err" style={{ color: "red" }}>
                  {formik.errors.name}{" "}
                </span>
              ) : null}

              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                required
                id={styles.input}
                className={`
							${formik.touched.email && formik.errors.email ? "error-box" : ""}
							${formik.touched.email && !formik.errors.email ? "success-box" : ""}

							`}
              />
              {formik.touched.email && formik.errors.email ? (
                <span className="err" style={{ color: "red" }}>
                  {formik.errors.email}{" "}
                </span>
              ) : null}

              <div
                id={styles.inputp}
                className={`
							${formik.touched.password && formik.errors.password ? "error-box" : ""}
							${formik.touched.password && !formik.errors.password ? "success-box" : ""}

							`}
              >
                <input
                  type={passwordType}
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  required
                  id={styles.inputpp}
                />
                <span onClick={changeType} className={styles.show}>
                  {passwordDispaly}
                </span>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <span className="err" style={{ color: "red" }}>
                  {formik.errors.password}{" "}
                </span>
              ) : null}
              <div
                id={styles.inputp}
                className={`
							${
                formik.touched.confirmpassword && formik.errors.confirmpassword
                  ? "error-box"
                  : ""
              }
							${
                formik.touched.confirmpassword && !formik.errors.confirmpassword
                  ? "success-box"
                  : ""
              }

							`}
              >
                <input
                  type={passwordTypeTwo}
                  placeholder="Confirm Password"
                  name="confirmpassword"
                  value={formik.values.confirmpassword}
                  onChange={formik.handleChange}
                  required
                  id={styles.inputpp}
                />
                <span onClick={changeTypeTwo} className={styles.show}>
                  {passwordDispalyTwo}
                </span>
              </div>
              {formik.touched.confirmpassword &&
              formik.errors.confirmpassword ? (
                <span className="err" style={{ color: "red" }}>
                  {formik.errors.confirmpassword}{" "}
                </span>
              ) : null}


              <button
                onClick={formik.handleSubmit}
                type="submit"
                className="forbutton"
              >
                Create
              </button>
            </form>
          </div>

          <Link to="/layout"className={'forback ${style.forgot}'}>Back</Link>

      
    
    </>
  );
}

export default Signup;
