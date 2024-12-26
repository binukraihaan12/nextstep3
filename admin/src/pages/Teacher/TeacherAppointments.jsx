import React from "react";
import { useContext } from "react";
import { TeacherContext } from "../../context/TeacherContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

const TeacherAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
  } = useContext(TeacherContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

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
              <th className="py-3 px-4 font-normal">Status</th>
              <th className="py-3 px-4 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.reverse().map((item, index) => (
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

                <td className="py-3 px-4">
                  <span
                    className={`${
                      item.cancelled
                        ? "text-red-500 font-medium"
                        : item.isCompleted
                        ? "text-green-700 font-medium"
                        : "text-blue-700 font-medium"
                    }`}
                  >
                    {item.cancelled
                      ? "Cancelled"
                      : item.isCompleted
                      ? "Completed"
                      : "Active"}
                  </span>
                </td>
                <td className="flex items-center align-middle py-3 px-4">
                  {!item.cancelled && !item.isCompleted && (
                    <>
                      <img
                        onClick={() => cancelAppointment(item._id)}
                        src={assets.cancel_icon}
                        alt="Cancel"
                        className="w-10 cursor-pointer mx-2"
                      />
                      <img
                        onClick={() => completeAppointment(item._id)}
                        src={assets.tick_icon}
                        alt="Complete"
                        className="w-10 mx-2 cursor-pointer"
                      />
                      <a href={item.meetingLink} target="_blank">
                        <img
                          src={assets.video_icon2}
                          alt="Complete"
                          className="w-8 mx-2 cursor-pointer"
                        />
                      </a>
                    </>
                  )}

                  {item.isCompleted && (
                    <span className="text-green-700 font-medium"></span>
                  )}

                  {item.cancelled && (
                    <span className="text-red-500 font-medium"></span>
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

export default TeacherAppointments;
