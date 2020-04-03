import React, { useEffect, useState, useContext } from "react";
import axios from "../../config/axios";
import { Link } from "react-router-dom";
import { ShareMomentContext } from "../../globalContext/globalstorage";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  imageContainer: {
    height: "42px",
    width: "42px",
    marginRight: "15px",
    flex: 0.15
  },
  image: {
    borderRadius: "50%",
    objectFit: "cover",
    height: "100%",
    width: "100%"
  },
  comment_section: {
    display: "flex",
    marginTop: "20px"
  },
  comment: {
    flex: 1
  }
});

const Comment = ({ data }) => {
  const classes = useStyles();
  const context = useContext(ShareMomentContext);
  const [gambarUser, setGambarUser] = useState("");
  const [username, setUsername] = useState("");
  dayjs.extend(relativeTime);
  const { id_user, comment, created_at } = data;
  const { setOpenModal } = context.ui;

  useEffect(() => {
    let mounted = true;
    axios
      .get(`/user/${id_user}`)
      .then(res => {
        if (mounted) {
          setGambarUser(res.data.image);
          setUsername(res.data.username);
        }
      })
      .catch(err => {
        console.log(err);
      });
    return () => (mounted = false);
  }, []);

  return (
    <div className={classes.comment_section}>
      <div className={classes.imageContainer}>
        <img
          className={classes.image}
          src={`/image/profile_image/${gambarUser}`}
        />
      </div>
      <div className={classes.comment}>
        <Link
          to={`/${username}`}
          style={{ textDecoration: "none" }}
          onClick={() => setOpenModal(false)}
        >
          <Typography
            variant="body2"
            style={{
              fontWeight: "bold",
              color: "black"
            }}
          >
            {username}
          </Typography>
        </Link>
        <Typography variant="body2">{comment}</Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(created_at).fromNow()}{" "}
        </Typography>
      </div>
    </div>
  );
};

export default Comment;
