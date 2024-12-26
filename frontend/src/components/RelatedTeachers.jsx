import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedTeachers = ({ tecId, subject }) => {
  const { teachers } = useContext(AppContext);
  const navigate = useNavigate();

  const [relTec, setrelTec] = useState([]);

  useEffect(() => {
    if (teachers.length > 0 && subject) {
      const teachersData = teachers.filter(
        (tec) => tec.subject === subject && tec._id !== tecId
      );
      setrelTec(teachersData);
    }
  }, [teachers, subject, tecId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Related Teachers</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Skilled {subject} educators committed to guiding your learning journey.
      </p>

      {relTec.length > 0 ? (
        <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
          {relTec.slice(0, 4).map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              className="border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-60 h-56  rounded-xl object-cover"
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
      ) : (
        <p className="text-center text-gray-600 mt-5">
          No related teachers found.
        </p>
      )}
      {/* <button
        onClick={() => {
          navigate("/teachers");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        More
      </button> */}
    </div>
  );
};

export default RelatedTeachers;
