// import multer from "multer";

// const storage = multer.diskStorage({
//   filename: function (req, file, callback) {
//     callback(null, file.originalname);
//   },
// });

// const upload = multer({ storage });

// export default upload;

import multer from "multer";
import path from "path";

// Configure storage settings for multer
const storage = multer.diskStorage({
  // Set the upload destination
  destination: (req, file, callback) => {
    callback(null, "uploads/"); // Directory where images will be stored
  },
  // Rename the file to ensure uniqueness
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  },
});

// File filter to allow only certain file types (images)
const fileFilter = (req, file, callback) => {
  const fileTypes = /jpeg|jpg|png|gif/; // Allowed file types
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extname) {
    callback(null, true); // Accept file
  } else {
    callback(new Error("Only image files are allowed!"), false); // Reject file
  }
};

// Set up multer with storage, file size limit, and file filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 15 }, // Limit file size to 5MB
  fileFilter: fileFilter,
});

export default upload;
