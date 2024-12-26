import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import toast from "react-hot-toast";
import { TeacherContext } from "../context/TeacherContext";

const Login = () => {
  const [state, setState] = useState("Admin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(TeacherContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/teacher/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          console.log(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {}
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center justify-center"
    >
      <div className="flex flex-col gap-5 m-auto items-start p-10 min-w-[340px] sm:min-w-[400px] border rounded-xl bg-white text-zinc-600 text-sm shadow-xl transform transition-all duration-300 hover:shadow-2xl">
        <p className="text-3xl font-medium text-blue-600">
          <span>{state}</span> Login
        </p>
        <div className="w-full">
          <p className="font-medium text-gray-600">Email</p>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-gray-300 rounded-md w-full p-3 mt-2 focus:outline-none focus:border-blue-600 transition duration-200"
            placeholder="Enter your email"
          />
        </div>
        <div className="w-full">
          <p className="font-medium text-gray-600">Password</p>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-gray-300 rounded-md w-full p-3 mt-2 focus:outline-none focus:border-blue-600 transition duration-200"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-3 rounded-md text-base font-normal mt-3 transition duration-200 hover:bg-blue-700 hover:shadow-lg"
        >
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Teacher Login{" "}
            <span
              onClick={() => setState("Teacher")}
              className="text-blue-600 underline ml-1 cursor-pointer"
            >
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Admin Login{" "}
            <span
              onClick={() => setState("Admin")}
              className="text-blue-600 underline ml-1 cursor-pointer"
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
