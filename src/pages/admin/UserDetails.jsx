import React, { useEffect, useState } from 'react'
import Sidebar from '../../layouts/Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '../../config/apiConfig'
import NavBar from '../../layouts/Navbar'
import AllUserTable from '../../components/adminCom/AllUserTable'
import { HiOutlineDocumentChartBar } from 'react-icons/hi2'
import { Avatar, Tag } from 'antd'
import NotFoundProfile from "../../assets/u2.jpg";
const UserDetails = () => {

    const {id}=useParams()
    
    const [userInfo, setUserInfo]=useState(null)
    const navigate = useNavigate();
   
    
   useEffect(()=>{
    const getUserDetailsBy=async()=>{
        try {
           const {data, status}=await axios.get(`${API_BASE_URL}/api/auth/dashboard/customer?customerId=${id}`)
            if(status===200){
                setUserInfo(data?.data)
            }
        } catch (error) {
           
        }
       }
       getUserDetailsBy()
   },[id])


  //  "id": 10,
  //  "name": "John Doe",
  //  "profileImg": null,
  //  "age": null,
  //  "gender": null,
  //  "email": "johndo121@example.com",
  //  "mobileNumber": "9134567812",
  //  "address": null,
  //  "referralCount": 0,
  //  "active": true


  const statusFilters = [
    { text: "Active", value: true },
    { text: "Inactive", value: false },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        return (
          <div className="flex items-center gap-2 text-lg">
            <div>
            <Avatar
              size={40}
              src={<img src={NotFoundProfile} alt="avatar" />}
            />
            </div>
            <div className="flex flex-col">
            <span className="text-sm text-zinc-800 font-medium">{record.name}</span>
            <span className="text-xs text-zinc-600">{"@user_123"}</span>
            </div>
          </div>
        );
      },
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
      title: "Referral (T)",
      dataIndex: "referralCount",
      key: "referralCount",
      filters: [
        { text: "5 or more", value: "5" },
        { text: "Less than 5", value: "lessThan5" },
      ],
      onFilter: (value, record) => {
        if (value === "5") {
          return record.noOfLead >= 5;
        } else if (value === "lessThan5") {
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
        <span>
          {active === true ? (
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
          onClick={() => navigate(`/admin/users/${record.id}`)}
          className="text-2xl cursor-pointer text-zinc-800 hover:text-purple-500"
        >
          <HiOutlineDocumentChartBar/>
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
        <NavBar/>
        <div className="py-4">
        <h1 className="text-2xl font-semibold">Users leads Overview</h1>
        <span className="text-base text-zinc-600">
        Explore and Manage All Users
        </span>
        </div>


          <div className='flex gap-2 w-full'>
            <div className='flex-1'>
              <AllUserTable columns={columns} info={userInfo?.referralList}/>
            </div>
            <div className='flex-2  border-l-[1px]
             border-l-zinc-300 overflow-x-hidden px-4 overflow-y-auto h-[80vh]'>
              <div className='flex flex-col items-center'>
                <div className='w-36 h-40 p-1 bg-white rounded-md 
                flex justify-center
                 items-center border-2 border-purple-500' >
                  <img className='w-full h-full object-cover rounded-md' src={NotFoundProfile} 
                  alt="NotFoundIamge" />

               
                </div>
                <div className='flex flex-col items-center'>
                    <h1 className='text-zinc-700 text-lg'>Sunny Mallick</h1>
                    <span className='text-sm text-zinc-500'>@user_123</span>
                  </div>

              </div>
    

                <div className='flex flex-col gap-3 pt-5'>
                    <div className='flex items-center gap-1 text-sm'>
                      <span className='text-zinc-500 '>Name</span>
                      <span className='text-zinc-900 font-medium '>{userInfo?.name}</span>
                    </div>
                    <div className='flex items-center gap-1 text-sm'>
                      <span className='text-zinc-500 '>Email</span>
                      <span className='text-zinc-900 font-medium '>{userInfo?.email}</span>
                    </div>

                    <div className='flex items-center gap-1 text-sm'>
                      <span className='text-zinc-500 '>Mobile No</span>
                      <span className='text-zinc-900 font-medium '>{userInfo?.mobileNumber}</span>
                    </div>
                    <div className='flex items-center gap-1 text-sm'>
                      <span className='text-zinc-500 '>Age</span>
                      <span className='text-zinc-900 font-medium '>{userInfo?.age}</span>
                    </div>
                    <div className='flex items-center gap-1 text-sm'>
                      <span className='text-zinc-500 '>Gender</span>
                      <span className='text-zinc-900 font-medium '>{userInfo?.gender}</span>
                    </div>
                    <div className='flex items-center gap-1 text-sm'>
                      <span className='text-zinc-500 '>State</span>
                      <span className='text-zinc-900 font-medium '>{userInfo?.state}</span>
                    </div>
                    <div className='flex items-center gap-1 text-sm'>
                      <span className='text-zinc-500 '>Address</span>
                      <span className='text-zinc-900 font-medium '>{userInfo?.address } - {userInfo?.pinCode}</span>
                    </div>
                    <div className='flex items-center gap-1 text-sm'>
                      <span className='text-zinc-500 '>Total Refeeral</span>
                      <span className='text-zinc-900 font-medium '>
                        <Tag color='warning'>{userInfo?.referralCount}</Tag>
                      </span>
                    </div>
                </div>
                  <div className='flex justify-center mt-4 bg-gray-100 p-4 rounded-md'>
                    <span className='text-zinc-800 font-semibold text-sm'>Referral Code <Tag color='success'>{userInfo?.referralCode}</Tag></span>
                  </div>
            </div>
          </div>


       
      </div>
    </div>
  )
}

export default UserDetails
