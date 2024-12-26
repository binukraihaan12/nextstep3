import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const TeachersList = () => {
  const { aToken, teachers, getAllTeachers, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllTeachers();
    }
  }, [aToken]);

  return (
    <div className="m-5">
      <p className="mb-8 text-2xl font-semibold text-gray-700">All Teachers</p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teachers.map((item, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl overflow-hidden p-4 flex flex-col items-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-60 h-56  rounded-xl object-cover"
            />
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-600">{item.subject}</p>
              <div className="mt-3 flex items-center justify-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() => changeAvailability(item._id)}
                  checked={item.available}
                  className="form-checkbox accent-green-600 h-3.5 cursor-pointer"
                />
                <p className="text-sm text-gray-700">Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeachersList;
