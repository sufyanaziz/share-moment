import React, { useState, useEffect, useContext } from "react";
import { ShareMomentContext } from "../../globalContext/globalstorage";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
import Like from "../Like/Like";
import axios from "../../config/axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: 445,
    boxShadow: "0 0 5px black",
    "& ::-webkit-scrollbar": {
      width: "10px"
    },
    "& ::-webkit-scrollbar-track": {
      background: "#f1f1f1 "
    },
    "& ::-webkit-scrollbar-thumb": {
      background: "#888 "
    },
    "& ::-webkit-scrollbar-thumb:hover": {
      background: "#555"
    }
  },
  media: {
    flex: 1
  },
  imagePost: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  info: {
    flex: 0.6,
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: 1,
    overflowY: "auto"
  },
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
    marginBottom: "10px"
  },
  comment: {
    flex: 1
  },
  action: {
    padding: 0,
    borderTop: "1px solid gray"
  },
  input_comment: {
    borderTop: "1px solid gray",
    overflowY: "auto"
  }
});

const SinglePostingan = props => {
  const classes = useStyles();
  const [gambarUser, setGambarUser] = useState("");
  const [username, setUsername] = useState("");
  const context = useContext(ShareMomentContext);
  dayjs.extend(relativeTime);

  console.log(context);

  const {
    id_postingan,
    id_user,
    url_gambar,
    status_postingan,
    location,
    created_at,
    like_count
  } = props.data;

  useEffect(() => {
    let mounted = true;
    axios
      .get(`/user/${id_user}`)
      .then(res => {
        if (mounted) {
          document.title = `${res.data.username} on Posting : ${status_postingan}`;
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
    <React.Fragment>
      <Card className={classes.root}>
        <div className={classes.media}>
          <CardMedia
            className={classes.imagePost}
            image={`/image/post_image/${url_gambar}`}
          />
        </div>
        <div className={classes.info}>
          {context.ui.openModal ? (
            <div
              onClick={() => context.ui.closeModalPost(context.ui.pathName)}
              style={{
                color: "black",
                cursor: "pointer"
              }}
            >
              <CardHeader
                style={{ borderBottom: "1px solid gray" }}
                avatar={
                  <Avatar>
                    <img
                      src={`/image/profile_image/${gambarUser}`}
                      style={{ width: "auto", height: "100%" }}
                      alt="image"
                    />
                  </Avatar>
                }
                title={username}
                subheader={location}
              />
            </div>
          ) : (
            <Link
              to={`/${username}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <CardHeader
                style={{ borderBottom: "1px solid gray" }}
                avatar={
                  <Avatar>
                    <img
                      src={`/image/profile_image/${gambarUser}`}
                      style={{ width: "auto", height: "100%" }}
                      alt="image"
                    />
                  </Avatar>
                }
                title={username}
                subheader={location}
              />
            </Link>
          )}

          <CardContent className={classes.content}>
            <div className={classes.comment_section}>
              <div className={classes.imageContainer}>
                <img
                  className={classes.image}
                  src={`/image/profile_image/${gambarUser}`}
                />
              </div>
              <div className={classes.comment}>
                <Typography variant="body2" style={{ fontWeight: "bold" }}>
                  {username}
                </Typography>
                <Typography variant="body2">{status_postingan}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {dayjs(created_at).fromNow()}{" "}
                </Typography>
              </div>
            </div>
            {context.postingan.loading ? (
              <p>loading</p>
            ) : !context.postingan.single_post.comments ? (
              <p>Not Found</p>
            ) : (
              context.postingan.single_post.comments.map(comment => {
                return <Comment data={comment} key={comment.id_comment} />;
              })
            )}
          </CardContent>
          <CardActions className={classes.action}>
            <Like id_postingan={id_postingan} data={context.user} />
            <Typography variant="body2">{like_count} likes</Typography>
            <IconButton style={{ marginLeft: "auto" }}>
              <MoreVertIcon style={{ fontSize: 30 }} />
            </IconButton>
          </CardActions>
          <CardContent className={classes.input_comment}>
            <CommentForm />
          </CardContent>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default SinglePostingan;
