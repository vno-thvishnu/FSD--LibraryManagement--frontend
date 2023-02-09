import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

import styles from "./Signup.module.scss";

function Signup() {

  const navigate=useNavigate(); 


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
        setButtonLoading(true)
        const createAcc = await axios.post(`${config.api}/admin/register`, values);

        if (createAcc.data.message === "Admin Account created successfully") {
          toast.success("Successfully Created", {
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
        setButtonLoading(false)

          setTimeout(() => navigate("/layout"), 5500);

        }
        if (
          createAcc.data.message === "Email-id already registered, use another"
        ) {
          toast.error("Email-id already registered, use another", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        setButtonLoading(false)
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
  const[buttonLoading,setButtonLoading]=useState(false)

 

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
                onBlur={formik.handleBlur}
                id={styles.input}
                className={`
							${formik.touched.name && formik.errors.name ? "error-box" : ""}
							${formik.touched.name && !formik.errors.name ? "success-box" : ""}

							`}
              />
              {formik.touched.name && formik.errors.name ? (
                <span className="err" >
                  {formik.errors.name}{" "}
                </span>
              ) : null}

              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id={styles.input}
                className={`
							${formik.touched.email && formik.errors.email ? "error-box" : ""}
							${formik.touched.email && !formik.errors.email ? "success-box" : ""}

							`}
              />
              {formik.touched.email && formik.errors.email ? (
                <span className="err" >
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
                onBlur={formik.handleBlur}
                  id={styles.inputpp}
                />
                <span onClick={changeType} className={styles.show}>
                  {passwordDispaly}
                </span>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <span className="err" >
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
                onBlur={formik.handleBlur}
                  id={styles.inputpp}
                />
                <span onClick={changeTypeTwo} className={styles.show}>
                  {passwordDispalyTwo}
                </span>
              </div>
              {formik.touched.confirmpassword &&
              formik.errors.confirmpassword ? (
                <span className="err" >
                  {formik.errors.confirmpassword}{" "}
                </span>
              ) : null}


              <button
                onClick={formik.handleSubmit}
                type="submit"
                className="forbutton"
              >
                {buttonLoading?<>
  <div class="box">
    <div class="bouncing-bar">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  </div>
</>:

                "Create"
                


}
              </button>
            </form>
          </div>

          <Link to="/layout"className={'forback ${style.forgot}'}>Back</Link>

      
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

export default Signup;
