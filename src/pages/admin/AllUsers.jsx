import React from "react";
import Sidebar from "../../layouts/Sidebar";
import AllUserTable from "../../components/adminCom/AllUserTable";
import { Avatar, Tag } from "antd";
import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import { InputAdornment, TextField } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import u1 from "../../assets/u1.jpg"
import u2 from "../../assets/u2.jpg"
import u3 from "../../assets/u3.jpg"
import u4 from "../../assets/u4.jpg"
const AllUsers = () => {
  const data = [
    {
      key: "1",
      name: "Mike",
      profileImg:u1,
      age: 32,
      gender: "Male",
      email: "test123@gmail.com",
      mobileNo: "6297171058",
      address: "10 Downing Street",
      noOfLead: 3,
      status: true,
    },
    {
      key: "2",
      name: "John",
      profileImg:u2,
      age: 42,
      gender: "Male",
      mobileNo: "6297172388",
      email: "test1234@gmail.com",
      address: "10 Downing Street",
      noOfLead: 5,
      status: false,
    },
  ];

  // Function to generate user objects
function generateUser(key, name, profileImg, age, gender, email, mobileNo, address, noOfLead, status) {
    return {
      key,
      name,
      profileImg,
      age,
      gender,
      email,
      mobileNo,
      address,
      noOfLead,
      status,
    };
  }
  const images = [u1, u2, u3, u4];
 
  // Generate 10 more users with u1, u2, u3, u4 images
for (let i = 3; i <= 7; i++) {
    data.push(
      generateUser(
        `${i}`,
        `User${i}`,
        images[i % images.length], // Rotating through u1, u2, u3, u4 for profile images
        Math.floor(Math.random() * 30) + 20, // Random age between 20 and 49
        i % 2 === 0 ? "Male" : "Female",
        `test${i}@gmail.com`,
        `629717${Math.floor(Math.random() * 10000)}`,
        "Random Address",
        Math.floor(Math.random() * 10),
        i % 2 === 0
      )
    );
  }
  console.log(data)
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render:(text, record)=>{
       
        return(
            <div className="flex items-center gap-1 text-lg">
                 <Avatar size={40} src={<img src={record.profileImg} alt="avatar"  />} />
                 <span>{record.name}</span>
            </div>
        )
      }
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "name",
    },
    {
      title: "Mobile No",
      dataIndex: "mobileNo",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },

    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Total Lead",
      dataIndex: "noOfLead",
      key: "noOfLead",
      render: (noOfLead) => (
        <span>
          {noOfLead >= 5 ? (
            <Tag color="success">{noOfLead}</Tag>
          ) : (
            <Tag color="warning">{noOfLead}</Tag>
          )}
        </span>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span>
          {status ? (
            <Tag color="success">Active</Tag>
          ) : (
            <Tag color="error">Inactive</Tag>
          )}
        </span>
      ),
    },
    {
      title: "View Info",
      dataIndex: "View Info",
      key: "status",
      render: () => (
        <span className="text-2xl cursor-pointer text-zinc-800 hover:text-purple-500">
          <HiOutlineDocumentChartBar />
        </span>
      ),
    },
  ];

  return (
    <div className="flex">
      <div className="">
        <Sidebar />
      </div>
      <div className="bg-zinc-50 py-2 px-6 w-full">
        
        <div className="py-4">
        <h1 className="text-2xl font-semibold">Users Overview</h1>
        <span className="text-base text-zinc-600">
        Explore and Manage All Users
        </span>
        </div>

        <div className="px-4 py-2 bg-white rounded-md mt-5">
          <div className="flex justify-between py-3">
            <div className="w-[30%]">
              <TextField
                type="text"
                size="small"
                variant="outlined"
                className="w-full"
                placeholder="Search user"
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
            <button className="w-[10%] h-10 bg-purple-500 text-white rounded-md flex justify-center items-center gap-2 ">
              <span><FaFilter/></span>
               <span>Filter</span>
            </button>
          </div>
          <AllUserTable info={data} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
