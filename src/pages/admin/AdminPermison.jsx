import React, { useEffect, useState } from "react";
import Sidebar from "../../layouts/Sidebar";
import AllUserTable from "../../components/adminCom/AllUserTable";
import { Avatar, Modal, Space, Tag } from "antd";
import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import { InputAdornment, TextField } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import NotFoundProfile from "../../assets/noPicture.png";
import { useNavigate } from "react-router-dom";
import NavBar from "../../layouts/Navbar";
import { MdEditDocument } from "react-icons/md";
import AdminPermissonEdit from "../../components/adminCom/AdminPermissonEdit";
const AdminPermison = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isShowModal, setIsShowModal]=useState(false)
  const [userInfo, setUserInfo]=useState(null)
  


  const statusFilters = [
    { text: "Active", value: true },
    { text: "Inactive", value: false },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar size={40} src={<img src={NotFoundProfile} alt="avatar" />} />
          <div className="flex flex-col">
            <span className="text-sm text-zinc-800 font-medium">{record.name}</span>
            <span className="text-xs text-zinc-600">{"@user_123"}</span>
          </div>
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Referral Status",
      dataIndex: "referralStatus",
      key: "referralStatus",
      filters: [{ text: "Referred", value: true }, { text: "Not Referred", value: false }],
    //   filteredValue: filteredInfo.referralStatus || null,
      onFilter: (value, record) => record.referralStatus === value,
      render: (referralStatus) => (
        <Tag color={referralStatus ? "success" : "warning"}>
          {referralStatus ? "Referred" : "Not Referred"}
        </Tag>
      ),
    },
    {
      title: "Reward Access",
      dataIndex: "rewardAccess",
      key: "rewardAccess",
      filters: [{ text: "Enabled", value: true }, { text: "Disabled", value: false }],
    //   filteredValue: filteredInfo.rewardAccess || null,
      onFilter: (value, record) => record.rewardAccess === value,
      render: (rewardAccess) => (
        <Tag color={rewardAccess ? "success" : "warning"}>
          {rewardAccess ? "Enabled" : "Disabled"}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      filters: statusFilters,
    //   filteredValue: filteredInfo.active || null,
      onFilter: (value, record) => record.active === value,
      render: (active) => (
        <Tag color={active ? "success" : "error"}>{active ? "Active" : "Inactive"}</Tag>
      ),
    },
    {
      title: "Banned",
      dataIndex: "banned",
      key: "banned",
      filters: [{ text: "Banned", value: true }, { text: "Not Banned", value: false }],
    //   filteredValue: filteredInfo.banned || null,
      onFilter: (value, record) => record.banned === value,
      render: (banned) => (
        <Tag color={banned ? "error" : "success"}>{banned ? "Banned" : "Not Banned"}</Tag>
      ),
    },
    {
      title: "Freezed",
      dataIndex: "freezed",
      key: "freezed",
      filters: [{ text: "Freezed", value: true }, { text: "Not Freezed", value: false }],
    //   filteredValue: filteredInfo.freezed || null,
      onFilter: (value, record) => record.freezed === value,
      render: (freezed) => (
        <Tag color={freezed ? "warning" : "success"}>{freezed ? "Freezed" : "Not Freezed"}</Tag>
      ),
    },
    {
      title: "Locked",
      dataIndex: "locked",
      key: "locked",
      filters: [{ text: "Locked", value: true }, { text: "Not Locked", value: false }],
    //   filteredValue: filteredInfo.locked || null,
      onFilter: (value, record) => record.locked === value,
      render: (locked) => (
        <Tag color={locked ? "error" : "success"}>{locked ? "Locked" : "Not Locked"}</Tag>
      ),
    },
    {
      title: "View Info",
      dataIndex: "View Info",
      key: "status",
      render: (text, record) => (
        <span
          onClick={()=>{
            setIsShowModal(true)
            setUserInfo(record)
          }}
          className="text-2xl cursor-pointer text-zinc-800 hover:text-purple-500"
        >
          <MdEditDocument/>
        </span>
      ),
    },
  ];
 
  const getAllusers = async () => {
    try {
      const { data, status } = await axios.get(
        `${API_BASE_URL}/api/user-permission/get/all`
      );
      if (status === 200) {
        setInfo(data?.data);
      }
    } catch (error) {
      setError(
        "An error occurred while fetching users. Please try again later."
      );
    }
  };
  useEffect(() => {
    getAllusers();
  }, []);

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
      <div className="bg-gray-50 py-2 px-6 w-full">
        <NavBar/>
        <div className="flex items-center justify-between border-b-[1px] border-b-zinc-300 py-4">
          <div>
            <h1 className="text-2xl font-semibold">Users Permison</h1>
            <span className="text-base text-zinc-600">
              Explore and Manage All Users
            </span>
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
            <button className="w-[20%] h-10 bg-purple-500 text-white rounded-md flex justify-center items-center gap-2 ">
              <span>
                <FaFilter />
              </span>
              <span>Filter</span>
            </button>
          </div>

        </div>

        <div className="py-2  rounded-md mt-2">
          <AllUserTable info={filteredUsers} columns={columns} />
        </div>
      </div>
       <Modal
       width={1000} 
        title="Admin Premison"
        style={{
          top: 20,
        }}
        open={isShowModal}
        onCancel={() => {
            setIsShowModal(false)
            setUserInfo(null)
        }}
        footer={false}
        maskClosable={false}
      >
        <AdminPermissonEdit
         userInfo={userInfo} setUserInfo={setUserInfo} setIsShowModal={setIsShowModal} getAllusers={getAllusers}/>
      </Modal>
    </div>
  );
};

export default AdminPermison;

