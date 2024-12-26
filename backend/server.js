import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongoDB.js";
import conectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import bodyParser from "body-parser";
import teacherRouter from "./routes/teacherRoute.js";
import userRouter from "./routes/userRoute.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
conectCloudinary();

// Middleware to parse JSON
app.use(bodyParser.json());

// Middleware to serve uploaded files statically
app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/admin", adminRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/user", userRouter);

app.post("/api/save-rating", (req, res) => {
  const { rating } = req.body;
  const csvFilePath = path.join(__dirname, "data", "rating.csv");

  const currentDateTime = new Date().toLocaleString("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  });

  const newEntry = `${currentDateTime},${rating} Stars\n`;

  fs.appendFile(csvFilePath, newEntry, (err) => {
    if (err) {
      console.error("Error saving rating:", err);
      return res.status(500).json({ error: "Failed to save rating" });
    }
    res.status(200).json({ message: "Rating saved successfully" });
  });
});

app.get("/", (req, res) => {
  res.send("api working");
});

app.listen(port, () => console.log("Server Started", port));
