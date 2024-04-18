import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { InputLabel } from "@mui/material";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import { toast } from "react-toastify";
import LoadingSpinner from "../loader/LoadingSpinner";
import {useDispatch} from "react-redux"
import { addLogin } from "../../feature/LoginSlice";


const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});



const UserLogin = () => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const navigate=useNavigate();
  const dispatch=useDispatch()

  const initialLoginData = {
    email: "",
    password: "",
  };

  const handelLogin = async (newData) => {
    try {
      setLoading(true);
      const {data, status } = await axios.post(
        `${API_BASE_URL}/api/cus/credentials/login`,
        newData
      );

      if (status === 200) {
        setLoading(false);
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2000,
        });
        setErrMsg("");
    
        // Save login info in redux
        dispatch(addLogin({user: data?.data, admin: null}))


        navigate("/userDashboard")
      }
    } catch (error) {
      setLoading(false);
      if (error.response.data.status === 400) {
        setErrMsg(error.response.data.data);
      }
    }
  };

  // User login
  const { handleChange, values, errors, touched, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialLoginData,
      validationSchema: loginSchema,
      onSubmit: (values) => {
        if (values) {
          console.log(values);
          handelLogin(values);
        }
      },
    });

  return (
    <form onSubmit={handleSubmit} className="px-2 py-6">
      <div className="pb-3">
        <InputLabel className="mb-1" required>
          Enter your email
        </InputLabel>
        <TextField
          type="email"
          size="small"
          variant="outlined"
          className="w-full"
          placeholder="Enter your email"
          color="secondary"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email && touched.email ? true : false}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdOutlineMail className="text-lg" />
              </InputAdornment>
            ),
          }}
        />
        <span className="text-red-500 text-xs">
          {touched.email && errors.email}
        </span>
      </div>

      <div className="pb-3">
        <InputLabel className="mb-1" required>
          Enter your password
        </InputLabel>
        <TextField
          type="password"
          size="small"
          variant="outlined"
          className="w-full"
          placeholder="Enter your password"
          color="secondary"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password && touched.password ? true : false}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiLockPasswordLine className="text-lg" />
              </InputAdornment>
            ),
          }}
        />
        <span className="text-red-500 text-xs">
          {touched.password && errors.password}
        </span>
      </div>

      <div className="flex justify-end">
        <Link className="text-zinc-400 hover:text-purple-500">
          Forgot Password?
        </Link>
      </div>

      {errMsg && (
        <div className="flex justify-center">
          <span className="text-xs text-red-500">{errMsg}</span>
        </div>
      )}

      <div className="py-2">
        <button
          type="submit"
          className="w-[30%] h-10 bg-purple-500
        text-white flex justify-center 
        items-center gap-2 text-lg rounded-md hover:bg-purple-700 transition-all"
        >
          <span>
            <CiLogin />
          </span>
          <span>Login</span>
        </button>
      </div>

      <span className="text-sm text-zinc-400">
        By signing in, you agree to our privacy policy and terms of use.
      </span>

      <div className="flex justify-center mt-10">
        <span className="flex items-center gap-1 text-base text-zinc-600 font-semibold">
          <span>New To LMS?</span>
          <Link
            to={"/register"}
            className="hover:text-purple-700 text-purple-500 cursor-pointer"
          >
            Create a new account
          </Link>
        </span>
      </div>
      {loading && <LoadingSpinner />}
    </form>
  );
};

export default UserLogin;
