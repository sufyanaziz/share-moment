const multer = require("multer");

const date = new Date();
const day = date.getDay();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const month = months[date.getMonth()];
const year = date.getFullYear();
const fullDate = `${day}-${month}-${year}`;

const storagePostingan = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, ".//client/public/image/post_image");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      `${req.id_user + "-postingan-" + fullDate + "-" + file.originalname}`
    );
  }
});

const storageProfileImageUser = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, ".//client/public/image/profile_image");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      `${req.id_user + "-profile-" + fullDate + "-" + file.originalname}`
    );
  }
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

exports.uploadImageProfile = multer({
  storage: storageProfileImageUser,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter
});

exports.uploadImagePost = multer({
  storage: storagePostingan,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter
});
