import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedTeachers from "../components/RelatedTeachers";
import toast from "react-hot-toast";
import axios from "axios";
import StarRatingModal from "../components/StarRatingModal";

const Appointment = () => {
  const { tecId } = useParams();
  const { teachers, backendUrl, token, getTeachersData } =
    useContext(AppContext);

  const [tecSlots, setTecSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [showSlots, setShowSlots] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [tecInfo, setTecInfo] = useState(null);

  const fetchTecInfo = async () => {
    try {
      const tecInfo = teachers.find((tec) => tec._id === tecId);
      setTecInfo(tecInfo);
    } catch (error) {
      // console.log(tecInfo);
      console.error("Failed to fetch tecInfo:", error);
      return { slots_booked: {} }; // Return a default value on error
    }
  };

  const handleAskQuestion = () => {
    const prefilledMessage = `Hello, ${tecInfo.name}. I hope you are doing well! 🌟\n\nI have a few questions regarding our lessons, and I would greatly appreciate your guidance. Thank you for your help! 🙏`;
    const whatsappLink = `https://wa.me/${
      tecInfo.whatsapp
    }?text=${encodeURIComponent(prefilledMessage)}`;
    window.open(whatsappLink, "_blank");
    console.log("Message Sent");
    console.log(whatsappLink);
  };

  const getAvailableSlots = async () => {
    setTecSlots([]); // Clear any existing slots

    let today = new Date(); // Get the current date and time

    for (let i = 0; i < 8; i++) {
      // Loop for the next 7 days
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i); // Set current date to today + i days

      let endTime = new Date(currentDate);
      endTime.setHours(20, 30, 0, 0); // Set end time to 8:30 PM

      // Determine start time for today
      if (i === 0) {
        if (today.getHours() < 14) {
          currentDate.setHours(14, 0, 0); // Start from 2:00 PM
        } else if (
          today.getHours() > 20 ||
          (today.getHours() === 20 && today.getMinutes() > 30)
        ) {
          // If current time is past 8:30 PM, skip today's slots
          continue;
        } else {
          // If current time is between 2:00 PM and 8:30 PM, start from the next half-hour
          let nextAvailableMinutes = Math.ceil(today.getMinutes() / 30) * 30; // Calculate next half-hour slot
          currentDate.setHours(today.getHours(), nextAvailableMinutes, 0);
        }
      } else {
        // For future days, set start time to 2:00 PM
        currentDate.setHours(14, 0, 0, 0);
      }

      let timeSlots = [];

      while (currentDate <= endTime) {
        // Generate time slots until 8:30 PM
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          tecInfo.slots_booked[slotDate] &&
          tecInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30); // Increment by 30 minutes
      }

      setTecSlots((prev) => [...prev, timeSlots]); // Update the slots state
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.error("Login to book a Q&A session");
      return navigate("/login");
    }

    try {
      const date = tecSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { tecId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getTeachersData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log(tecSlots);
  }, [tecSlots]);

  useEffect(() => {
    fetchTecInfo();
  }, [teachers, tecId]);

  useEffect(() => {
    getAvailableSlots();
  }, [tecInfo]);

  return (
    tecInfo && (
      <div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              src={tecInfo.image}
              alt=""
              className="bg-blue-50 w-full sm:max-w-72 rounded-lg"
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {tecInfo.name} <img className="w-5" src={assets.verified_icon} />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {tecInfo.degree} - Subject: {tecInfo.subject}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {tecInfo.experience}
              </button>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img className="w-3" src={assets.info_icon} />
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {tecInfo.about}
              </p>
              <button className="p-1.5 mt-3 border text-sm bg-blue-50 text-blue-700">
                <a href={`mailto:${tecInfo.email}`}>{tecInfo.email}</a>
              </button>
              <div className="flex gap-4 mt-6">
                <button
                  className="bg-blue-500 text-white py-2 px-4  hover:bg-blue-600 transition"
                  onClick={() => setShowModal(true)}
                >
                  Ask a Question
                </button>
                <button
                  className="bg-purple-500 text-white py-2 px-4  hover:bg-purple-600 transition"
                  onClick={() => setShowSlots(!showSlots)}
                >
                  Schedule a Live Q&A Session
                </button>
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full space-y-4 text-center shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800">
                Want to ask a question from {tecInfo.name}?
              </h2>
              <p className="text-gray-600">
                You can ask any question you have for {tecInfo.name} regarding
                &nbsp;
                <span className="font-medium text-gray-900">
                  {tecInfo.subject}
                </span>
                .
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-blue-500 text-white py-2 px-4  hover:bg-blue-600 transition"
                  onClick={handleAskQuestion}
                >
                  Ask a Question
                </button>
                <button
                  className="text-gray-500 py-2 px-4 rounded-lg"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          className={`transition-all duration-500 ease-in-out ${
            showSlots ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
            <p>Booking Slots</p>
            <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
              {tecSlots.length &&
                tecSlots.map((item, index) => (
                  <div
                    onClick={() => setSlotIndex(index)}
                    className={`text-center py-6 min-w-16 cursor-pointer ${
                      slotIndex === index
                        ? "bg-blue-500 text-white"
                        : "border border-gray-200 hover:bg-blue-50 hover:text-gray-800"
                    }`}
                    key={index}
                  >
                    <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                    <p>{item[0] && item[0].datetime.getDate()}</p>
                  </div>
                ))}
            </div>
            <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
              {tecSlots.length &&
                tecSlots[slotIndex].map((item, index) => (
                  <p
                    onClick={() => setSlotTime(item.time)}
                    key={index}
                    className={`text-sm font-normal flex-shrink-0 px-5 py-2 cursor-pointer ${
                      item.time === slotTime
                        ? "bg-blue-500 text-white"
                        : "text-gray-400 border border-gray-300 hover:bg-blue-50 hover:text-gray-600"
                    } `}
                  >
                    {item.time.toLowerCase()}
                  </p>
                ))}
            </div>
            <button
              className="bg-blue-500 text-white text-base font-light px-14 py-3 my-6"
              onClick={bookAppointment}
            >
              Schedule a Session
            </button>
          </div>
        </div>

        <StarRatingModal />

        <RelatedTeachers tecId={tecId} subject={tecInfo.subject} />
      </div>
    )
  );
};

export default Appointment;
