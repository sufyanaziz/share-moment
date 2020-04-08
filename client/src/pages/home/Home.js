import React, { useContext, useEffect } from "react";
import { ShareMomentContext } from "../../globalContext/globalstorage";
import Postingan from "../../components/Postingan/Postingan";
import Profile from "../../components/User/CardProfile";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

import Grid from "@material-ui/core/Grid";
import EmojiPeople from "@material-ui/icons/EmojiPeople";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Home = (props) => {
  const context = useContext(ShareMomentContext);

  const { getPostingan, all_post, loading } = context.postingan;
  const { flash, closeFlash } = context.data;

  const emptyPost = Object.keys(all_post).length;

  useEffect(() => {
    getPostingan();
    document.title = "Share Moment";
    context.user.getUserData();
  }, []);

  let postingan = loading ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress size={40} color="primary" />
    </div>
  ) : emptyPost === 0 ? (
    <div style={{ textAlign: "center" }}>
      <EmojiPeople style={{ fontSize: "100px" }} />
      <h1>Welcome My Friend</h1>
      <br />
      <p>
        Thanks for downloading or clone this repo <br /> If this app have a bug,
        you can fix it. I Know you can :)
      </p>
      <br />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>Enjoy Coding and Improve this App </p>
        <FavoriteIcon style={{ color: "red", marginLeft: "5px" }} />
      </div>
      <br />
      <p style={{ background: "black", color: "white", padding: "5px 0" }}>
        If you have any question, you can ask me
      </p>
    </div>
  ) : (
    all_post.map((post) => {
      return <Postingan key={post.id_postingan} data={post} />;
    })
  );

  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <Grid item sm={12} md={8}>
          {flash && (
            <Alert
              severity="success"
              style={{ marginBottom: "2rem", cursor: "pointer" }}
              onClick={() => closeFlash()}
            >
              {flash}
            </Alert>
          )}
          {postingan}
        </Grid>
        <Grid item sm={12} md={4}>
          {context.user.loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress size={40} color="primary" />
            </div>
          ) : (
            <Profile history={props.history} data={context.user.user_details} />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Home;
