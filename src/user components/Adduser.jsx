import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "../dashboard components/Addbooks.module.scss"
import { config } from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';


function Addbooks() {
    const navigate=useNavigate(); 


    const formik = useFormik({
        initialValues: {
          user_name: "",
          email: "",
          mobile_no: "",

        
        },
        validate:(values)=>{
            let error={};
            if (values.user_name === "") {
                error.user_name = "please enter name";
              }
              if (values.user_name && (values.user_name.length <= 2 || values.user_name.length > 15)) {
                error.user_name = "Name must be between 3 to 15 characters";
              }
              if (values.email === "") {
                error.email = "please enter email";
              }
              if (
                values.email &&
                !/^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-z]{2,4}$/i.test(values.email)
              ) {
                error.email = " please enter a valid email";
              }
              if (values.mobile_no === "") {
                error.mobile_no = "please enter mobile number";
              }
              if (values.mobile_no.length !== 10 || values.mobile_no && /[A-Z._%+-]/i.test(values.mobile_no))  {
                error.mobile_no = "please enter valid mobile number";
              }
      return error;

        },
        onSubmit: async (values) => {
          try {
            setButtonLoading(true)

            const server = await axios.post(`${config.api}/add_users`, values);
            if (server.data.message === "User added successfully") {
                toast.success("User added successfully", {
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
      
                // setTimeout(() => navigate("/dashboard"), 5500);
      
              }
              if (
                server.data.message === "User email already there, use another" ||
                server.data.message === "User mobile number already there, use another" ||
                server.data.message === "User email & mobile number already there, use another"  

              ) {
                toast.error(`${server.data.message}`, {
                  position: "top-center",
                  autoClose: 5000,
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
  const[buttonLoading,setButtonLoading]=useState(false)

  return (
    <>
      <div className={styles._bg}>
        <h1>Add New Users</h1>
        <form className={styles.form}>
            <div className={styles.threeinput_col}>
        <div className="input_group">
                <input
                  type="text"
                  placeholder="User name"
                  name="user_name"
                  value={formik.values.user_name}
                  onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                  id="input"
                  className={`
							${formik.touched.user_name && formik.errors.user_name ? "error-box" : ""}
							${formik.touched.user_name && !formik.errors.user_name ? "success-box" : ""}
   
							`}
                />
                {formik.touched.user_name && formik.errors.user_name? (
                  <span className="err" >
                    {formik.errors.user_name}{" "}
                  </span>
                ) : null}
                </div>

                <div className="input_group">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                  id="input"
                  className={`
							${formik.touched.email && formik.errors.email ? "error-box" : ""}
							${formik.touched.email && !formik.errors.email? "success-box" : ""}
   
							`}
                />
                {formik.touched.email && formik.errors.email? (
                  <span className="err" >
                    {formik.errors.email}{" "}
                  </span>
                ) : null}
                </div>

                <div className="input_group">
                <input
                  type="tel"
                  placeholder="Mobile number"
                  name="mobile_no"
                  value={formik.values.mobile_no}
                  onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                  id="input"
                  className={`
							${formik.touched.mobile_no && formik.errors.mobile_no ? "error-box" : ""}
							${formik.touched.mobile_no && !formik.errors.mobile_no? "success-box" : ""}
   
							`}
                />
                {formik.touched.mobile_no && formik.errors.mobile_no? (
                  <span className="err" >
                    {formik.errors.mobile_no}{" "}
                  </span>
                ) : null}
                </div>
              <p>*** 
Before creating get any id proof 
***</p>

                </div>

                <div className={styles.buttondiv}>
                <button
                onClick={formik.handleSubmit}
                type="submit"
                className="forbuttonfullscreen"
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
              </button></div>
        </form>
        <Link to="/user"className={'forback ${style.forgot}'}>Back</Link>

      </div>


      <ToastContainer
            transition={Flip}
        position="bottom-right"
        autoClose={5000}
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
  )
}

export default Addbooks