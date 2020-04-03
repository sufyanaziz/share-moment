import React, { useState, useEffect, useContext } from "react";
import { ShareMomentContext } from "../../globalContext/globalstorage";
import { Link } from "react-router-dom";
import axios from "../../config/axios";
import Like from "../Like/Like";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const useStyles = makeStyles({
  root: {
    marginBottom: "2rem",
    border: "0.5px solid gray",
    "&:hover": {
      boxShadow: "0 2px 10px gray"
    }
  },
  status: {
    display: "flex"
  },
  link: {
    textDecoration: "none"
  }
});

const Postingan = ({ data }) => {
  const classes = useStyles();
  const context = useContext(ShareMomentContext);
  const [gambarUser, setGambarUser] = useState("");
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    id_postingan,
    id_user,
    url_gambar,
    status_postingan,
    location,
    created_at,
    like_count,
    comment_count
  } = data;

  const { deletePostingan } = context.postingan;

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

  dayjs.extend(relativeTime);

  const deletePost = id => {
    if (window.confirm("Apakah anda yakin ingin menghapus postingan ini?")) {
      deletePostingan(id);
      handleClose();
    } else {
      return false;
    }
  };

  const dialog = (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {context.user.user_details.id_user === id_user ? (
          <Typography
            variant="body1"
            component={Link}
            to={`/postingan/${id_postingan}`}
            style={{
              padding: "1rem 3rem",
              textDecoration: "none",
              color: "black"
            }}
          >
            See Post
          </Typography>
        ) : (
          <Typography
            variant="body1"
            component={Link}
            to={`/postingan/${id_postingan}`}
            style={{
              padding: "1rem 3rem",
              textDecoration: "none",
              color: "black",
              borderBottom: "1px solid black"
            }}
          >
            See Post
          </Typography>
        )}

        {context.user.user_details.id_user === id_user && (
          <div
            style={{
              padding: "1rem 3rem",
              textDecoration: "none",
              color: "black",
              borderBottom: "1px solid black",
              borderTop: "1px solid black",
              cursor: "pointer"
            }}
            onClick={() => deletePost(id_postingan)}
          >
            <Typography
              variant="body1"
              style={{
                textDecoration: "none",
                color: "black"
              }}
            >
              Delete Post
            </Typography>
          </div>
        )}

        <div onClick={handleClose}>
          <Typography
            variant="body1"
            style={{ padding: "1rem 3rem", cursor: "pointer" }}
          >
            Cancel
          </Typography>
        </div>
      </div>
    </Dialog>
  );

  return (
    <React.Fragment>
      <Card className={classes.root}>
        <Link
          to={`/${username}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <CardHeader
            avatar={
              <Avatar>
                <img
                  src={`/image/profile_image/${gambarUser}`}
                  style={{ width: "auto", height: "100%" }}
                />
              </Avatar>
            }
            title={username}
            subheader={location}
          />
        </Link>
        <CardMedia
          image={`/image/post_image/${url_gambar}`}
          style={{
            height: 500,
            width: "100%"
          }}
        />

        <CardActions>
          <Like id_postingan={id_postingan} data={context.user} />
          <IconButton style={{ marginLeft: "auto" }} onClick={handleClickOpen}>
            <MoreVertIcon style={{ fontSize: 30 }} />
          </IconButton>
        </CardActions>
        <Typography variant="body2" style={{ marginLeft: "1rem" }}>
          {like_count} likes
        </Typography>
        <CardContent>
          <Typography
            variant="caption"
            style={{
              marginRight: "9px",
              fontWeight: "bold",
              fontSize: "1rem"
            }}
          >
            {username}
          </Typography>
          <Typography
            variant="caption"
            style={{
              fontSize: "1rem"
            }}
          >
            {status_postingan}
          </Typography>
          <br />
          <Link to={`/postingan/${id_postingan}`} className={classes.link}>
            <Typography variant="body1" color="textSecondary">
              view all {comment_count} comments
            </Typography>
          </Link>
          <br />
          <Typography variant="body1" color="textSecondary">
            {dayjs(created_at).fromNow()}
          </Typography>
        </CardContent>
      </Card>
      {dialog}
    </React.Fragment>
  );
};

export default Postingan;
