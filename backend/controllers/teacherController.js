import teacherModel from "../models/teacherModel.js";
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

const changeAvailability = async (req, res) => {
  try {
    const { tecId } = req.body;

    const tecData = await teacherModel.findById(tecId);

    await teacherModel.findByIdAndUpdate(tecId, {
      available: !tecData.available,
    });

    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: error.message });
  }
};

const teacherList = async (req, res) => {
  try {
    const teachers = await teacherModel
      .find({ available: true })
      .select("-password");

    res.json({ success: true, teachers });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: error.message });
  }
};

// API for teacher login
const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await teacherModel.findOne({ email });

    if (!teacher) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const isMatch = verifyPassword(password, teacher.password);

    if (isMatch) {
      const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Other APIs remain unchanged...

export {
  changeAvailability,
  teacherList,
  loginTeacher,
  appointmentsTeacher,
  DashboardData,
  appointmentCancel,
  teacherProfile,
  updateTeacherProfile,
  appointmentComplete,
};
