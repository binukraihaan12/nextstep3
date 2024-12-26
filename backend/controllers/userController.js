import validator from "validator";
import crypto from "crypto";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import teacherModel from "../models/teacherModel.js";
import appointmentModel from "../models/appointmentModel.js";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".hbs",
      partialsDir: path.resolve("./templates/"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./templates/"),
    extName: ".hbs",
  })
);

// Helper function to hash passwords
const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return { salt, hash };
};

// Helper function to verify hashed passwords
const verifyPassword = (password, salt, hash) => {
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return hashedPassword === hash;
};

// API for registering a user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Invalid or Missing Details",
      });
    }

    // Validating Email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Invalid Email Provided",
      });
    }

    // Hashing Password
    const { salt, hash } = hashPassword(password);

    const userData = {
      name,
      email,
      password: hash,
      salt,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
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
      return res.json({ success: false, message: "User Doesn't Exist" });
    }

    const isMatch = verifyPassword(password, user.salt, user.password);

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

// API to get user data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password -salt");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, mobile, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !mobile || !address || !gender || !dob) {
      return res.json({ success: false, message: "Data Missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      mobile,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Profile Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Select Random Skype Link
const getRandomSkypeLink = () => {
  const data = fs.readFileSync(path.resolve("MeetingLinks.json"), "utf-8");
  const skypeLinks = JSON.parse(data).links;
  const randomIndex = Math.floor(Math.random() * skypeLinks.length);
  return skypeLinks[randomIndex];
};

// API to book the session
const bookAppointment = async (req, res) => {
  try {
    const { userId, tecId, slotTime, slotDate } = req.body;

    const tecData = await teacherModel.findById(tecId).select("-password");

    if (!tecData.available) {
      return res.json({ success: false, message: "Teacher not available" });
    }

    let slots_booked = tecData.slots_booked;

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slots Not Available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const meetingLink = getRandomSkypeLink();

    const userData = await userModel.findById(userId).select("-password -salt");

    delete tecData.slots_booked;

    const appointmentData = {
      userId,
      tecId,
      userData,
      slotTime,
      tecData,
      slotDate,
      meetingLink,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    await teacherModel.findByIdAndUpdate(tecId, { slots_booked });

    const formattedDate = new Date(
      slotDate.split("_").reverse().join("-")
    ).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: tecData.email,
      subject: "New Q&A Session Booked",
      template: "appointment",
      context: {
        teacherName: tecData.name,
        studentName: userData.name,
        studentEmail: userData.email,
        appointmentDate: formattedDate,
        appointmentTime: slotTime,
        meetingLink: meetingLink,
      },
    };

    const mailOptionsStudent = {
      from: process.env.EMAIL_USER,
      to: userData.email,
      subject: "New Q&A Session Booked",
      template: "appointmentStudent",
      context: {
        teacherName: tecData.name,
        teacherEmail: tecData.email,
        appointmentDate: formattedDate,
        appointmentTime: slotTime,
        meetingLink: meetingLink,
      },
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending teacher email:", error);
      } else {
        console.log("Email sent to the teacher:", info.response);
      }
    });

    transporter.sendMail(mailOptionsStudent, (error, info) => {
      if (error) {
        console.log("Error sending student email:", error);
      } else {
        console.log("Email sent to the student:", info.response);
      }
    });

    res.json({
      success: true,
      message: "Q&A Session Booked Successfully",
      meetingLink,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user sessions
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized Action" });
    }

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

// API to complete appointment
const completeAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized Action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      isCompleted: true,
    });
    return res.json({ success: true, message: "Q&A Session Completed ✨" });
  } catch (error) {
    console.log(error);
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  completeAppointment,
};
