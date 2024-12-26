import React, { useContext, useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { BsStars } from "react-icons/bs";
import { EnchanceDescription } from "../../../config/AiModel";

const AddTeacher = () => {
  const subjectOptions = [
    { value: "Mathematics", label: "Mathematics" },
    { value: "Physics", label: "Physics" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Biology", label: "Biology" },
    { value: "Computer Science", label: "Computer Science" },
    { value: "English", label: "English" },
    { value: "History", label: "History" },
    { value: "Geography", label: "Geography" },
    { value: "Economics", label: "Economics" },
    // Add more subjects as needed
  ];

  const titleOptions = [
    { value: "Mr.", label: "Mr." },
    { value: "Ms.", label: "Ms." },
    { value: "Mrs.", label: "Mrs." },
    { value: "Dr.", label: "Dr." },
    // Add more titles if needed
  ];

  const [tecImg, setTecImg] = useState(false);
  const [title, setTitle] = useState("Mr.");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 year");
  const [mobileNumber, setMobileNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [subjectSpecialty, setSubjectSpecialty] = useState("Physics");
  const [education, setEducation] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [aboutTeacher, setAboutTeacher] = useState("");

  const fullName = title ? `${title} ${name}` : name;

  const { backendUrl, aToken } = useContext(AdminContext);

  const enhanceOutline = async () => {
    if (!aboutTeacher.trim()) {
      toast.error("Please provide an outline before enhancing.");
      return;
    }

    try {
      const AI_PROMPT = `Enhance the following teacher outline into a small but detailed professional description: ${aboutTeacher}`;

      const result = await EnchanceDescription.sendMessage(AI_PROMPT);

      const output = result.response.text();
      console.log("Generated Description:", output);
      setAboutTeacher(output);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!tecImg) {
        return toast.error("Profile Image Not Selected");
      }

      const formData = new FormData();

      formData.append("image", tecImg);
      formData.append("name", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("subject", subjectSpecialty);
      formData.append("degree", education);
      formData.append("experience", experience);
      formData.append("about", aboutTeacher);
      formData.append("whatsapp", whatsappNumber);
      formData.append("mobile", mobileNumber);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      await toast.promise(
        axios.post(backendUrl + "/api/admin/add-teacher", formData, {
          headers: { aToken },
        }),
        {
          loading: "Saving teacher data...",
          success: (response) => {
            if (response.data.success) {
              setTecImg(false);
              setName("");
              setEmail("");
              setPassword("");
              setExperience("1 year");
              setMobileNumber("");
              setWhatsappNumber("");
              setSubjectSpecialty("Physics");
              setEducation("");
              setAddress1("");
              setAddress2("");
              setAboutTeacher("");

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
      toast.error(error);
    }
  };

  return (
    <form className="m-8 w-full max-w-4xl" onSubmit={onSubmitHandler}>
      <p className="mb-8 text-2xl font-semibold text-gray-700">Add Teacher</p>
      <div className="px-10 py-8 border rounded-lg w-full ">
        <div className="flex flex-col lg:flex-row gap-10 text-gray-700">
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div>
              <p className="mb-2">Courtesy Title</p>
              <Select
                options={titleOptions}
                placeholder="Select a title"
                className="w-full"
                classNamePrefix="react-select"
                isSearchable
                onChange={(selectedOption) => setTitle(selectedOption.value)}
                value={titleOptions.find((option) => option.value === title)}
              />
            </div>
            <div>
              <p className="mb-2">Full Name</p>
              <input
                type="text"
                placeholder=" Teacher's full name"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
            <div>
              <p className="mb-2">Email Address</p>
              <input
                type="email"
                placeholder=" Teacher's email address"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div>
              <p className="mb-2">Password</p>
              <input
                type="password"
                placeholder="Create a password for the teacher"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <div>
              <p className="mb-2">Experience (Years)</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1 year">1 year</option>
                <option value="2 years">2 years</option>
                <option value="3 years">3 years</option>
                <option value="4 years">4 years</option>
                <option value="5 years">5 years</option>
                <option value="More than 5 years">More than 5 years</option>
              </select>
            </div>
            <div>
              <p className="mb-2">Mobile Number</p>
              <input
                type="text"
                placeholder=" Teacher's mobile number"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setMobileNumber(e.target.value)}
                value={mobileNumber}
                required
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div>
              <p className="mb-2">Profile Picture</p>
              <input
                type="file"
                accept="image/*"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setTecImg(e.target.files[0])}
              />
              <small className="text-gray-500">
                Upload a profile picture (JPEG, PNG, etc.)
              </small>
            </div>
            <div>
              <p className="mb-2">WhatsApp Number</p>
              <input
                type="text"
                placeholder=" Teacher's WhatsApp number"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setWhatsappNumber(e.target.value)}
                value={whatsappNumber}
                required
              />
            </div>

            <div>
              <p className="mb-2">Subject Specialty</p>
              <Select
                options={subjectOptions}
                placeholder="Select a subject"
                className="w-full"
                classNamePrefix="react-select"
                isSearchable
                onChange={(selectedOption) =>
                  setSubjectSpecialty(selectedOption.value)
                } // Store the subject's value
                value={subjectOptions.find(
                  (option) => option.value === subjectSpecialty
                )}
              />
            </div>
            <div>
              <p className="mb-2">Education</p>
              <input
                type="text"
                placeholder=" Teacher's educational background"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setEducation(e.target.value)}
                value={education}
              />
            </div>
            <div>
              <p className="mb-2">Address</p>
              <input
                type="text"
                placeholder="Address (Line 1)"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
              />
              <input
                type="text"
                placeholder="Address  (Line 2)"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-10 mt-8">
          <div className="w-full">
            <p className="mb-2">About Teacher</p>
            <textarea
              placeholder="A brief description about the Teacher"
              rows={5}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize"
              onChange={(e) => setAboutTeacher(e.target.value)}
              value={aboutTeacher}
            ></textarea>
            <button
              type="button"
              onClick={enhanceOutline}
              className="mt-3 px-2 flex items-center gap-1 py-2 bg-none border border-gray-500 text-black font-medium rounded-md hover:bg-black hover:text-white transition duration-300"
            >
              Enchance with AI
              <BsStars />
            </button>
          </div>
          <div className="flex items-end justify-end w-full">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add Teacher
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddTeacher;
