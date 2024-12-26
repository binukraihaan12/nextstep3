import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";
import teacherModel from "../models/teacherModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// Helper function to hash passwords using crypto
const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex"); // Generate a random salt
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex"); // Hash the password with salt
  return { salt, hashedPassword };
};

// Helper function to verify passwords
const verifyPassword = (password, salt, hashedPassword) => {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return hash === hashedPassword;
};

// API for adding teachers
const addTeacher = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      subject,
      degree,
      experience,
      about,
      address,
      mobile,
      whatsapp,
    } = req.body;

    const imageFile = req.file; // Multer adds 'file' object to the request

    console.log(
      {
        name,
        email,
        password,
        subject,
        degree,
        experience,
        about,
        address,
        mobile,
        whatsapp,
      },
      imageFile
    );

    if (
      !name ||
      !email ||
      !password ||
      !subject ||
      !degree ||
      !experience ||
      !about ||
      !address ||
      !mobile ||
      !whatsapp
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    if (!validator.isMobilePhone(mobile, "any", { strictMode: false })) {
      return res.json({
        success: false,
        message: "Enter a valid mobile number",
      });
    }

    // Hash the password using crypto
    const { salt, hashedPassword } = hashPassword(password);

    // Image uploading to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const teacherData = {
      name,
      email,
      password: hashedPassword,
      salt,
      image: imageUrl,
      subject,
      degree,
      experience,
      about,
      whatsapp,
      mobile,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newTeacher = new teacherModel(teacherData);
    await newTeacher.save();

    res.json({
      success: true,
      message: "New Teacher Arrived",
    });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: error.message });
  }
};

// API for Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: error.message });
  }
};

// API for getting teacher data
const allTeachers = async (req, res) => {
  try {
    const teachers = await teacherModel.find({}).select("-password -salt");

    res.json({ success: true, teachers });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: error.message });
  }
};

// API to get all the appointments
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for cancelling a session
const cancelAppointmentAdmin = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const { tecId, slotDate, slotTime } = appointmentData;
    const teacherData = await teacherModel.findById(tecId);

    let slots_booked = teacherData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await teacherModel.findByIdAndUpdate(tecId, { slots_booked });

    res.json({ success: true, message: "Q&A Session Cancelled" });
  } catch (error) {
    console.log(error);
  }
};

// API to get dashboard data
const adminDashboard = async (req, res) => {
  try {
    const teachers = await teacherModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      teachers: teachers.length,
      appointments: appointments.length,
      users: users.length,
      latestAppointments: appointments.reverse().slice(0, 4),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
  }
};

export {
  addTeacher,
  adminDashboard,
  loginAdmin,
  allTeachers,
  appointmentsAdmin,
  cancelAppointmentAdmin,
};
