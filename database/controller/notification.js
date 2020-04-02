const connection = require("../config/connection");
const knex = require("knex")(connection);

exports.insertToNotification = data => {
  let row;
  knex("data_notifikasi")
    .insert(data)
    .then(rows => {
      row = rows;
      console.log("notification added");
    })
    .catch(err => {
      console.log(err);
    });

  return row;
};

exports.deleteNotification = ({ config_notifikasi, id_notifikasi }) => {
  let row;
  knex("data_notifikasi")
    .where({ config_notifikasi, id_notifikasi })
    .del()
    .then(rows => {
      row = rows;
      console.log("notification deleted");
    })
    .catch(err => {
      console.log(err);
    });
  return row;
};

exports.readNotification = (req, res) => {
  if (!req.isAuth) return res.json({ message: "Unauthenticated" });
  const id_user = req.id_user;
  let id_like = [];
  let id_comment = [];

  const id_postingan = [];

  knex("data_postingan")
    .where("id_user", id_user)
    .select("id_postingan")
    .then(rows => {
      rows.forEach(row => {
        id_postingan.push(row.id_postingan);
      });
      return knex("data_comment")
        .whereIn("id_postingan", id_postingan)
        .select("id_postingan");
    })
    .then(rows => {
      rows.forEach(row => {
        id_comment.push(row.id_postingan);
      });
      return knex("data_like")
        .whereIn("id_postingan", id_postingan)
        .select("id_postingan");
    })
    .then(rows => {
      rows.forEach(row => {
        id_like.push(row.id_postingan);
      });
      return knex("data_notifikasi")
        .whereIn("id_notifikasi", id_like)
        .andWhere("config_notifikasi", 1)
        .select("read_notif");
    })
    .then(rows => {
      const readNotif = [];
      rows.forEach(row => {
        readNotif.push(row.read_notif);
      });
      const nestedReadNotif = Array.from(new Set(readNotif));

      return knex("data_notifikasi")
        .update({
          read_notif: "true"
        })
        .whereIn("id_notifikasi", id_like)
        .andWhere("config_notifikasi", 1);
    })
    .then(() => {
      return knex("data_notifikasi")
        .whereIn("id_notifikasi", id_comment)
        .andWhere("config_notifikasi", 2)
        .select("read_notif");
    })
    .then(rows => {
      const readNotif = [];
      rows.forEach(row => {
        readNotif.push(row.read_notif);
      });
      const nestedReadNotif = Array.from(new Set(readNotif));
      return knex("data_notifikasi")
        .update({
          read_notif: "true"
        })
        .whereIn("id_notifikasi", id_comment)
        .andWhere("config_notifikasi", 2);
    })
    .then(() => {
      res.json({ message: "Notification has been read" });
    })
    .catch(err => {
      console.log(err);
    });
};
