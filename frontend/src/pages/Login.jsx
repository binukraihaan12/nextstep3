import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const navigate = useNavigate();

  const { backendUrl, token, setToken } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(data.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center justify-center"
    >
      <div className="flex flex-col gap-5 m-auto items-start p-10 min-w-[340px] sm:min-w-[400px] border rounded-xl bg-white text-zinc-600 text-sm shadow-xl transform transition-all duration-300 hover:shadow-2xl">
        <p className="text-3xl font-semibold text-blue-600 ">
          {state === "Sign Up" ? "Join Us Today" : "Welcome Back"}
        </p>
        <p className="text-gray-500 mb-6">
          Please{" "}
          {state === "Sign Up"
            ? "create a new account"
            : "log in to your account"}{" "}
          to access our platform.
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <p className="font-medium text-gray-600">Full Name</p>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-gray-300 rounded-md w-full p-3 mt-2 focus:outline-none focus:border-blue-600 transition duration-200"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p className="font-medium text-gray-600">Email Address</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-gray-300 rounded-md w-full p-3 mt-2 focus:outline-none focus:border-blue-600 transition duration-200"
            required
          />
        </div>
        <div className="w-full relative">
          <p className="font-medium text-gray-600">Password</p>
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password types
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-gray-300 rounded-md w-full p-3 mt-2 focus:outline-none focus:border-blue-600 transition duration-200"
            required
          />
          <span
            className="absolute top-11 right-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="opacity-80"
            />
          </span>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-3 rounded-md text-base font-normal mt-3 transition duration-200 hover:bg-blue-700 hover:shadow-lg"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p className="text-gray-500 mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-600 font-semibold underline cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login Here
            </span>
          </p>
        ) : (
          <p className="text-gray-500 mt-4">
            Don&apos;t have an account?{" "}
            <span
              className="text-blue-600 font-semibold underline cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign Up Now!
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
