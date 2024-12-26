import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="w-full p-6 bg-white mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="p-4 bg-blue-100 text-blue-800 rounded-lg shadow flex items-center">
            <div className="bg-blue-200 text-blue-600 w-14 h-14 flex items-center justify-center rounded-lg text-3xl mr-4">
              👨‍🏫
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Total Teachers</span>
              <span className="text-3xl font-bold text-blue-800">
                {dashData.teachers.toString().padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="p-4 bg-blue-100 text-blue-800 rounded-lg shadow flex items-center">
            <div className="bg-blue-200 text-blue-600 w-14 h-14 flex items-center justify-center rounded-lg text-3xl mr-4">
              👨‍🎓
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Total Students</span>
              <span className="text-3xl font-bold text-blue-800">
                {dashData.users.toString().padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="p-4 bg-blue-100 text-blue-800 rounded-lg shadow flex items-center">
            <div className="bg-blue-200 text-blue-600 w-14 h-14 flex items-center justify-center rounded-lg text-3xl mr-4">
              📅
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Total Q&A Sessions</span>
              <span className="text-3xl font-bold text-blue-800">
                {dashData.appointments.toString().padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border border-gray-200">
            <thead className="bg-blue-100 text-blue-800 uppercase">
              <tr>
                <th className="py-3 px-4 font-normal">#</th>
                <th className="py-3 px-4 font-normal">User</th>
                <th className="py-3 px-4 font-normal">Date & Time</th>
                <th className="py-3 px-4 font-normal">Teacher</th>
                <th className="py-3 px-4 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {dashData.latestAppointments.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition duration-150"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 flex items-center space-x-3">
                    <img
                      src={item.userData.image}
                      alt={item.userData.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-gray-700">{item.userData.name}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {new Date(
                      item.slotDate.split("_").reverse().join("-")
                    ).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    , {item.slotTime}
                  </td>
                  <td className="py-3 px-4 flex items-center space-x-3">
                    <img
                      src={item.tecData.image}
                      alt={item.tecData.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-gray-700">{item.tecData.name}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`${
                        item.cancelled ? "text-red-500" : "text-green-700"
                      }`}
                    >
                      {item.cancelled
                        ? "Cancelled"
                        : item.isCompleted
                        ? "Completed"
                        : "Active"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};

export default Dashboard;
