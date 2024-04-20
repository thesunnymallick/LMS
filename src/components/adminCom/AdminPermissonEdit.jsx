import { Radio, message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { API_BASE_URL } from '../../config/apiConfig';
import { GoShieldLock } from "react-icons/go";
import { toast } from 'react-toastify';

const AdminPermissionEdit = ({userInfo, setUserInfo, setIsShowModal, getAllusers}) => {
    console.log(userInfo)
    const [statuses, setStatuses] = useState({
        banStatus: false,
        lockedStatus: false,
        freezedStatus: false,
        activeStatus: true,
        rewardAccessStatus: true,
        referralStatus :true,

    });

    const handleStatusChange = (key, value) => {
        setStatuses(prevStatuses => ({
            ...prevStatuses,
            [key]: value,
        }));
    };


    const handelUpdateStatus=async()=>{
        const newData={
            name: userInfo?.name,
            email: userInfo?.email,
            banned: statuses?.banStatus,
            locked: statuses?.lockedStatus,
            freezed: statuses?.freezedStatus,
            active: statuses?.activeStatus,
            referralStatus: statuses.referralStatus,
            rewardAccess: statuses?.rewardAccessStatus
        
        }
        try {
         const {status}=await axios.post(`${API_BASE_URL}/api/user-permission/update?id=${userInfo?.id}`, newData);
         if(status===200)  {
            setUserInfo(null)
            getAllusers()
            setIsShowModal(false)
            toast.success("Permisson updated", {
                position: "top-right",
                autoClose: 2000,
              });
         } 
        } catch (error) {
            console.log(error)
        }
    }

    const getStatusDescription = (key) => {
        switch (key) {
            case 'banStatus':
                return "Indicates if the user's account is currently banned. When banned, the user is prohibited from accessing the platform due to violations of community guidelines or terms of service.";
            case 'lockedStatus':
                return "Indicates if the user's account is currently locked for security reasons. When locked, the user is temporarily unable to access their account until the issue is resolved.";
            case 'freezedStatus':
                return "Indicates if the user's account is currently frozen. When frozen, the user's account activities are temporarily suspended, usually due to suspicious or unusual activities.";
            case 'activeStatus':
                return "Indicates if the user's account is currently active. When active, the user has full access to the platform and its features.";
            case 'rewardAccessStatus':
                return "Indicates if the user has access to reward programs. When enabled, the user can participate in various reward schemes and earn incentives based on their interactions and contributions.";
                case 'referralStatus':
                    return "Indicates if the user has access to reward programs. When enabled, the user can participate in various reward schemes and earn incentives based on their interactions and contributions.";
            default:
                return "";
        }
    };
    return (
        <div className='py-6 px-6'>
            {Object.entries(statuses).map(([key, value]) => (
                <div className='flex justify-between items-center px-6 p-2 border-t-[1px] border-b-zinc-300' key={key}>
                    <div className='flex-1 flex flex-col'>
                        <h1 className='text-lg text-zinc-700 font-bold capitalize'>User {key.replace(/([A-Z])/g, ' $1').trim()}</h1>
                        <p className='text-sm text-zinc-400 w-[70%] '>{getStatusDescription(key)}</p>
                    </div>
                    <div className='flex-2'>
                        <Radio.Group
                            value={value}
                            onChange={(e) => handleStatusChange(key, e.target.value)}
                            style={{ marginBottom: 16 }}
                        >
                            <Radio.Button value={true} style={{ background: value === true ? '#4CAF50' : '', color: value === true ? 'white' : '' }}>YES</Radio.Button>
                            <Radio.Button value={false} style={{ background: value === false ? '#4CAF50' : '', color: value === false ? 'white' : '' }}>NO</Radio.Button>
                        </Radio.Group>
                    </div>
                </div>
            ))}
            <div className='flex justify-center mt-4'>
              <button 
              onClick={handelUpdateStatus}
              className='w-[20%] h-10 text-lg bg-purple-500 text-white rounded-md shadow-sm flex
               justify-center
               items-center gap-2 uppercase hover:bg-purple-600'>
                <span><GoShieldLock/></span>
                  <span>Update</span>
              </button>
            </div>
        </div>
    );
};



export default AdminPermissionEdit;
