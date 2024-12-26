import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopTeachers = () => {
  const navigate = useNavigate();
  const { teachers } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center  my-16 text-gray-900 md:mx-10">
      <div className="mb-10 space-y-4 px-6 md:px-0 text-center">
        <h2 className="text-orange-500 font-semibold text-sm">
          Top Instructors, Trusted Learning
        </h2>
        <h1 className="text-3xl font-semibold text-black mt-2 mb-10">
          Instructors Students Recommend
        </h1>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-3 sm:px-0">
        {teachers.slice(0, 5).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img
              className="bg-blue-50 w-full h-56 object-cover"
              src={item.image}
              alt={item.name}
            />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>Available</p>
              </div>
              <p className="text-lg text-gray-900 font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.subject}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/teachers");
          scrollTo(0, 0);
        }}
        className="font-medium   text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400 px-6 py-3 mt-10"
      >
        View All Teachers
      </button>
    </div>
  );
};

export default TopTeachers;
