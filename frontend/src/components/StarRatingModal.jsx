import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const StarRatingModal = () => {
  const [rating, setRating] = useState(0);
  const [thankYouMessage, setThankYouMessage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isClosing, setIsClosing] = useState(false); // for animation

  const { backendUrl } = useContext(AppContext);

  const handleStarClick = async (index) => {
    const selectedRating = index + 1;
    setRating(selectedRating);
    await saveRatingToBackend(selectedRating);
  };

  const saveRatingToBackend = async (rating) => {
    try {
      setThankYouMessage(true); // Show thank-you message
    } catch (error) {
      console.error("Error saving rating:", error);
    }
  };

  const handleClose = () => {
    setIsClosing(true); // Start closing animation
    setTimeout(() => setIsModalOpen(false), 300); // Delay for animation
  };

  return (
    isModalOpen && (
      <div
        className={`fixed bottom-4 right-4 p-10 bg-white rounded-lg shadow-xl z-50 transition-opacity duration-300 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
      >
        {thankYouMessage ? (
          <header className="text-lg font-medium text-gray-800 mb-2">
            Thank you for your feedback!
          </header>
        ) : (
          <>
            <header className="text-lg font-medium text-center text-gray-800 mb-2">
              How would you rate
              <br />
              your teacher?
            </header>
            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  onClick={() => handleStarClick(index)}
                  className={`cursor-pointer transition-colors duration-200 text-3xl ${
                    rating > index ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </>
        )}
        <button
          className="absolute top-2 right-2 text-3xl text-gray-500 hover:text-gray-700"
          onClick={handleClose}
        >
          &times;
        </button>
      </div>
    )
  );
};

export default StarRatingModal;
