import React, { useContext, useEffect } from "react";
import { ShareMomentContext } from "../../globalContext/globalstorage";
import Postingan from "../../components/Postingan/Postingan";
import Profile from "../../components/User/CardProfile";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

import Grid from "@material-ui/core/Grid";

const Home = props => {
  const context = useContext(ShareMomentContext);

  const { getPostingan, all_post, loading } = context.postingan;
  const { flash, closeFlash } = context.data;

  useEffect(() => {
    getPostingan();
    document.title = "Share Moment";
    context.user.getUserData();
  }, []);

  let postingan = loading ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress size={40} color="primary" />
    </div>
  ) : (
    all_post.map(post => {
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
