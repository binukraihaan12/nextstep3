// import React, { useState } from "react";
// import { assets } from "../assets/assets";

// const MyProfile = () => {
//   const [userData, setUserData] = useState({
//     name: "Binuk Raihaan",
//     image: assets.binuk,
//     email: "binukrahaan@outlook.com",
//     phone: "+94771958681",
//     address: {
//       line1: "A23rd Floor Abc Complex",
//       line2: "Badulla Sri Lanka",
//     },
//     gender: "Male",
//     dob: "2007-03-12",
//   });

//   const [isEdit, setIsEdit] = useState(false);

//   return (
//     <div>
//       <img src={userData.image} alt="" />

//       {isEdit ? (
//         <input
//           type="text"
//           value={userData.name}
//           onChange={(e) =>
//             setUserData((prev) => ({ ...prev, name: e.target.value }))
//           }
//         />
//       ) : (
//         <p>{userData.name}</p>
//       )}

//       <hr />
//       <div>
//         <p>CONTACT INFORMATION</p>
//         <div>
//           <p>Email</p>
//           <p>{userData.email}</p>
//           <p>Phone</p>
//           {isEdit ? (
//             <input
//               type="text"
//               value={userData.phone}
//               onChange={(e) =>
//                 setUserData((prev) => ({ ...prev, phone: e.target.value }))
//               }
//             />
//           ) : (
//             <p>{userData.phone}</p>
//           )}
//           <p>Address</p>
//           {isEdit ? (
//             <p>
//               <input
//                 type="text"
//                 onChange={(e) =>
//                   setUserData((prev) => ({
//                     ...prev,
//                     address: { line1: e.target.value },
//                   }))
//                 }
//                 value={userData.address.line1}
//               />
//               <br />
//               <input
//                 type="text"
//                 onChange={(e) =>
//                   setUserData((prev) => ({
//                     ...prev,
//                     address: { line2: e.target.value },
//                   }))
//                 }
//                 value={userData.address.line2}
//               />
//             </p>
//           ) : (
//             <p>
//               {userData.address.line1} <br />
//               {userData.address.line2}
//             </p>
//           )}
//         </div>
//       </div>
//       <div>
//         <p>BASIC INFORMATION</p>
//         <div>
//           <p>Gender</p>
//           {isEdit ? (
//             <select
//               onChange={(e) =>
//                 setUserData((prev) => ({ ...prev, gender: e.target.value }))
//               }
//               value={userData.gender}
//             >
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </select>
//           ) : (
//             <p>{userData.gender}</p>
//           )}
//           <p>Birthday</p>
//           {isEdit ? (
//             <input
//               type="date"
//               value={userData.dob}
//               onChange={(e) =>
//                 setUserData((prev) => ({ ...prev, dob: e.target.value }))
//               }
//             />
//           ) : (
//             <p>{userData.dob}</p>
//           )}
//         </div>
//       </div>
//       <div>
//         {isEdit ? (
//           <button onClick={() => setIsEdit(false)}>Save Information</button>
//         ) : (
//           <button onClick={() => setIsEdit(true)}>Edit</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyProfile;

import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("mobile", userData.mobile);
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      formData.append("address", JSON.stringify(userData.address));

      image && formData.append("image", image);

      // const { data } = await axios.post(
      //   backendUrl + "/api/user/update-profile",
      //   formData,
      //   { headers: { token } }
      // );

      // if (data.success) {
      //   toast.success(data.message);
      //   await loadUserProfileData();
      //   setIsEdit(false);
      //   setImage(false);
      // } else {
      //   toast.error(data.message);
      // }

      await toast.promise(
        axios.post(backendUrl + "/api/user/update-profile", formData, {
          headers: { token },
        }),
        {
          loading: "Updating Profile...",
          success: (response) => {
            if (response.data.success) {
              loadUserProfileData();
              setIsEdit(false);
              setImage(false);
              return response.data.message;
            } else {
              throw new Error(response.data.message);
            }
          },
          error: (err) => err.message || "Something went wrong!",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    userData && (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <div className="flex flex-col items-center">
          {isEdit ? (
            <label htmlFor="image">
              <div>
                <img
                  src={image ? URL.createObjectURL(image) : userData.image}
                  className="w-32 h-32 rounded-full object-cover mb-4 shadow-md cursor-pointer"
                />
                <img src={image ? "" : assets.upload_icon} className="hidden" />
              </div>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                id="image"
                hidden
              />
            </label>
          ) : (
            <img
              src={userData.image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
            />
          )}

          {isEdit ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="text-2xl font-semibold border-b-2 border-blue-400 p-1 text-center mb-4 w-full sm:w-auto"
            />
          ) : (
            <p className="text-2xl font-semibold mb-4">{userData.name}</p>
          )}
          <hr className="w-full mb-6 border-gray-300" />
        </div>

        <div className="mb-6">
          <p className="text-xl font-medium text-blue-600 mb-3">
            Contact Information
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>

              <p className="text-base">{userData.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              {isEdit ? (
                <input
                  type="text"
                  value={userData.mobile || ""}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      mobile: e.target.value,
                    }))
                  }
                  className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:border-blue-600"
                />
              ) : (
                <p className="text-base">{userData.mobile || "N/A"}</p>
              )}
            </div>
            <div className="col-span-1 sm:col-span-2">
              <p className="text-sm font-medium text-gray-500">Address</p>
              {isEdit ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={userData.address?.line1 || ""}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:border-blue-600"
                  />
                  <input
                    type="text"
                    value={userData.address?.line2 || ""}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:border-blue-600"
                  />
                </div>
              ) : (
                <p className="text-base">
                  {userData.address?.line1 || "N/A"} <br />
                  {userData.address?.line2 || "N/A"}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xl font-medium text-blue-600 mb-3">
            Basic Information
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Gender</p>
              {isEdit ? (
                <select
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:border-blue-600"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="text-base">{userData.gender}</p>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Birthday</p>
              {isEdit ? (
                <input
                  type="date"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:border-blue-600"
                />
              ) : (
                <p className="text-base">{userData.dob}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          {isEdit ? (
            <button
              onClick={updateUserProfileData}
              className="bg-blue-600 text-white py-2 px-6 rounded-md shadow hover:bg-blue-700 transition duration-200"
            >
              Save Information
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-blue-600 text-white py-2 px-6 rounded-md shadow hover:bg-blue-700 transition duration-200"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
