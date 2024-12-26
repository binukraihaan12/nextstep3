import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { TeacherContext } from "../context/TeacherContext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(TeacherContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");

    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }

    if (dToken) {
      setDToken("");
      localStorage.removeItem("dToken");
    }
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 bg-white border-b">
      <div className="flex items-center gap-2 text-xs">
        <img
          onClick={() => {
            if (localStorage.getItem("aToken")) {
              navigate("/admin-dashboard");
            } else if (localStorage.getItem("dToken")) {
              navigate("/teacher-dashboard");
            } else {
              navigate("/");
            }
          }}
          src={assets.admin_logo}
          className="w-48 cursor-pointer"
        />

        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Teacher"}
        </p>
      </div>
      <div className="flex justify-between gap-3">
        <button
          onClick={logout}
          className="bg-blue-600 text-white text-sm px-8 py-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
