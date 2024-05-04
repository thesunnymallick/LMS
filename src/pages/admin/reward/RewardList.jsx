import React, { useEffect, useState } from "react";
import Sidebar from "../../../layouts/Sidebar";
import NavBar from "../../../layouts/Navbar";
import { FaFilter } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { InputAdornment, TextField } from "@mui/material";
import { MdEditDocument } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import AllUserTable from "../../../components/adminCom/AllUserTable";
import axios from "axios";
import { API_BASE_URL } from "../../../config/apiConfig";
import { Modal, Tag } from "antd";
import PlanEdit from "../../../components/rewardCom/PlanEdit";

const RewardList = () => {
  const [rewardList, setRewardList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  console.log(isUpdate)

  const columns = [
    {
      title: "Reward Name",
      dataIndex: "rewardName",
      key: "rewardName",
    },
    {
      title: "Reward Type",
      dataIndex: "rewardType",
      key: "rewardType",
    },
    {
      title: "rewardCouponCode",
      dataIndex: "rewardCouponCode",
      key: "",
    },
    {
      title: "Reward Value",
      dataIndex: "rewardValue",
      key: "",
    },

    {
      title: "Reward Point",
      dataIndex: "rewardPoints",
      key: "",
    },

    {
      title: "Status",
      dataIndex: "hasExpiration",
      key: "",
      render: (hasExpiration) => (
        <span>
          {hasExpiration === true ? (
            <Tag color="success">Active</Tag>
          ) : (
            <Tag color="error">Expired</Tag>
          )}
        </span>
      ),
    },
    {
      title: "Edit",
      dataIndex: "",
      key: "",
      render: (text, record) => (
        <span
          onClick={() => {
            setIsUpdate(true)
            setIsShowModal(true)
          }}
          className="text-2xl cursor-pointer text-zinc-400 hover:text-green-700"
        >
          <MdEditDocument />
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
          <RiDeleteBin5Line />
        </span>
      ),
    },
  ];

  // Get All Reward List
  useEffect(() => {
    const getAllRewardList = async () => {
      try {
        const { data, status } = await axios.get(`${API_BASE_URL}/rewards/all`);
        if (status === 200) {
          setRewardList(data?.data);
        }
      } catch (error) {}
    };
    getAllRewardList();
  }, []);

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
          <AllUserTable info={rewardList} columns={columns} />
        </div>
      </div>

      {isUpdate && (
        <Modal
          width={1000}
          title="Reward Plan Edit"
          style={{
            top: 20,
          }}
          open={isShowModal}
          onCancel={() => {
            setIsShowModal(false);
            setIsUpdate(false);
          }}
          footer={false}
          maskClosable={false}
        >
          <PlanEdit />
        </Modal>
      )}
    </div>
  );
};

export default RewardList;
