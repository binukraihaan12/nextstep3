import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const MyAppointments = () => {
  const { backendUrl, token, getTeachersData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async () => {
    if (!appointmentToCancel) return;

    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId: appointmentToCancel },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getTeachersData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setShowModal(false);
      setAppointmentToCancel(null);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/complete-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Session marked as completed");
        getUserAppointments();
        getTeachersData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleAttendNowClick = (appointmentId, meetingLink) => {
    window.open(meetingLink, "_blank");

    setTimeout(() => {
      completeAppointment(appointmentId);
      console.log("Q&A Session Completed");
    }, 5000);
  };

  const handleCancelClick = (appointmentId) => {
    setAppointmentToCancel(appointmentId);
    setShowModal(true);
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg mt-10">
      <p className="text-xl font-semibold text-black mb-6">My Q&A Sessions</p>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No Q&A Sessions Scheduled</p>
      ) : (
        <div className="space-y-6">
          {appointments.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center rounded-md p-4 shadow-md space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <div className="flex-shrink-0">
                <a
                  href={`http://localhost:5173/appointment/${item.tecData._id}`}
                >
                  <img
                    src={item.tecData.image}
                    alt={item.tecData.name}
                    className="w-24 h-24 rounded-full object-cover shadow-lg"
                  />
                </a>
              </div>
              <div className="flex-grow">
                <p className="text-xl font-semibold">{item.tecData.name}</p>
                <p className="text-sm text-gray-500">{item.tecData.subject}</p>
                <div className="mt-2 text-gray-700">
                  <p>
                    <span className="font-medium text-gray-800">
                      Duration:{" "}
                    </span>
                    30 Minutes
                  </p>
                </div>
                <p className="mt-2 text-gray-700">
                  <span className="font-medium text-gray-800">
                    Date & Time:{" "}
                  </span>
                  {new Date(
                    item.slotDate.split("_").reverse().join("-")
                  ).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  | {item.slotTime}
                </p>
              </div>
              <div className="flex-shrink-0 flex space-x-3">
                {!item.cancelled && !item.isCompleted && (
                  <>
                    <button
                      onClick={() =>
                        handleAttendNowClick(item._id, item.meetingLink)
                      }
                      className="bg-blue-600 text-white py-2 px-4 shadow hover:bg-blue-700 transition duration-200"
                    >
                      Attend Now
                    </button>

                    <button
                      className="bg-red-600 text-white py-2 px-4 shadow hover:bg-red-700 transition duration-200"
                      onClick={() => handleCancelClick(item._id)}
                    >
                      Cancel Session
                    </button>
                  </>
                )}

                {item.cancelled && (
                  <button className="border border-red-600 text-red-600 py-2 px-4 cursor-default">
                    Session Cancelled
                  </button>
                )}

                {item.isCompleted && (
                  <button className="border border-green-600 text-green-600 py-2 px-4 cursor-default">
                    Session Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Confirmation */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Cancel Session</h3>
            <p className="mb-6">
              Are you sure you want to cancel this session?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                No
              </button>
              <button
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                onClick={cancelAppointment}
              >
                Yes, Cancel It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
