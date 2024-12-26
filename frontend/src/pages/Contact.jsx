import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/login");
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-blue-600">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-800">
            We'd love to hear from you. Reach out to us for any questions or to
            learn more about our services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Address Section */}
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer">
            <FaMapMarkerAlt className="text-blue-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold text-blue-600 mb-2">Address</h3>
            <p className="text-gray-700">123 Main Street, Anytown, USA</p>
          </div>

          {/* Mobile Section */}
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer">
            <FaPhoneAlt className="text-blue-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold text-blue-600 mb-2">Phone</h3>
            <p className="text-gray-700">+94 77 195 8681</p>
          </div>

          {/* Email Section */}
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer">
            <FaEnvelope className="text-blue-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold text-blue-600 mb-2">Email</h3>
            <p className="text-gray-700">hi@nextstep.edu</p>
          </div>
        </div>

        {/* Register as a Teacher Section */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <div className="flex flex-col items-center text-center">
            <FaChalkboardTeacher className="text-blue-600 w-16 h-16 mb-4" />
            <h3 className="text-2xl font-medium text-blue-600 mb-2">
              Become a Teacher
            </h3>
            <p className="text-gray-500 mb-6">
              Share your expertise with students around the world. Join us
              today.
            </p>
            <button
              onClick={handleRegisterClick}
              className="bg-blue-600 text-white px-5 py-2  hover:bg-blue-700 transition duration-300"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
