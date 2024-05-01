import React from "react";
import Sidebar from "../../../layouts/Sidebar";
import NavBar from "../../../layouts/Navbar";
import { InputAdornment, InputLabel, TextField } from "@mui/material";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { DatePicker, Select } from "antd";

const RewardPlanCreate = () => {
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
              //   onSubmit={handleSubmit} 
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
                     
                    name="name"
                    // value={values.name}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // error={errors.name && touched.name ? true : false}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaRegUser className="text-lg" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* <span className="text-red-500 text-xs">
                    {touched.name && errors.name}
                  </span> */}
                </div>

                <div className="pb-2">
                  <InputLabel className="mb-1" required>
                    Select Plan Type
                  </InputLabel>
                   <Select
                    placeholder="Select plan type"
                    style={{width:"100%", height:"40px"}}
                    className=" bg-zinc-50"
                   >           
                   </Select>
                  
                 
                 
                </div>

                <div className="pb-2">
                  <InputLabel className="mb-1" required>
                    Select expiry date
                  </InputLabel>
                   <DatePicker
                    placeholder="Select expiry date"
                    className=" bg-zinc-50"
                    style={{width:"100%", height:"40px"}} 
                   />
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

                    name="name"
                    // value={values.name}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // error={errors.name && touched.name ? true : false}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaRegUser className="text-lg" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* <span className="text-red-500 text-xs">
                    {touched.name && errors.name}
                  </span> */}
                </div>

                <div className="pb-2">
                  <InputLabel className="mb-1" required>
                    Enter Reward Point
                  </InputLabel>
                  <div className="flex gap-1">
                    <TextField
                      type="text"
                      size="small"
                      variant="outlined"
                      className="w-full bg-zinc-50"
                      placeholder="Enter Reward Point"
                      color="secondary"
                      name="email"
                    //   value={values.email}
                    //   onChange={handleChange}
                    //   onBlur={handleBlur}
                    //   error={errors.email && touched.email ? true : false}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MdOutlineMail className="text-lg" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  
                  </div>
                 
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
