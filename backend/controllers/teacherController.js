import teacherModel from "../models/teacherModel.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

// Helper function for hashing passwords
const hashPassword = (password) => {
  return crypto
    .createHmac("sha256", process.env.JWT_SECRET)
    .update(password)
    .digest("hex");
};

// Helper function for verifying passwords
const verifyPassword = (password, hashedPassword) => {
  const hashedInputPassword = crypto
    .createHmac("sha256", process.env.JWT_SECRET)
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

const appointmentsTeacher = async (req, res) => {
  try {
    const { tecId } = req.body;
    const appointments = await appointmentModel.find({ tecId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
  }
};

const appointmentComplete = async (req, res) => {
  try {
    const { tecId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.tecId === tecId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Q&A Session Completed ✨" });
    } else {
      return res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    console.log(error);
  }
};

const appointmentCancel = async (req, res) => {
  try {
    const { tecId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.tecId === tecId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Q&A Session Cancelled" });
    } else {
      return res.json({ success: false, message: "Cancellation Failed" });
    }
  } catch (error) {
    console.log(error);
  }
};

const DashboardData = async (req, res) => {
  try {
    const { tecId } = req.body;
    const appointments = await appointmentModel.find({ tecId });

    let students = [];

    appointments.map((item) => {
      if (!students.includes(item.userId)) {
        students.push(item.userId);
      }
    });

    const dashData = {
      appointments: appointments.length,
      students: students.length,
      latestAppointments: appointments.reverse().slice(0, 4),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
  }
};

const teacherProfile = async (req, res) => {
  try {
    const { tecId } = req.body;
    const profileData = await teacherModel.findById(tecId).select("-password");
    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
  }
};

const updateTeacherProfile = async (req, res) => {
  try {
    const { tecId, address, available, mobile, whatsapp } = req.body;
    await teacherModel.findByIdAndUpdate(tecId, {
      address,
      available,
      mobile,
      whatsapp,
    });

    res.json({ success: true, message: "Profile Updated Successfully" });
  } catch (error) {
    console.log(error);
  }
};

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
