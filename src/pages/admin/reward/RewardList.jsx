import React from "react";
import Sidebar from "../../../layouts/Sidebar";
import NavBar from "../../../layouts/Navbar";
import { FaFilter } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { InputAdornment, TextField } from "@mui/material";
import { MdEditDocument } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import AllUserTable from "../../../components/adminCom/AllUserTable";

const RewardList = () => {
    const info=[]
    const columns = [
        {
          title: "Plan Name",
          dataIndex: "",
          key: "",
          
        },
        {
          title: "Plan Type",
          dataIndex: "",
          key: "",
        },
        {
          title: "Expiry date",
          dataIndex: "",
          key: "",
        },
        {
          title: "Reward Amount",
          dataIndex: "",
          key: "",
        },
    
        {
          title: "Reward Point",
          dataIndex: "",
          key: "",
        },

        {
          title: "Status",
          dataIndex: "",
          key: "",
         
        },
        {
          title: "Edit",
          dataIndex: "",
          key: "",
          render: (text, record) => (
            <span
            //   onClick={() => navigate(`/admin/users/${record.id}`)}
              className="text-2xl cursor-pointer text-zinc-800 hover:text-purple-500"
            >
             <MdEditDocument/> 
            </span>
          ),
        },
        {
            title: "Delete",
            dataIndex: "",
            key: "",
            render: (text, record) => (
              <span
              //   onClick={() => navigate(`/admin/users/${record.id}`)}
                className="text-2xl cursor-pointer text-zinc-800 hover:text-purple-500"
              >
               <RiDeleteBin5Line/> 
              </span>
            ),
          },
      ];
  return (
    <div className="flex">
      <div className="">
        <Sidebar />
      </div>
      <div className="bg-gray-50 py-2 px-6 w-full">
        <NavBar />
        <div className=" flex items-center justify-between border-b-[1px] border-b-zinc-300 py-4">
          <div>
            <h1 className="text-2xl font-semibold">All Reward List</h1>
            <span className="text-base text-zinc-600">Explore Reward list</span>
          </div>
          <div className="flex w-[50%] justify-end gap-3">
            <div className="w-[50%]">
              <TextField
                type="text"
                size="small"
                variant="outlined"
                className="w-full"
                placeholder="Search user"
                color="secondary"
                // value={searchQuery}
                // onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaSearch className="text-lg" />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <button
              className="w-[20%] h-10
             bg-purple-500 text-white rounded-md flex justify-center items-center gap-2 "
            >
              <span>
                <FaFilter />
              </span>
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="py-2  rounded-md mt-2">
          <AllUserTable
           info={info} 
           columns={columns} 
           />
        </div>
      </div>
    </div>
  );
};

export default RewardList;
