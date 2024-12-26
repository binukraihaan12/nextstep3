import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img
            onClick={() => navigate("/")}
            className="w-48 mb-1 cursor-pointer"
            src={"/Picture1.png"}
            alt="logo"
          />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            At NextStep, we are dedicated to bridging the gap between students
            and teachers, providing an interactive platform for learning and
            growth. Our mission is to empower individuals through knowledge by
            connecting them with experienced educators in various fields.
          </p>
          <p className="w-full md:w-2/3 text-gray-900 leading-6 mt-6">
            Copyright © 2024 | nextstep.edu
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/privacy-policy">Privacy & Policy</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+94 77 195 8681</li>
            <li>hi@nextstep.edu</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <div className="py-5 flex justify-center items-center space-x-2">
          <img
            src={assets.footerImage}
            alt="Sri Lanka Icon"
            className="h-[5.5rem]"
          />
          <p className="text-medium font-medium pl-3 text-gray-800">
            Made with <span className="text-blue-800">&#x2764;</span>
            <br /> in Sri Lanka
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
