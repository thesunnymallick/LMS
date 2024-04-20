import { InputAdornment, TextField } from "@mui/material";
import { Badge } from "antd";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import userPng from "../assets/u1.jpg"
const NavBar = () => {
  return (
    <div className="py-2 px-4 
     border-b-[1px] border-b-zinc-300  bg-zinc-50 flex justify-between items-center sticky top-0 z-50 ">
      <div className="w-[30%] pb-3">
        <TextField
          type="text"
          size="small"
          variant="outlined"
          className="w-full rounded-lg"
          placeholder="What are looking for?"
          color="secondary"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch className="text-lg" />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className="flex items-center gap-4">
      <div className="flex justify-center items-center">
      <Badge size="small"  status="success" dot offset={[-10, 3]} >
       <IoIosNotificationsOutline className="text-3xl"/>
      </Badge>
      </div>
      <div className="flex items-center gap-2">
         <div className="w-10 h-10 rounded-full">
          <img className="w-full h-full object-cover rounded-full" src={userPng} alt="" />
         </div>
           <div className="flex flex-col">
            <span className="text-zinc-900 text-sm font-medium">Sunny Mallick</span>
            <span className="text-zinc-500 text-xs">sunny@gmail.ocm</span>
           </div>
      </div>
      </div>
    </div>
  );
};

export default NavBar;
