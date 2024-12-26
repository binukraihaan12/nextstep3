import express from "express";
import {
  appointmentCancel,
  appointmentComplete,
  appointmentsTeacher,
  DashboardData,
  loginTeacher,
  teacherList,
  teacherProfile,
  updateTeacherProfile,
} from "../controllers/teacherController.js";
import authTeacher from "../middleware/authTeacher.js";

const teacherRouter = express.Router();

teacherRouter.get("/list", teacherList);
teacherRouter.post("/login", loginTeacher);
teacherRouter.post("/complete-appointment", authTeacher, appointmentComplete);
teacherRouter.post("/cancel-appointment", authTeacher, appointmentCancel);
teacherRouter.get("/appointment", authTeacher, appointmentsTeacher);
teacherRouter.get("/dashboard", authTeacher, DashboardData);
teacherRouter.get("/profile", authTeacher, teacherProfile);
teacherRouter.post("/update-profile", authTeacher, updateTeacherProfile);

export default teacherRouter;
