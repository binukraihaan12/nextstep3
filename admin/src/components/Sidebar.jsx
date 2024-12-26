import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { TeacherContext } from "../context/TeacherContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(TeacherContext);

  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to={"/admin-dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-blue-500" : ""
              }`
            }
          >
            <img src={assets.home_icon} alt="home" />
            <p className="">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-blue-500" : ""
              }`
            }
            to={"all-appointments"}
          >
            <img src={assets.appointment_icon} alt="home" />
            <p className="">Q&A Sessions</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-blue-500" : ""
              }`
            }
            to={"/add-teacher"}
          >
            <img src={assets.add_icon} alt="home" />
            <p className="">Add Teacher</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-blue-500" : ""
              }`
            }
            to={"/teacher-list"}
          >
            <img src={assets.people_icon} alt="home" />
            <p className="">Teacher List</p>
          </NavLink>
        </ul>
      )}

      {/* Teacher Sidebar */}
      {dToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to={"/teacher-dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-blue-500" : ""
              }`
            }
          >
            <img src={assets.home_icon} alt="home" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-blue-500" : ""
              }`
            }
            to={"/teacher-appointment"}
          >
            <img src={assets.appointment_icon} alt="home" />
            <p className="hidden md:block">Q&A Sessions</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-blue-500" : ""
              }`
            }
            to={"/teacher-Profile"}
          >
            <img src={assets.people_icon} alt="home" />
            <p className="hidden md:block">Teacher Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
