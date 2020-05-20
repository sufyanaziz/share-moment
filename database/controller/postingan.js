const connection = require("../config/connection");
const knex = require("knex")(connection);
const fs = require("fs");
const path = require("path");

const { validatePost, validateComment } = require("../../util/validation");
const { insertToNotification, deleteNotification } = require("./notification");

exports.getAllPostingan = (req, res) => {
  if (!req.isAuth) return res.status(400).json("Unauthenticated");
  knex("data_postingan")
    .select("*")
    .orderBy("created_at", "desc")
    .then(rows => {
      return res.json(rows);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getSinglePostingan = (req, res) => {
  const id_postingan = req.params.postingId;
  let postingan = {};
  let details_postingan;
  knex("data_postingan")
    .where("id_postingan", id_postingan)
    .then(rows => {
      details_postingan = rows[0];
      return knex("data_comment")
        .where("id_postingan", rows[0].id_postingan)
        .orderBy("created_at", "desc");
    })
    .then(rows => {
      postingan.comments = rows;
      return res.json({ ...details_postingan, comments: postingan.comments });
    })
    .catch(err => {
      return res.status(400).json({ error: err.code });
    });
};

exports.getUserPostingan = (req, res) => {
  const userId = req.params.userId;
  knex("data_postingan")
    .where("id_user", userId)
    .orderBy("created_at", "desc")
    .then(rows => {
      return res.json(rows);
    })
    .catch(err => {
      return res.status(400).json({ error: err.code });
    });
};

exports.createPostingan = (req, res) => {
  if (!req.isAuth) {
    return res.json({ message: "Unathrozization" });
  }
  const { errors, valid } = validatePost({
    url_gambar: req.file
  });
  if (!valid) return res.status(400).json(errors);

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

  const newFilenameGambar = `${req.id_user +
    "-postingan-" +
    fullDate +
    "-" +
    req.file.originalname}`;

  const dataPostingan = {
    id_user: req.id_user,
    url_gambar: newFilenameGambar,
    status_postingan: req.body.status_postingan,
    location: req.body.location,
    created_at: new Date().toISOString(),
    like_count: 0,
    comment_count: 0
  };

  knex("data_postingan")
    .insert(dataPostingan)
    .then(() => res.json({ success: "Data berhasil ditambahkan" }))
    .catch(err => res.status(400).json({ error: err.code }));
  1000;
};

exports.commentOnPost = (req, res) => {
  if (!req.isAuth) return res.json({ message: "Unauthenticated" });

  const comment = {
    id_postingan: req.params.postingId,
    id_user: req.id_user,
    comment: req.body.comment,
    created_at: new Date().toISOString()
  };
  const { valid, errors } = validateComment(comment);
  if (!valid) return res.status(400).json(errors);

  let id_user_comment;
  let userComment = {};
  knex("data_postingan")
    .where("id_postingan", req.params.postingId)
    .then(rows => {
      if (rows.length === 0) {
        return res.json({ message: "Postingan tidak ditemukan" });
      }
      return knex("data_comment").insert(comment);
    })
    .then(rows => {
      return knex("data_comment").where("id_comment", rows);
    })
    .then(rows => {
      userComment = rows[0];
      return knex("data_comment").where("id_postingan", req.params.postingId);
    })
    .then(rows => {
      return knex("data_postingan")
        .where("id_postingan", req.params.postingId)
        .update({ comment_count: rows.length });
    })
    .then(() => {
      return knex("data_comment")
        .where("id_postingan", req.params.postingId)
        .select("id_comment", "id_postingan")
        .orderBy("created_at", "desc");
    })
    .then(rows => {
      id_comment = rows[0].id_comment;
      return knex("data_postingan")
        .where({
          id_postingan: rows[0].id_postingan
        })
        .select("id_user");
    })
    .then(rows => {
      id_user_comment = rows[0].id_user;

      return knex("data_user").where("id_user", req.id_user);
    })
    .then(rows => {
      if (id_user_comment === req.id_user) {
        return;
      } else {
        const notif_onComment = {
          config_notifikasi: 2,
          id_notifikasi: req.params.postingId,
          username: rows[0].username,
          read_notif: "false",
          created_at: new Date().toISOString()
        };
        return insertToNotification(notif_onComment);
      }
    })
    .then(() => {
      return res.json(userComment);
    })
    .catch(err => {
      return res.json({ error: err.code });
    });
};

exports.deletePostingan = (req, res) => {
  if (!req.isAuth) return res.json({ message: "Unauthenticated" });
  const postinganId = req.params.postingId;
  let id_user_comment = [];
  let id_user_like = [];
  let usernameOnComment = [];
  let usernameOnLike = [];
  let old_imagePostingan;

  knex("data_postingan")
    .where("id_postingan", req.params.postingId)
    .then(rows => {
      if (rows.length === 0) {
        return res.json({ message: "Post tidak ditemukan" });
      } else {
        const id_user = rows[0].id_user;
        old_imagePostingan = rows[0].url_gambar;
        if (id_user !== req.id_user) {
          return res.json("Tidak mendapatkan hak untuk menghapus");
        } else {
          return knex("data_comment").where({
            id_postingan: postinganId
          });
        }
      }
    })
    .then(rows => {
      rows.map(row => {
        id_user_comment.push(row.id_user);
      });
      return knex("data_user").whereIn("id_user", id_user_comment);
    })
    .then(rows => {
      rows.map(row => {
        usernameOnComment.push(row.username);
      });
      return knex("data_like").where("id_postingan", postinganId);
    })
    .then(rows => {
      rows.map(row => {
        id_user_like.push(row.id_user);
      });
      return knex("data_user").whereIn("id_user", id_user_like);
    })
    .then(rows => {
      rows.map(row => {
        usernameOnLike.push(row.username);
      });
      return knex("data_postingan")
        .where({
          id_user: req.id_user,
          id_postingan: postinganId
        })
        .del();
    })
    .then(rows => {
      if (rows === 1) {
         const dirpath = path.join(
          __dirname,
          "../../client/public/image/profile_image/"
        );
        fs.unlink(dirpath + old_imagePostingan, function(err) {
          if (err && err.code == "ENOENT") {
            // file doens't exist
            console.info("File doesn't exist, won't remove it.");
          } else if (err) {
            // other errors, e.g. maybe we don't have enough permission
            console.error("Error occurred while trying to remove file");
          } else {
            return console.log("image has been deleted!");
          }
        });
      } else {
        return true;
      }
    })
    .then(() => {
      return knex("data_like")
        .where({ id_postingan: postinganId })
        .del();
    })
    .then(() => {
      return knex("data_comment")
        .where({ id_postingan: postinganId })
        .del();
    })
    .then(() => {
      return knex("data_notifikasi")
        .whereIn("username", usernameOnLike)
        .andWhere({ config_notifikasi: 1, id_notifikasi: postinganId })
        .del();
    })
    .then(() => {
      return knex("data_notifikasi")
        .whereIn("username", usernameOnComment)
        .andWhere({ config_notifikasi: 2, id_notifikasi: postinganId })
        .del();
    })
    .then(() => {
      return res.json({ message: "Data berhasil dihapus!" });
    })
    .catch(err => {
      console.log("Error");
    });
};

// exports.deleteCommentOnPost = (req, res) => {
//   if (!req.isAuth) return res.json({ message: "Unauthenticated" });
//   knex("data_comment")
//     .where({
//       id_postingan: req.params.postingId,
//       id_comment: req.params.commentId
//     })
//     .then(rows => {
//       const id_user = rows[0].id_user;
//       if(id_user === req.id_user){
//         res.json()
//       }
//     })
//     .catch(err => console.log(err));
// };
