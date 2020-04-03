const connection = require("../config/connection");
const knex = require("knex")(connection);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");

const {
  validateSignupUser,
  validateLogin,
  checkUsernameOrEmail
} = require("../../util/validation");

const default_image = "blank_profile.png";

// * Route Signupj
exports.signup = async (req, res) => {
  let encryptPassword;
  let error = {};

  try {
    encryptPassword = await bcrypt.hash(req.body.password, 12);
  } catch (err) {
    console.log(err);
  }
  const signupData = {
    full_name: req.body.full_name,
    username: req.body.username,
    email: req.body.email,
    password: encryptPassword,
    image: default_image,
    following: 0,
    followers: 0,
    bio: "",
    website: "",
    location: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  let dataUser;

  knex("data_user")
    .where({ username: signupData.username })
    .then(rows => {
      if (rows.length > 0) {
        error.username = "Username sudah ada";
        return false;
      } else {
        return knex("data_user").where({ email: signupData.email });
      }
    })
    .then(rows => {
      if (rows.length > 0) {
        error.email = "Email sudah ada";
        return false;
      }
    })
    .then(() => {
      const success = Object.keys(error).length;
      if (success > 0) {
        return res.status(400).json(error);
      } else {
        return knex("data_user").insert(signupData);
      }
    })
    .then(rows => {
      if (rows > 0) {
        return knex("data_user").where("id_user", rows);
      } else {
        return false;
      }
    })
    .then(rows => {
      if (rows.length > 0) {
        dataUser = rows[0];
        if (dataUser) {
          const token = jwt.sign(
            { id_user: dataUser.id_user },
            "supersecretkey"
          );
          return res.json({ id_user: dataUser.id_user, token });
        } else {
          return res.status(400).json("Something went wrong");
        }
      } else {
        return false;
      }
    })
    .catch(err => {
      return res.status(400).json(err);
    });
};

exports.getAllUserData = (req, res) => {
  const username = req.params.username;
  knex("data_user")
    .where("username", username)
    .then(rows => {
      return res.json(rows[0]);
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getUserById = (req, res) => {
  const id = req.params.userId;
  knex("data_user")
    .where("id_user", id)
    .then(rows => {
      return res.json(rows[0]);
    })
    .catch(err => {
      console.log(err);
    });
};

// * Route Login
exports.login = (req, res, callback) => {
  const user = {
    input: req.body.input,
    password: req.body.password
  };
  const { errors, valid } = validateLogin(user);
  if (!valid) {
    return res.status(400).json(errors);
  } else {
    const checkEmail = checkUsernameOrEmail(user.input);
    let dataUser;

    if (checkEmail.valid) {
      //   Apabila email valid, maka login make email
      knex("data_user")
        .where({ email: user.input })
        .then(rows => {
          if (rows.length === 0) {
            return res.status(400).json({ general: "Email belum terdaftar!" });
          }
          dataUser = rows[0];
          return bcrypt.compare(user.password, rows[0].password);
        })
        .then(data => {
          if (data) {
            const token = jwt.sign(
              { id_user: dataUser.id_user },
              "supersecretkey"
            );
            return res.json({ id_user: dataUser.id_user, token });
          } else {
            return res
              .status(400)
              .json({ general: "Password salah, cek kembali" });
          }
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      //   Apabila email tidak valid, maka login make username
      knex("data_user")
        .where({ username: user.input })
        .then(rows => {
          if (rows.length === 0) {
            return res
              .status(400)
              .json({ general: "Username belum terdaftar!" });
          }
          dataUser = rows[0];
          return bcrypt.compare(user.password, rows[0].password);
        })
        .then(data => {
          if (data) {
            const token = jwt.sign(
              { id_user: dataUser.id_user },
              "supersecretkey",
              {
                expiresIn: "1h"
              }
            );
            return res.json({ id_user: dataUser.id_user, token });
          } else {
            res.status(400).json({ general: "Password salah, cek kembali" });
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};

// * Route get details user
exports.getDataUser = (req, res) => {
  let id_postingan = [];
  let id_like = [];
  let id_comment = [];
  let userData = {};
  if (!req.isAuth) {
    return res.status(400).json({ message: "Unauthenticated" });
  }
  knex("data_user")
    .where("id_user", req.id_user)
    .then(rows => {
      userData.user_details = rows[0];
      return knex("data_like")
        .where("id_user", req.id_user)
        .select("id_like", "id_postingan", "created_at");
    })
    .then(data => {
      userData.likes = data;
      return knex("data_postingan").where("id_user", req.id_user);
    })
    .then(datas => {
      datas.forEach(data => {
        id_postingan.push(data.id_postingan);
      });
      return knex("data_comment").whereIn("id_postingan", id_postingan);
    })
    .then(rows => {
      rows.forEach(row => {
        id_comment.push(row.id_postingan);
      });
      return knex("data_like").whereIn("id_postingan", id_postingan);
    })
    .then(rows => {
      rows.forEach(row => {
        id_like.push(row.id_postingan);
      });
      return knex("data_notifikasi")
        .whereIn("id_notifikasi", id_like)
        .andWhere("config_notifikasi", 1)
        .orderBy("created_at", "desc");
    })
    .then(rows => {
      userData.notifications = { like: rows };
      return knex("data_notifikasi")
        .whereIn("id_notifikasi", id_comment)
        .andWhere("config_notifikasi", 2)
        .orderBy("created_at", "desc");
    })
    .then(rows => {
      userData.notifications = { ...userData.notifications, comment: rows };
      return res.json(userData);
    })
    .catch(err => {
      return res.status(400).json({ error: err.code });
    });
};

// * Route edit data user
exports.editProfileUser = (req, res) => {
  if (!req.isAuth) {
    return res.status(400).json({ message: "Unathrozization" });
  }
  let old_profileImage;

  knex("data_user")
    .where("id_user", req.id_user)
    .select("image")
    .then(rows => {
      old_profileImage = rows[0].image;
      if (!req.file) {
        return knex("data_user")
          .where("id_user", req.id_user)
          .update({
            full_name: req.body.full_name,
            bio: req.body.bio,
            website: req.body.website,
            location: req.body.location,
            updated_at: new Date().toISOString()
          });
      } else {
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

        const imageUser = `${req.id_user +
          "-profile-" +
          fullDate +
          "-" +
          req.file.originalname}`;

        return knex("data_user")
          .where("id_user", req.id_user)
          .update({
            full_name: req.body.full_name,
            image: imageUser,
            bio: req.body.bio,
            website: req.body.website,
            location: req.body.location,
            updated_at: new Date().toISOString()
          });
      }
    })
    .then(() => {
      return knex("data_user")
        .where("id_user", req.id_user)
        .select("image");
    })
    .then(rows => {
      if (old_profileImage === "blank_profile.png") {
        return res.status(200).json("Default foto tidak berubah");
      } else if (old_profileImage === rows[0].image) {
        return res.status(200).json("Data berhasil diubah dan image tetap ");
      } else if (old_profileImage !== rows[0].image) {
        const __dirname =
          "C:/Users/Achmad Sufyan Aziz/Documents/Project-React.js/share-moment-app/client/public/image/profile_image/";
        fs.unlink(__dirname + old_profileImage, function(err) {
          if (err && err.code == "ENOENT") {
            // file doens't exist
            console.info("File doesn't exist, won't remove it.");
          } else if (err) {
            // other errors, e.g. maybe we don't have enough permission
            console.error("Error occurred while trying to remove file");
          } else {
            return res.json("Data is changed and Old image are replaced");
          }
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

exports.searchUser = (req, res) => {
  const username = req.params.username;

  knex("data_user")
    .where("username", "like", `%${username}%`)
    .then(rows => {
      return res.status(200).json(rows);
    })
    .catch(err => {
      return res.status(400).json(err.code);
    });
};
