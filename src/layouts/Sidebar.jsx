import { useContext, createContext, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { MdLeaderboard } from "react-icons/md";
import { LuUnlock } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import { GoGift } from "react-icons/go";
import {addLogout} from "../feature/LoginSlice"
import {useDispatch, useSelector} from "react-redux"
const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const dispatch=useDispatch()
  const [expanded, setExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState(null);
  const user = useSelector((state) => state.loginInfo.user);
  const admin = useSelector((state) => state.loginInfo.admin);
  const sidebarDataAdmin = [
    {
      icon: <MdDashboard />,
      text: "Dashboard",
      link: "/adminDashboard",
    },
    {
      icon: <FaUserGroup />,
      text: "Users",
      link: "/admin/users",
    },
    {
      icon: <MdLeaderboard />,
      text: "Leads",
      link: "/admin/leads",
    },
    {
      icon: <LuUnlock />,
      text: "Permission",
      link: "/admin/permission",
    },
    {
      icon: <GoGift />,
      text: "Reward",
      link: "/admin/reward",
    },
    {
      icon: <IoIosLogOut />,
      text: "Logout",
      link: "/",
    },
  ];

  const sidebarDataUser = [
    {
      icon: <MdDashboard />,
      text: "Dashboard",
      link: "/user/dashboard",
    },
    {
      icon: <GoGift />,
      text: "Gift",
      link: "/user/gift",
    },
    {
      icon: <IoIosLogOut />,
      text: "Logout",
      link: "/",
    },
  ];


  // Function to handle sidebar item click
  const handleItemClick = (text) => {
    setActiveItem(text === activeItem ? null : text); // Toggle active state
    if(text==="Logout"){
      dispatch(addLogout())
    }
  };
  
  const sideBarData = admin.isAdmin ? sidebarDataAdmin : sidebarDataUser;

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pt-3  pb-2 flex justify-between items-center">
          <img
            src={logo}
            className={`overflow-hidden transition-all ${
              expanded ? "w-16" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            {sideBarData?.map((item) => {
              return (
                <SidebarItem
                  key={item?.text}
                  text={item?.text}
                  icon={item?.icon}
                  link={item?.link}
                  active={item?.text === activeItem} // Pass active state
                  onClick={() => handleItemClick(item?.text)}
                  
                />
              );
            })}
           
          </ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{admin.isAdmin ? admin.adminName : user.userName}</h4>
              <span className="text-xs text-gray-600">
                {admin.isAdmin ? admin.adminEmail : user.userEmail}
              </span>
            </div>
            {/* <MoreVertical size={20} /> */}
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, onClick, link }) {
  const { expanded } = useContext(SidebarContext);
  
  return (
    <Link
      to={link}
      onClick={onClick}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </Link>
  );
}
