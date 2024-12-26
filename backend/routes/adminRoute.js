import express from "express";
import {
  addTeacher,
  adminDashboard,
  allTeachers,
  appointmentsAdmin,
  cancelAppointmentAdmin,
  loginAdmin,
} from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";
import { changeAvailability } from "../controllers/teacherController.js";

const adminRouter = express.Router();

// Define the add-teacher route with multer middleware for file upload
adminRouter.post("/add-teacher", authAdmin, upload.single("image"), addTeacher);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-teachers", authAdmin, allTeachers);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.get("/dashboard", authAdmin, adminDashboard);
adminRouter.post("/cancel-appointment", authAdmin, cancelAppointmentAdmin);

export default adminRouter;
