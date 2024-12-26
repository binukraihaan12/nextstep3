import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tecId: { type: String, required: true },
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },
  userData: { type: Object, required: true },
  tecData: { type: Object, required: true },
  date: { type: Number, required: true },
  cancelled: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
  meetingLink: { type: String, required: true },
});

const appointmentModel =
  mongoose.model.appointment ||
  mongoose.model("appointment", appointmentSchema);

export default appointmentModel;
