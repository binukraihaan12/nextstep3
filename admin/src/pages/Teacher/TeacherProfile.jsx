import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { TeacherContext } from "../../context/TeacherContext";
import axios from "axios";
import toast from "react-hot-toast";
import { assets } from "../../../../frontend/src/assets/assets";

const TeacherProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(TeacherContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  const removePrefix = (name) => {
    return name.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.)\s*/i, "").trim();
  };

  const updateProfle = async () => {
    try {
      const updateData = {
        address: profileData.address,
        available: profileData.available,
        mobile: profileData.mobile,
        whatsapp: profileData.whatsapp,
      };

      const { data } = await axios.post(
        backendUrl + "/api/teacher/update-profile",
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success("Profile Updated Successfully");
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    profileData && (
      <div className="w-full max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <div className="flex flex-col items-center">
          <img
            src={profileData.image}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
          />
          <p className="text-2xl font-semibold ">
            Hi, {removePrefix(profileData.name)}
          </p>
          <p className="text-md text-gray-600 mb-4 mt-2 text-center max-w-4xl">
            A teacher with {profileData.experience} of teaching experience An
            experienced and dedicated educator specializing in{" "}
            {profileData.subject}, {profileData.name} holds a{" "}
            {profileData.degree} and has been inspiring students for{" "}
            {profileData.experience}.
          </p>

          <hr className="w-full mb-6 border-gray-300" />
        </div>

        <div className="mb-6 w-full">
          <p className="text-xl font-medium text-blue-600 mb-3">
            Contact Information
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div>
              <p className="text-sm font-medium text-gray-500">Mobile</p>
              {isEdit ? (
                <input
                  type="text"
                  value={profileData.mobile || ""}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      mobile: e.target.value,
                    }))
                  }
                  className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:border-blue-600"
                />
              ) : (
                <p className="text-base">{profileData.mobile || "N/A"}</p>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">WhatsApp</p>
              {isEdit ? (
                <input
                  type="text"
                  value={profileData.whatsapp || ""}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      whatsapp: e.target.value,
                    }))
                  }
                  className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:border-blue-600"
                />
              ) : (
                <p className="text-base">{profileData.whatsapp || "N/A"}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6 w-full">
          <p className="text-xl font-medium text-blue-600 mb-3">Address</p>
          <div className="flex flex-col gap-2">
            {isEdit ? (
              <>
                <input
                  type="text"
                  value={profileData.address?.line1 || ""}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:border-blue-600"
                />
                <input
                  type="text"
                  value={profileData.address?.line2 || ""}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:border-blue-600"
                />
              </>
            ) : (
              <p className="text-base">
                {profileData.address?.line1 || "N/A"} <br />
                {profileData.address?.line2 || "N/A"}
              </p>
            )}
          </div>
        </div>

        <div className="mb-6 w-full">
          <p className="text-xl font-medium text-blue-600 mb-3">About</p>
          <div className="flex flex-col gap-2">
            <p className=" w-full p-2 focus:outline-none focus:border-blue-600">
              {profileData.about || ""}
            </p>
          </div>
        </div>

        <div className="mb-6 w-full">
          <p className="text-xl font-medium text-blue-600 mb-3">Availability</p>
          {isEdit ? (
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={profileData.available}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    available: e.target.checked,
                  }))
                }
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-sm font-medium text-gray-500">
                Available
              </span>
            </label>
          ) : (
            <p className="text-base">
              {profileData.available ? "Available" : "Not Available"}
            </p>
          )}
        </div>

        <div className="flex justify-end mt-6 w-full">
          {isEdit ? (
            <button
              onClick={updateProfle}
              className="bg-blue-600 text-white py-2 px-6 rounded-md shadow hover:bg-blue-700 transition duration-200"
            >
              Save Information
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-blue-600 text-white py-2 px-6 rounded-md shadow hover:bg-blue-700 transition duration-200"
            >
              Edit Contact Info
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default TeacherProfile;
