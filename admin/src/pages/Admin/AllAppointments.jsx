import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  const sortedAppointments = [...appointments].sort((a, b) => {
    if (!a.cancelled && !a.isCompleted) return -1;
    if (a.isCompleted && !a.cancelled) return 1;
    return 2;
  });

  return (
    <div className="w-full p-6 bg-white mt-5">
      <p className="mb-8 text-2xl font-semibold text-gray-700">
        All Q&A Sessions
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border border-gray-200">
          <thead className="bg-blue-100 text-blue-800 uppercase">
            <tr>
              <th className="py-3 px-4 font-normal">#</th>
              <th className="py-3 px-4 font-normal">User</th>
              <th className="py-3 px-4 font-normal">Date & Time</th>
              <th className="py-3 px-4 font-normal">Teacher</th>
              <th className="py-3 px-4 font-normal">Status</th>
              <th className="py-3 px-4 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedAppointments.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition duration-150 cursor-pointer"
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
                      item.cancelled
                        ? "text-red-500 font-medium"
                        : item.isCompleted
                        ? "text-green-700 font-medium"
                        : "text-blue-900 font-medium"
                    }`}
                  >
                    {item.cancelled
                      ? "Cancelled"
                      : item.isCompleted
                      ? "Completed"
                      : "Active"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {!item.cancelled && !item.isCompleted && (
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      src={assets.cancel_icon}
                      alt="Cancel"
                      className="w-10 cursor-pointer"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAppointments;
