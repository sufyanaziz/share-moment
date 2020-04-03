import React, { useState, useContext } from "react";
import { ShareMomentContext } from "../../globalContext/globalstorage";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Like from "../Like/Like";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CommentIcon from "@material-ui/icons/Comment";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: { height: 250, position: "relative" },
  onHover: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    background: "black",
    opacity: 0.6
  },
  likeandcomment_section: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 100,
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    textDecoration: "none",
    cursor: "pointer"
  }
});

const UserPostingan = ({ data, history }) => {
  const classes = useStyles();
  const [hoverLikeAndComment, setHoverLikeAndComment] = useState(false);
  const [dataPost, setDataPost] = useState("");
  const context = useContext(ShareMomentContext);

  const onHover = data => {
    setHoverLikeAndComment(true);
    setDataPost(data);
  };
  const leaveHover = () => {
    setHoverLikeAndComment(false);
    setDataPost("");
  };

  return (
    <React.Fragment>
      <Card
        className={classes.root}
        onMouseEnter={() => onHover(data)}
        onMouseLeave={() => leaveHover()}
      >
        <CardMedia
          image={`/image/post_image/${data.url_gambar}`}
          style={{
            height: "100%",
            paddingTop: "56.25%",
            objectFit: "cover"
          }}
        />
        {hoverLikeAndComment && (
          <>
            <div className={classes.onHover}></div>
            <div
              onClick={() =>
                context.ui.openModalPost(
                  dataPost.id_postingan,
                  history.location.pathname,
                  dataPost.status_postingan
                )
              }
              className={classes.likeandcomment_section}
            >
              <CardActions>
                <Like
                  id_postingan={dataPost.id_postingan}
                  data={context.user}
                  history={history}
                />
                <Typography variant="body1" style={{ marginLeft: "-5px" }}>
                  {dataPost.like_count}
                </Typography>
                <CommentIcon style={{ fontSize: 40, marginLeft: 20 }} />
                <Typography variant="body1">
                  {dataPost.comment_count}
                </Typography>
              </CardActions>
            </div>
          </>
        )}
      </Card>
    </React.Fragment>
  );
};

export default UserPostingan;
