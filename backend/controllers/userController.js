import userModel from "../models/userModel.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

// Helper function for hashing passwords
const hashPassword = (password) => {
  return crypto
    .createHmac("sha256", process.env.PASSWORD_SECRET)
    .update(password)
    .digest("hex");
};

// Helper function for verifying passwords
const verifyPassword = (password, hashedPassword) => {
  const hashedInputPassword = crypto
    .createHmac("sha256", process.env.PASSWORD_SECRET)
    .update(password)
    .digest("hex");
  return hashedInputPassword === hashedPassword;
};

// API for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = hashPassword(password);
    const newUser = new userModel({ name, email, password: hashedPassword });

    await newUser.save();
    res.json({ success: true, message: "Registration Successful" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const isMatch = verifyPassword(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for getting user profile
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;

    const profileData = await userModel.findById(userId).select("-password");
    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { userId, name, email, mobile, address } = req.body;

    await userModel.findByIdAndUpdate(userId, {
      name,
      email,
      mobile,
      address,
    });

    res.json({ success: true, message: "Profile Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for getting all appointments for a user
const userAppointments = async (req, res) => {
  try {
    const { userId } = req.body;

    const appointments = await appointmentModel.find({ userId }).populate("tecId", "name subject experience");

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for booking an appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, tecId, date, time } = req.body;

    const newAppointment = new appointmentModel({
      userId,
      tecId,
      date,
      time,
      isCompleted: false,
      cancelled: false,
    });

    await newAppointment.save();
    res.json({ success: true, message: "Appointment Booked Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  userAppointments,
  bookAppointment,
};
