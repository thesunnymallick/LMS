import React, { useState } from "react";
import loginBg from "../../assets/loginBg.jpg";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import UserLogin from "../../components/authCom/UserLogin";
import AdminLogin from "../../components/authCom/AdminLogin";
const Login = () => {
  const [tab, setTab] = useState("1");

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <div className="w-full h-screen  flex justify-center items-center bg-zinc-50">
      <div className="bg-white  shadow-sm  rounded-lg flex gap-6 w-[70%]">

        <div className="flex-1 overflow-hidden  rounded-s-lg">
          <img
            className="w-full h-full object-cover "
            src={loginBg}
            alt="loginBg"
          />
        </div>

        <div className="flex-1 ">
          <div className="py-4">
            <h1 className="text-2xl text-zinc-900 font-bold">Welcome To LMS</h1>
            <p className="text-zinc-500 text-base">Login your account</p>
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
                label="User Login" value="1" 
                />
                <Tab
                //   iconPosition="start" 
                  icon={<MdOutlineAdminPanelSettings className="text-lg"/>} label="Admin Login" value="2" />
              </TabList>
            </TabContext>
          </div>
          <div className="px-2">
           {tab==="1" && (<UserLogin/>)}
           {tab==="2" && (<AdminLogin/>)}
          </div>
         

        </div>
      </div>
    </div>
  );
};

export default Login;
