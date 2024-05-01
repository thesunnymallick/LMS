import React, {useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";

import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { MdLeaderboard } from "react-icons/md";
import { LuUnlock } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import { GoGift } from "react-icons/go";
import {addLogout} from "../feature/LoginSlice"
import {useDispatch, useSelector} from "react-redux"
import { Menu } from "antd";
import { VerticalLeftOutlined, VerticalRightOutlined } from "@ant-design/icons";
import noProfile from '../assets/noPicture.png'
import { RiFileList3Line } from "react-icons/ri";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";


export default function Sidebar({ children }) {
  const dispatch=useDispatch()
  const [collapsed, setCollapsed] = useState(false);
  const admin = useSelector((state) => state.loginInfo.admin);
  
  const sidebarDataAdmin = [
    {
      icon: <MdDashboard />,
      name: "Dashboard",
      link: "/adminDashboard",
      menus:[]
    },
    {
      icon: <FaUserGroup />,
      name: "Users",
      link: "/admin/users",
      menus:[]
    },
    {
      icon: <MdLeaderboard />,
      name: "Leads",
      link: "/admin/leads",
      menus:[]
    },
    {
      icon: <LuUnlock />,
      name: "Permission",
      link: "/admin/permission",
      menus:[]
    },
    {
      icon: <GoGift />,
      name: "Reward",
      link: "/admin/reward",
      menus:[
        {
          icon: <MdOutlineCreateNewFolder/>,
          name :"Plan Create",
          link:"/admin/reward/planCreate"
        },
        {
          icon: <RiFileList3Line/>,
          name :"All Reward List",
          link:"/admin/reward/reward-list"
        },
        {
          icon:<RiAdminLine/>,
          name:"Reward Access",
          link:"/admin/reward/reward-access"
        }
      ]
    },
    {
      icon: <IoIosLogOut />,
      name: "Logout",
      link: "/",
      
    },
  ];

  const sidebarDataUser = [
    {
      icon: <MdDashboard />,
      name: "Dashboard",
      link: "/user/dashboard",
      menus:[]
    },
    {
      icon: <GoGift />,
      name: "Gift",
      link: "/user/gift",
      menus:[]
    },
    {
      icon: <IoIosLogOut />,
      name: "Logout",
      link: "/",
      menus:[]
    },
  ];
  const iconSize = collapsed===true ? 20 : 24 ; // Consistent icon size



  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  

  const handleLogout = (name) => {
    
    if (name ==="Logout") {
      dispatch(addLogout());
    }
  };
  
  const sideBarData = admin?.isAdmin ? sidebarDataAdmin : sidebarDataUser;


 
  const transformedItems = sideBarData.map((submenu) => {
    if (submenu.menus &&  submenu.menus.length > 0) {
      return {
        key: submenu.link,
        icon: submenu.icon,
        label: submenu.name,
        children: submenu.menus.map((menu) => ({
          key: menu.link,
          icon: menu.icon,
          label: menu.name,
        })),
      };
    } else {
      return {
        key: submenu.link,
        icon: React.cloneElement(submenu.icon, { size: "12" }),
        label: submenu.name,
      };
    }
  });
  
  const items = transformedItems.map((item, index) => {
    if (item.children) {
      return (
        <Menu.SubMenu key={item.key} title={item.label} icon={React.cloneElement(item.icon, { size: iconSize })}>
          {item.children.map((childItem) => (
            <Menu.Item key={childItem.key} icon={React.cloneElement(childItem.icon, { size: 18 })}>
              <Link to={childItem.key} style={{ fontSize: "14px" }}>{childItem.label}</Link>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      );
    } else {
      return (
        <Menu.Item onClick={() => handleLogout(item.label)}  key={item.key} icon={React.cloneElement(item.icon, { size: iconSize })}>
          <Link  to={item.key} style={{ fontSize: "16px" }}>{item.label}</Link>
        </Menu.Item>
      );
    }
  });
  return (
   

    <div style={{ width: collapsed ? 80 : 270, height: "100%", position: "relative", zIndex: "999" }}>
      <div className="scrollbar bg-white relative lg:fixed lg:h-[100vh]" style={{ overflowY: "auto", overflowX: "hidden", width: collapsed ? 80 : 270 }}>
        <Menu  defaultSelectedKeys={["0"]} mode="inline" inlineCollapsed={collapsed}>
          <div className={`flex items-center  ${collapsed===true ? "justify-center" :"justify-between"} 
           border-b-[1px] border-b-zinc-300  p-4 mb-5`}>
            {!collapsed && <img className="w-16" src={logo} alt="companylogo" />}
            <div>
              <span onClick={toggleCollapsed} className="text-lg text-zinc-900 font-bold cursor-pointer">{collapsed ? <VerticalLeftOutlined /> : <VerticalRightOutlined />}</span>
            </div>
          </div>
          {items}

          <div className="px-4 py-4 absolute bottom-0 w-full border-t-[1px] border-t-zinc-300">
              <div className="flex items-center gap-2">
               <div className="w-10 h-10 rounded-full  flex justify-center items-center">
               <img className="w-full h-full rounded-full object-cover" src={noProfile} alt="" />
               </div>
              {
                !collapsed &&  <div className="flex flex-col">
                <span className="text-zinc-700 text-lg">Sunny Mallick</span>
                <span className="text-zinc-500 text-sm">sunny@123gmail.com</span>
               </div>
              }
              </div>
          </div>
        </Menu>
      </div>
    </div>
  );
}


