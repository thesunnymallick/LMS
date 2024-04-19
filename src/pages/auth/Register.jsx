import React, { useState } from "react";
import registerBg from "../../assets/registerBg.png";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import { FaRegUser } from "react-icons/fa";
import UserRegister from "../../components/authCom/UserRegister";
const Register = () => {
  const [tab, setTab] = useState("1");

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  
  return (
    <div className="w-full h-screen  flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-sm flex gap-6 w-[70%]">
        <div className="flex-1 overflow-hidden bg-purple-200 rounded-s-lg">
          <img
            className="w-full object-cover rounded-s-lg"
            src={registerBg}
            alt="loginBg"
          />
        </div>
        <div className="flex-1 px-0">
          <div className="py-4">
            <h1 className="text-2xl text-zinc-900 font-bold">Create Your Account</h1>
            <p className="text-zinc-500 text-base">Join our community and unlock exclusive benefits!</p>
          </div>
          <div className="border-b-[1px] border-b-zinc-200 ">
            <TabContext    value={tab}>
              <TabList
              textColor="secondary"
              indicatorColor="secondary"
                onChange={handleTabChange}
                aria-label="lab API tabs example"
              >
                
                
                <Tab 
                icon={<FaRegUser className="text-lg"/>}
                // iconPosition="start"  
                label="User Register" value="1" 
                />
              
              </TabList>
            </TabContext>
          </div>
          <div className="px-2">
           {tab==="1" && (<UserRegister/>)}
          
          </div>
         

        </div>
      </div>
    </div>
  );
};

export default Register;
