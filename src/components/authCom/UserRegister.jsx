import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { InputLabel } from "@mui/material";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { useFormik } from "formik";
import { FaUserFriends } from "react-icons/fa";
import * as yup from 'yup';
import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import { toast } from "react-toastify";
import LoadingSpinner from "../loader/LoadingSpinner";

const userRegisterSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
  parentReferralCode: yup.string().min(6, 'Referral code should be at least 6 characters long').max(6, 'Referral code should be at most 6 characters long'),
});
const UserRegister = () => {

  const [loading, setLoading]=useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate=useNavigate();
  const userRegisterData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    parentReferralCode: "",
  };


  const handelUserRegister=async(newData)=>{

    const registerData={
      name: newData?.name,
      email: newData?.email,
      password: newData.password,
      parentReferralCode:newData?.parentReferralCode
    }
    try {
      setLoading(true)
      const {status}=await axios.post(`${API_BASE_URL}/api/cus/credentials/register`, registerData);
      if(status===200){
        setLoading(false)
        toast.success("Register successful!", {
          position: "top-right",
          autoClose: 2000,
      });
      navigate("/")
      setErrMsg('')

      }
    } catch (error) {
      setLoading(false)
      if (error.response.data.status === 400) {
        setErrMsg(error.response.data.data);
      }
    }
  }

  // User Register
  const { handleChange, values, errors, touched, handleBlur, handleSubmit } =
    useFormik({
      initialValues: userRegisterData,
       validationSchema: userRegisterSchema,
      onSubmit: (values) => {
        if (values) {
          handelUserRegister(values)
        }
      },
    });
  return (
    <form onSubmit={handleSubmit} className="px-2 py-6" action="">
      <div className="pb-2">
        <InputLabel className="mb-1" required>
          Enter your name
        </InputLabel>
        <TextField
          type="text"
          size="small"
          variant="outlined"
          className="w-full"
          placeholder="Enter your name"
          color="secondary"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name && touched.name ? true : false}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaRegUser className="text-lg" />
              </InputAdornment>
            ),
          }}
        />
        <span className="text-red-500 text-xs">
          {touched.name && errors.name}
        </span>
      </div>

      <div className="pb-2">
        <InputLabel className="mb-1" required>
          Enter your email
        </InputLabel>
        <div className="flex gap-1">
          <TextField
            type="email"
            size="small"
            variant="outlined"
            className="w-[80%]"
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
          <Link className="bg-purple-500 text-white w-[20%] h-10 rounded-md shadow-sm flex justify-center items-center">
            Verfiy
          </Link>
        </div>
        <span className="text-red-500 text-xs">
          {touched.email && errors.email}
        </span>
      </div>

      <div className="pb-2">
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

      <div className="pb-2">
        <InputLabel className="mb-1" required>
          Confirm password
        </InputLabel>
        <TextField
          type="password"
          size="small"
          variant="outlined"
          className="w-full"
          placeholder="Enter your confirm password"
          color="secondary"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            errors.confirmPassword && touched.confirmPassword ? true : false
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiLockPasswordLine className="text-lg" />
              </InputAdornment>
            ),
          }}
        />
        <span className="text-red-500 text-xs">
          {touched.confirmPassword && errors.confirmPassword}
        </span>
      </div>
      <div className="pb-2 flex flex-col">
        <InputLabel className="mb-1">ReferralCode</InputLabel>
        <TextField
          type="text"
          size="small"
          variant="outlined"
          className="w-[50%]"
          placeholder="Enter your Referral Code"
         
          color="secondary"
          name="parentReferralCode"
          value={values.parentReferralCode}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            errors.parentReferralCode && touched.parentReferralCode
              ? true
              : false
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaUserFriends className="text-lg" />
              </InputAdornment>
            ),
          }}
        />
        <span className="text-red-500 text-xs">
          {touched.parentReferralCode && errors.parentReferralCode}
        </span>
      </div>
      {errMsg && (
        <div className="flex justify-center">
          <span className="text-xs text-red-500">{errMsg}</span>
        </div>
      )}

      <div className="py-2">
        <button
          className="w-[30%] h-10 bg-purple-500
        text-white flex justify-center 
        items-center gap-2 text-lg rounded-md hover:bg-purple-700 transition-all"
        >
          <span>
            <CiLogin />
          </span>
          <span>Register</span>
        </button>
      </div>

      <div className="flex justify-center mt-2">
        <span className="flex items-center gap-1 text-base text-zinc-600 font-semibold">
          <span>Allready have an account?</span>
          <Link
            to={"/"}
            className="hover:text-purple-700 text-purple-500 cursor-pointer"
          >
            Sing In
          </Link>
        </span>
      </div>
      {loading && <LoadingSpinner/>}
    </form>
  );
};

export default UserRegister;
