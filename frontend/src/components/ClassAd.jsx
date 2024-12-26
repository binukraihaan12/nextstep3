// import React from "react";

// const ClassAd = () => {
//   return (
//     <div>
//       <div>
//         <img src="./Ad1.jpg" alt="Physics" />
//       </div>
//       <div>
//         <img src="./ImageAd2.jpg" alt="Chemistry" />
//       </div>
//       <div>
//         <img src="./add.png" alt="Course" />
//       </div>
//     </div>
//   );
// };

// export default ClassAd;

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const ClassAd = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false); // Hide the entire component
  };

  if (!isVisible) return null; // Do not render anything if `isVisible` is false

  return (
    <div className="relative grid grid-cols-2 grid-rows-[auto_auto] h-screen gap-1 mt-10 mb-10">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 bg-red-500 text-white px-1 py-1 rounded-full hover:bg-red-700"
      >
        <IoClose />
      </button>

      {/* Image 1 */}
      <div className="">
        <img
          src="./Ad1.jpg"
          alt="Physics"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Image 2 */}
      <div>
        <img
          src="./ImageAd2.jpg"
          alt="Chemistry"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ClassAd;
