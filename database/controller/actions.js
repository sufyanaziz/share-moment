const connection = require("../config/connection");
const knex = require("knex")(connection);

const { insertToNotification, deleteNotification } = require("./notification");

exports.createNotificationOnLikes = (req, res) => {
  if (!req.isAuth) {
    return res.json({ message: "Unauthenticated" });
  }
  const datalike = {
    id_postingan: req.params.postingId,
    id_user: req.id_user,
    created_at: new Date().toISOString(),
  };
  let like;
  let id_like;
  let id_user_post;
  let userLike = {};
  let postingData = {};

  knex("data_like")
    .where({ id_user: req.id_user, id_postingan: datalike.id_postingan })
    .then((rows) => {
      like = rows.length;
      if (like > 0) {
        res.status(400).json({ message: "Anda sudah menyukai postingan ini" });
        return false;
      }
      return knex("data_like").insert(datalike);
    })
    .then((rows) => {
      return knex("data_like").where("id_like", rows);
    })
    .then((rows) => {
      userLike = rows[0];
      return knex("data_postingan").where("id_postingan", req.params.postingId);
    })
    .then((rows) => {
      postingData = rows[0];
      return knex("data_like").where("id_postingan", req.params.postingId);
    })
    .then((rows) => {
      return knex("data_postingan")
        .where("id_postingan", req.params.postingId)
        .update({ like_count: rows.length });
    })
    .then(() => {
      return knex("data_like")
        .where("id_postingan", req.params.postingId)
        .select("id_like", "id_postingan")
        .orderBy("created_at", "desc");
    })
    .then((rows) => {
      id_like = rows[0].id_like;
      return knex("data_postingan")
        .where({
          id_postingan: rows[0].id_postingan,
        })
        .select("id_user");
    })
    .then((rows) => {
      id_user_post = rows[0].id_user;
      return knex("data_user").where("id_user", req.id_user);
    })
    .then((rows) => {
      if (id_user_post === req.id_user) {
        return;
      } else {
        const notif_onLike = {
          config_notifikasi: 1,
          id_notifikasi: req.params.postingId,
          username: rows[0].username,
          read_notif: "false",
          created_at: new Date().toISOString(),
        };
        if (like === 0) return insertToNotification(notif_onLike);
      }
    })
    .then(() => {
      postingData.like_count++;
      return res.json({ posting_data: postingData, userLike: userLike });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteNotificationOnLikes = (req, res) => {
  if (!req.isAuth) {
    return res.json({ message: "Unauthenticated" });
  }
  let id_like;
  let user_postingan;
  knex("data_like")
    .where({ id_user: req.id_user, id_postingan: req.params.postingId })
    .then((rows) => {
      id_like = rows[0].id_like;
      return knex("data_like")
        .where({ id_user: req.id_user, id_postingan: req.params.postingId })
        .del();
    })
    .then(() => {
      return knex("data_postingan").where("id_postingan", req.params.postingId);
    })
    .then((rows) => {
      user_postingan = rows[0];
      return knex("data_like")
        .where("id_postingan", req.params.postingId)
        .orderBy("created_at", "desc");
    })
    .then((rows) => {
      return knex("data_postingan")
        .where("id_postingan", req.params.postingId)
        .update({ like_count: rows.length });
    })
    .then(() => {
      return deleteNotification({
        config_notifikasi: 1,
        id_notifikasi: id_like,
      });
    })
    .then(() => {
      user_postingan.like_count--;
      return res.json(user_postingan);
    })
    .catch((err) => {
      console.log(err);
    });
};
