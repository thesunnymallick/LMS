import React, { useEffect, useState } from "react";
import Sidebar from "../../layouts/Sidebar";
import AllUserTable from "../../components/adminCom/AllUserTable";
import { Avatar, Tag } from "antd";
import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import { InputAdornment, TextField } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import NotFoundProfile from "../../assets/noPicture.png"
import { useNavigate } from "react-router-dom";
const AllUsers = () => {

  const navigate=useNavigate()
  const [info, setInfo]=useState([])
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");



  const statusFilters = [
    { text: 'Active', value: true },
    { text: 'Inactive', value: false }
];
 



 
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render:(text, record)=>{
       
        return(
            <div className="flex items-center gap-1 text-lg">
                 <Avatar size={40} src={<img src={NotFoundProfile} alt="avatar"  />} />
                 <span>{record.name}</span>
            </div>
        )
      }
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile No",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
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
      title: "Total Referral",
      dataIndex: "referralCount",
      key: "referralCount",
      filters: [
        { text: '5 or more', value: '5' },
        { text: 'Less than 5', value: 'lessThan5' },
      ],
      onFilter: (value, record) => {
        if (value === '5') {
          return record.noOfLead >= 5;
        } else if (value === 'lessThan5') {
          return record.noOfLead < 5;
        }
      },
      render: (referralCount) => (
        <span>
          {referralCount >= 5 ? (
            <Tag color="success">{referralCount}</Tag>
          ) : (
            <Tag color="warning">{referralCount}</Tag>
          )}
        </span>
      ),
    },

    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      filters: statusFilters,
      onFilter: (value, record) => record.active === value,
      render: (active) => (
        <span  >
          {active===true ? (
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
      render: (text, record) => (
        <span
        onClick={()=>navigate(`/admin/users/${record.id}`)} 
         className="text-2xl cursor-pointer text-zinc-800 hover:text-purple-500">
          <HiOutlineDocumentChartBar />
        </span>
      ),
    },
  ];


  useEffect(()=>{

    const getAllusers=async()=>{
      try {
        const {data, status}=await axios.get(`${API_BASE_URL}/api/auth/dashboard/allCustomers`)
        if(status===200){
         setInfo(data?.data)
        }
      } catch (error) {
        setError('An error occurred while fetching users. Please try again later.');
      }
    }
     getAllusers()
  },[])

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = info.filter((user) =>
    Object.values(user).some((field) =>
      typeof field === "string"
        ? field.toLowerCase().includes(searchQuery.toLowerCase())
        : false
    )
  );

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

          <div className="flex justify-between py-6 px-4">
            <div className="w-[30%]">
              <TextField
                type="text"
                size="small"
                variant="outlined"
                className="w-full"
                placeholder="Search user"
                color="secondary"
                value={searchQuery}
                onChange={handleSearch}
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

          <AllUserTable info={filteredUsers} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
