import React, { useState, useEffect } from "react";

const ImageAd = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenPopup");
    if (!hasSeenPopup) {
      setShowPopup(true);
      localStorage.setItem("hasSeenPopup", "true");
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative max-w-[45rem] w-full">
        <button
          className="absolute top-1 right-3 text-white text-4xl"
          onClick={handleClose}
        >
          &times;
        </button>

        <img
          src="https://i.ibb.co/h1236jP/ImageAd.jpg"
          alt="Ad Banner"
          className="w-full h-auto rounded-md"
        />
      </div>
    </div>
  );
};

export default ImageAd;
