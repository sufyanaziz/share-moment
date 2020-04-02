const express = require("express");
const isAuth = require("./middleware/auth");
const app = express();

const { uploadImagePost, uploadImageProfile } = require("./util/multer");
const {
  signup,
  login,
  getDataUser,
  editProfileUser,
  getAllUserData,
  getUserById,
  searchUser
} = require("./database/controller/user");
const {
  createPostingan,
  commentOnPost,
  deletePostingan,
  getAllPostingan,
  getSinglePostingan,
  getUserPostingan
} = require("./database/controller/postingan");
const {
  createNotificationOnLikes,
  deleteNotificationOnLikes
} = require("./database/controller/actions");
const { readNotification } = require("./database/controller/notification");

const setHeader = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
};
app.use(express.json());
app.use(setHeader);
app.use(isAuth);

// const timeOut = (req, res, next) => {
//   res.setTimeout(1000, () => {});
//   next();
// };
// * Api
app.get("/api", (req, res) => {
  res.json("Share moment app api");
});

//  * Route User ------Start-------
app.post("/api/signup", signup);
app.post("/api/login", login);
app.get("/api/user", getDataUser);
app.post("/api/user/:username", getAllUserData);
app.get("/api/user/:userId", getUserById);
app.post("/api/user", uploadImageProfile.single("userImage"), editProfileUser);
app.get("/api/user/search/:username", searchUser);
// * Route User ------End---------

// * Route Postingan ------Start-------
app.post("/api/post/:postingId", getSinglePostingan);
app.get("/api/post/:userId", getUserPostingan);
app.get("/api/post", getAllPostingan);
app.post("/api/post", uploadImagePost.single("postImage"), createPostingan);
app.post("/api/post/:postingId/comment", commentOnPost);
app.delete("/api/post/:postingId", deletePostingan);
app.post("/api/notifications", readNotification);
// * Route Postingan ------End---------

// Route actions ------Start------
app.get("/api/post/:postingId/like", createNotificationOnLikes);
app.delete("/api/post/:postingId/like", deleteNotificationOnLikes);
// Route actions ------End--------

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`PORT Running at : http://localhost:${PORT}`);
});
