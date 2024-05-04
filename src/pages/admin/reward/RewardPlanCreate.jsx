import React, { useEffect, useState } from "react";
import Sidebar from "../../../layouts/Sidebar";
import NavBar from "../../../layouts/Navbar";
import { InputAdornment, InputLabel, TextField } from "@mui/material";
import { DatePicker, Select, message } from "antd";
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from "axios";
import { API_BASE_URL } from "../../../config/apiConfig";
import dayjs from "dayjs";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { GrPlan } from "react-icons/gr";


const rewardSchema = yup.object().shape({
  rewardName: yup.string().required("Reward name is required."),
  rewardType: yup.string().required("Reward type is required."),
  rewardValue: yup.number().required("Reward value is required."),
  rewardPoints: yup.number().required("Reward points are required."),
  expirationDate: yup
  .number()
  .typeError("Expiration date must be a number")
  .positive("Expiration date must be a positive number")
  .integer("Expiration date must be an integer")
  .moreThan(0, "Expiration date must be greater than 0")
  .required("Expiration date is required.")
});
const RewardPlanCreate = () => {


   const [rewardType, setRewardType]=useState([])
   const [defaultExpDate, setDefaultExpDate] = useState(dayjs());
   const [errMsg, setErrMsg]=useState('');
   
   const rewardData={
    rewardName: "",
    rewardType: "",
    rewardCode: "",
    rewardCouponCode: "",
    rewardValue: "",
    rewardPoints: "",
    expirationDate: "",
   }


   // Create Reward
   const handelRewardPlanCreate=async(newData)=>{
    try {
      const {status}=await axios.post(`${API_BASE_URL}/rewards/create`, newData);
      if(status===200){
        message.success('Plan Create Successfull')
        setErrMsg('')
      }
    } catch (error) {
        if (error.response.data.status === 400) {
          setErrMsg(error.response.data.data);
        }
      
    }
   }

   useEffect(()=>{
   
      const getAllReawrdType=async()=>{
       try {
        const {status, data}=await axios.get(`${API_BASE_URL}/rewards/get/planName`)
        if(status===200){
          setRewardType(data?.data)
        }
       } catch (error) {
        
       }
      }
      getAllReawrdType()

  
   },[])

  




  const { handleChange, values, errors, setFieldValue, touched, handleBlur, handleSubmit } =
  useFormik({
     initialValues: rewardData,
     validationSchema: rewardSchema,
    onSubmit: (values) => {
      if (values) {
         handelRewardPlanCreate(values)
      }
    },
  });


   // Convert Date to days
   const handelExpDate=(date)=>{
    if (date) {

      if (date && date >= new Date()) {
        setDefaultExpDate(date);
        const today = new Date();
      const expDate = new Date(date);
      const timeDiff = expDate.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setFieldValue("expirationDate", daysDiff)
      } else {
        message.error('Please select a future date');
      }
      
      
    }
   }

  return (
    <div className="flex">
      <div className="">
        <Sidebar />
      </div>
      <div className="bg-gray-50 py-2 px-6 w-full">
        <NavBar />
        <div className="border-b-[1px]  py-4">
          <div>
            <h1 className="text-2xl font-semibold">Reward Plan Create</h1>
            <span className="text-base text-zinc-600">
              Explore and Manage All Users
            </span>
          </div>

          <div className="bg-white px-6 py-5 mt-5 rounded-md shadow-sm">
    
              <form 
                 onSubmit={handleSubmit} 
              className="px-2 py-6" action="">

            <div className="flex gap-6">
                
            <div className="flex flex-1 flex-col gap-1">
              <div className="pb-2">
                  <InputLabel className="mb-1" required>
                    Enter  Plan Name
                  </InputLabel>
                  <TextField
                    type="text"
                    size="small"
                    variant="outlined"
                    className="w-full bg-zinc-50"
                    placeholder="Enter Plan Name"
                    color="secondary"
                    name="rewardName"
                    value={values.rewardName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.rewardName && touched.rewardName ? true : false}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <GrPlan className="text-lg" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <span className="text-red-500 text-xs">
                    {touched.rewardName && errors.rewardName}
                  </span>
                </div>

                <div className="pb-2">
                  <InputLabel className="mb-1" required>
                    Select Plan Type
                  </InputLabel>
                   <Select
                    placeholder="Select plan type"
                    style={{width:"100%", height:"40px"}}
                    className=" bg-zinc-50"
                    value={values.rewardType}
                    onChange={(value)=>setFieldValue("rewardType", value)}
                    onBlur={handleBlur}
                   >
                    {
                      rewardType.map((item, index)=>{
                        return(
                          <Select.Option key={index} value={item}>{item}</Select.Option>
                        )
                      })
                    }           
                   </Select>
                   <span className="text-red-500 text-xs">
                    {touched.rewardType && errors.rewardType}
                  </span>
                  
                 
                 
                </div>

                <div className="pb-2">
                  <InputLabel className="mb-1" required>
                    Select expiry date
                  </InputLabel>
                   <DatePicker
                    placeholder="Select expiry date"
                    className=" bg-zinc-50"
                    style={{width:"100%", height:"40px"}} 
                    value={defaultExpDate}
                    onChange={handelExpDate}
                    disabledDate={(current) => current && current < new Date()}
                    defaultValue={defaultExpDate}
                   

                   />
                </div>

                <div className="pb-2">
                  <InputLabel className="mb-1" required>
                    Exp Days
                  </InputLabel>
                  <TextField
                    disabled
                    type="text"
                    size="small"
                    variant="outlined"
                    className="w-full bg-zinc-200"
                    placeholder="Exp Days"
                    color="secondary"
                    value={`${values.expirationDate && values.expirationDate + " Days"}`}
                    error={errors.expirationDate && touched.expirationDate ? true : false}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CiCalendarDate className="text-lg" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <span className="text-red-500 text-xs">
                    {touched.expirationDate && errors.expirationDate}
                  </span>
                </div>

    


              
              </div>


              <div className="flex flex-1 flex-col gap-1">


              <div className="pb-2">
                  <InputLabel className="mb-1" required>
                    Enter Reward Amount
                  </InputLabel>
                  <TextField
                    type="text"
                    size="small"
                    variant="outlined"
                    className="w-full bg-zinc-50"
                    placeholder="Enter Reward Amount"
                    color="secondary"
                    name="rewardValue"
                    value={values.rewardValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.rewardValue && touched.rewardValue ? true : false}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MdOutlineCurrencyRupee className="text-lg" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <span className="text-red-500 text-xs">
                    {touched.rewardValue && errors.rewardValue}
                  </span>
                </div>

                <div className="pb-2">
                  <InputLabel className="mb-1" required>
                    Enter Reward Point
                  </InputLabel>
                  <TextField
                      type="text"
                      size="small"
                      variant="outlined"
                      className="w-full bg-zinc-50"
                      placeholder="Enter Reward Point"
                      color="secondary"
                      name="rewardPoints"
                      value={values.rewardPoints}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.rewardPoints && touched.rewardPoints ? true : false}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BsCashCoin className="text-lg" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    
                     <span className="text-red-500 text-xs">
                    {touched.rewardPoints && errors.rewardPoints}
                  </span>
                  
                  
                 
                </div>

                <div className="pb-2">
                  <InputLabel className="mb-1" required>
                    Enter Description
                  </InputLabel>
                  <TextField
                    type="text"
                    size="small"
                    variant="outlined"
                    className="w-full bg-zinc-50"
                    multiline
                    placeholder="Enter Description"
                    color="secondary"
                    name="password"
                    // value={values.password}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // error={errors.password && touched.password ? true : false}
                    // InputProps={{
                    //   startAdornment: (
                    //     <InputAdornment position="start">
                    //       <RiLockPasswordLine className="text-lg" />
                    //     </InputAdornment>
                    //   ),
                    // }}
                  />
                  {/* <span className="text-red-500 text-xs">
                    {touched.password && errors.password}
                  </span> */}
                </div>

              
              </div>
            </div>

            <div className="flex justify-center py-4">
              <span className="text-red-500 text-xs">{errMsg}</span>
            </div>

            <div className="mt-2 flex justify-end">
              <button className="w-[20%] h-10 flex justify-center items-center gap-2
               text-white bg-purple-500 text-lg hover:bg-purple-600 transition-all rounded-md shadow-sm">
                <span></span>
                <span>Create</span>
              </button>
            </div>

              
              

              

              </form>


          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardPlanCreate;
