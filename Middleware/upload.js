// const multer = require("multer");
// const path = require("path");

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10 MB limit
//   },
//   fileFilter: function (req, file, cb) {
//     // Allowed file types
//     const filetypes = /jpeg|jpg|png/;
//     const extname = filetypes.test(
//       path.extname(file.originalname).toLowerCase()
//     );
//     const mimetype = filetypes.test(file.mimetype);
//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb(new Error("Only images with .jpeg, .jpg, or .png formats are allowed"));
//   },
// });

// module.exports = upload;
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Store images in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
