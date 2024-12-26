import React, { useContext, useEffect } from "react";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "./context/AppCotext";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";

import AllAppointments from "./pages/Admin/AllAppointments";
import AddTeacher from "./pages/Admin/AddTeacher";
import TeachersList from "./pages/Admin/TeachersList";
import { TeacherContext } from "./context/TeacherContext";

import TeacherAppointments from "./pages/Teacher/TeacherAppointments";
import TeacherDashboard from "./pages/Teacher/teacherDashboard";
import TeacherProfile from "./pages/Teacher/teacherProfile";
import Inbox from "../../frontend/src/pages/Inbox";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(TeacherContext);
  const navigate = useNavigate();

  return aToken || dToken ? (
    <div className="bg-[#fff]">
      {/* <Login /> */}
      <ToastContainer />
      <Toaster />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-teacher" element={<AddTeacher />} />
          <Route path="/teacher-list" element={<TeachersList />} />

          {/* Teacher Route */}
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route
            path="/teacher-appointment"
            element={<TeacherAppointments />}
          />
          <Route path="/teacher-profile" element={<TeacherProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
      <Toaster />
    </>
  );
};

export default App;
