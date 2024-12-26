import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Teachers from "./pages/Teachers";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/scrollToTop";
import { Toaster } from "react-hot-toast";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Inbox from "./pages/Inbox";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/teachers/:subject" element={<Teachers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:tecId" element={<Appointment />} />
      </Routes>
      <ScrollToTopButton />
      <Toaster />
      <Footer />
    </div>
  );
};

export default App;
