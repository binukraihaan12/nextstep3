import React from "react";
import {
  FaUserTie,
  FaRegLightbulb,
  FaHandsHelping,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className=" py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-semibold text-blue-600 mb-4">About Us</h1>
        <p className="text-gray-800 text-lg">
          Learn more about our company, our mission, and what drives us forward.
        </p>
      </div>

      {/* Image Section */}
      <div className="flex justify-center mb-12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.2302323454686!2d-122.41941668468174!3d37.77492977975974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808581528d5e5017%3A0x5e7ad0b36d4aa32f!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1615314483444!5m2!1sen!2sin"
          width="100%"
          height="400"
          allowFullScreen=""
          loading="lazy"
          title="Our Location"
          className="border-0"
        ></iframe>
      </div>

      {/* Mission, Vision, and Values Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-12">
        <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition duration-300">
          <FaRegLightbulb className="text-blue-600 text-5xl mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Our Mission
          </h3>
          <p className="text-gray-600">
            To empower individuals and businesses by providing innovative
            solutions that drive success.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition duration-300">
          <FaHandsHelping className="text-blue-600 text-5xl mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Our Vision
          </h3>
          <p className="text-gray-600">
            To be a global leader in our industry, delivering value and
            excellence with integrity.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition duration-300">
          <FaUserTie className="text-blue-600 text-5xl mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Our Values
          </h3>
          <p className="text-gray-600">
            Commitment to quality, customer focus, continuous improvement, and
            respect for all.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center mb-12 mt-10">
        <h2 className="text-3xl font-semibold text-black mb-6">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
          {/* Example Team Member */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 cursor-pointer">
            <img
              src={assets.binuk} // Replace with your team member image URL
              alt="Team Member"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              Binuk Raihaan
            </h3>
            <p className="text-gray-600">Full Stack Developer</p>
          </div>
          {/* <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 cursor-pointer">
            <img
              src={assets.neha} // Replace with your team member image URL
              alt="Team Member"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              Neha Nashaaha
            </h3>
            <p className="text-gray-600">Marketing Manager</p>
          </div> */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 cursor-pointer">
            <img
              src={assets.dada} // Replace with your team member image URL
              alt="Team Member"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              Chiran Jeewantha
            </h3>
            <p className="text-gray-600">Web Designer</p>
          </div>

          {/* Repeat for more team members */}
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="bg-blue-600 text-white p-8 md:p-12 rounded-lg text-center">
        <h2 className="text-2xl md:text-3xl font-medium mb-6">Get In Touch</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8">
          <div className="flex items-center justify-center gap-2">
            <FaPhoneAlt className="text-xl md:text-2xl" />
            <p className="text-sm md:text-base">+94 77 195 8681</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <FaEnvelope className="text-xl md:text-2xl" />
            <p className="text-sm md:text-base">hi@nextstep.edu</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
