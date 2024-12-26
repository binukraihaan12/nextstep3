import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  // const [token, setToken] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300 px-4 md:px-8">
      <img
        onClick={() => navigate("/")}
        className="w-48 cursor-pointer"
        src={assets.log || "/Picture1.png"}
        alt="logo"
      />
      {/* <p
        onClick={() => navigate("/")}
        className="text-[1.5rem] cursor-pointer font-bold text-blue-950"
      >
        NextStep
      </p> */}
      <ul className="hidden md:flex items-center gap-6 font-medium">
        <NavLink to="/" className="py-2 hover:text-blue-600">
          HOME
          <hr className="border-none outline-none h-0.5 w-3/5 m-auto mt-0.5 bg-blue-800 hidden" />
        </NavLink>
        <NavLink to="/teachers" className="py-2 hover:text-blue-600">
          ALL TEACHERS
          <hr className="border-none outline-none h-0.5 w-3/5 m-auto mt-0.5 bg-blue-800 hidden" />
        </NavLink>
        <NavLink to="/about" className="py-2 hover:text-blue-600">
          ABOUT
          <hr className="border-none outline-none h-0.5 w-3/5 m-auto mt-0.5 bg-blue-800 hidden" />
        </NavLink>
        <NavLink to="/contact" className="py-2 hover:text-blue-600">
          CONTACT US
          <hr className="border-none outline-none h-0.5 w-3/5 m-auto mt-0.5 bg-blue-800 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                className="w-8 h-8 rounded-full"
                src={userData.image}
                alt="profile-pic"
              />
              <img
                className="w-3 cursor-pointer"
                src={assets.dropdown_icon}
                alt="dropdown"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(!showDropdown); // Toggle dropdown visibility on arrow click
                }}
              />
            </div>
            {showDropdown && (
              <div className="absolute right-0 w-48 bg-stone-50 shadow-lg rounded-lg z-20">
                <div className="p-4 space-y-3">
                  <p
                    onClick={() => navigate("/my-profile")}
                    className="hover:text-blue-600 cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/my-appointments")}
                    className="hover:text-blue-600 cursor-pointer"
                  >
                    My Q&A Sessions
                  </p>
                  <p
                    onClick={logout}
                    className="hover:text-blue-600 cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hidden md:block hover:bg-blue-700"
          >
            Get Started
          </button>
        )}
        <img
          src={assets.menu_icon}
          className="w-6 md:hidden cursor-pointer"
          alt="Menu"
          onClick={() => setShowMenu(!showMenu)}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full h-full bg-white z-30 transform transition-transform duration-300 ease-in-out ${
          showMenu ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <img
            src={assets.logo}
            alt="logo"
            className="w-32 cursor-pointer"
            onClick={() => {
              setShowMenu(false);
              navigate("/");
            }}
          />
          <img
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt="Close"
            className="w-6 cursor-pointer"
          />
        </div>
        <ul className="flex flex-col items-center mt-8 space-y-6 text-lg">
          <NavLink
            to="/"
            className="hover:text-blue-600"
            onClick={() => setShowMenu(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/teachers"
            className="hover:text-blue-600"
            onClick={() => setShowMenu(false)}
          >
            All Teachers
          </NavLink>
          <NavLink
            to="/about"
            className="hover:text-blue-600"
            onClick={() => setShowMenu(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="hover:text-blue-600"
            onClick={() => setShowMenu(false)}
          >
            Contact Us
          </NavLink>
          {!token && (
            <button
              onClick={() => {
                setShowMenu(false);
                navigate("/login");
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold mt-6 hover:bg-blue-700"
            >
              Get Started
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
