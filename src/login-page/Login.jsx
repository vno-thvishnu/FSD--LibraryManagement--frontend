import React from "react";
import { useFormik } from "formik";
// import { config } from "../config";
import axios from "axios";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { config } from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
function Login() {
  const navigate=useNavigate(); 


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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
      if (values.password === "") {
        error.password = "please enter Password";
      }
      if (
        values.password &&
        (values.password.length <= 7 || values.password.length > 12)
      ) {
        error.password = "Password must be between 8 to 12 characters";
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        setButtonLoading(true)

        const createAcc = await axios.post(`${config.api}/admin/login`, values);

        if (createAcc.data.message === "Admin Login successfully") {
          toast.success("Login Successfully", {
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

          setTimeout(() => navigate("/dashboard"), 5500);

          formik.resetForm();
        }
        if (
          createAcc.data.message === "email or password incorrect"
        ) {
          toast.error("Email or password incorrect", {
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
        // alert("error");
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

  const[buttonLoading,setButtonLoading]=useState(false)
  

  return (
    <>
            <div className={styles.top}>
              <form className={styles.form_container}>
                <h1>Secret <span>Bookracks</span></h1>
                <div className="input_group">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  required
                  id="input"
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
                </div>

             <div  className="input_group">
             <div
                  id="inputp"
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
                    id="inputpp"
                  />
                  <span onClick={changeType} className="show">
                    {passwordDispaly}
                  </span>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <span className="err" style={{ color: "red" }}>
                    {formik.errors.password}{" "}
                  </span>
                ) : null}
             </div>

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

                 "Login"


}
</button>



                <div className={styles.forgot_change}>
                  <Link
                   to="/layout/forgotpassword"
                    className={styles.forgot}>
                    Forgot password
                  </Link>
                  <Link
                   to="/layout/changepassword" 
                   className={styles.forgot}>
                    Change password
                  </Link>
                </div>
              </form>
            </div>
            <div className={styles.bottom}>
              <h5>
                Are you New 
                Admin ?
              </h5>
              <Link to="signup" className={styles.forgot}>
                  Create Account
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

export default Login;
