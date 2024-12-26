import validator from "validator";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import teacherModel from "../models/teacherModel.js";
import appointmentModel from "../models/appointmentModel.js";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import crypto from "crypto";

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

// Function to hash password using crypto
const hashPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

// API For Register User
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
    const hashedPassword = hashPassword(password);

    const userData = {
      name,
      email,
      password: hashedPassword,
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

// API for user Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User Doesn't Exists" });
    }

    const hashedPassword = hashPassword(password);

    if (hashedPassword === user.password) {
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

// Other APIs remain unchanged
// ...
