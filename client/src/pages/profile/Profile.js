import React, { useContext, useEffect, useState } from "react";
import { ShareMomentContext } from "../../globalContext/globalstorage";
import CardProfile from "../../components/User/CardProfile";
import Modal from "../../components/Modal/Modal";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import Grid from "@material-ui/core/Grid";
import UserPostingan from "../../components/Postingan/UserPostingan";
import Dashboard from "@material-ui/icons/Dashboard";
import EmojiPeople from "@material-ui/icons/EmojiPeople";

const Profile = props => {
  const context = useContext(ShareMomentContext);
  const username = props.match.params.username;
  const { user_post, loading } = context.postingan;
  const { authenticated } = context.user;
  const { user_profile, setUserProfile } = context.data;
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    let mounted = true;
    document.title = `${props.match.params.username}`;
    if (mounted) {
      setUserProfile(username);
      setLoadingProfile(false);
    }
    return () => (mounted = false);
  }, [props.match.params.username]);

  let profile = loadingProfile ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress size={40} color="primary" />
    </div>
  ) : (
    <CardProfile data={user_profile} history={props.history} />
  );

  return (
    <React.Fragment>
      {authenticated ? (
        user_profile ? (
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              {profile}
            </Grid>
            <Grid item xs={12} md={8}>
              {loading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress size={40} color="primary" />
                </div>
              ) : (
                <Grid container spacing={2}>
                  {user_post.length > 0 ? (
                    user_post.map(post => {
                      return (
                        <Grid item xs={12} md={4} key={post.id_postingan}>
                          <UserPostingan data={post} history={props.history} />
                        </Grid>
                      );
                    })
                  ) : username === context.user.user_details.username ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: 200,
                        color: "gray"
                      }}
                    >
                      <EmojiPeople style={{ fontSize: 100 }} />
                      <Typography variant="h4">
                        You don't have any posts yet!
                      </Typography>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: 200,
                        color: "gray"
                      }}
                    >
                      <EmojiPeople style={{ fontSize: 100 }} />
                      <Typography variant="h4">
                        {username} doesn't have any posts yet
                      </Typography>
                    </div>
                  )}
                </Grid>
              )}
            </Grid>
          </Grid>
        ) : (
          <p>Ga ada</p>
        )
      ) : user_profile ? (
        <div style={{ position: "relative" }}>
          <AppBar style={{ background: "white" }}>
            <Toolbar
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Link
                to="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "rgb(29, 28, 28)"
                }}
              >
                <Dashboard style={{ marginRight: "10px", fontSize: "30px" }} />
                <Typography
                  variant="h5"
                  noWrap
                  style={{
                    fontFamily: "Pacifico, cursive"
                  }}
                >
                  Share Moment
                </Typography>
              </Link>
            </Toolbar>
          </AppBar>
          <div style={{ margin: "120px 10rem 0 10rem" }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                {profile}
              </Grid>
              <Grid item xs={12} md={8}>
                {loading ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress size={40} color="primary" />
                  </div>
                ) : (
                  <Grid container spacing={2}>
                    {user_post.length > 0 ? (
                      user_post.map(post => {
                        return (
                          <Grid item xs={12} md={4} key={post.id_postingan}>
                            <UserPostingan
                              data={post}
                              history={props.history}
                            />
                          </Grid>
                        );
                      })
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          height: 200,
                          color: "gray"
                        }}
                      >
                        <EmojiPeople style={{ fontSize: 100 }} />
                        <Typography variant="h4">
                          This user doesn't have any posts yet
                        </Typography>
                      </div>
                    )}
                  </Grid>
                )}
              </Grid>
            </Grid>
          </div>
          <div
            style={{
              position: "fixed",
              bottom: 0,
              width: "100%",
              height: 100,
              background: "black",
              opacity: 0.6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Typography variant="h4" style={{ color: "white" }}>
              Your not login yet,{" "}
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                pls login!{" "}
              </Link>
            </Typography>
          </div>
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          <AppBar style={{ background: "white" }}>
            <Toolbar
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Link
                to="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "rgb(29, 28, 28)"
                }}
              >
                <Dashboard style={{ marginRight: "10px", fontSize: "30px" }} />
                <Typography
                  variant="h5"
                  noWrap
                  style={{
                    fontFamily: "Pacifico, cursive"
                  }}
                >
                  Share Moment
                </Typography>
              </Link>
            </Toolbar>
          </AppBar>
          <div style={{ margin: "120px 10rem 0 10rem" }}>
            <p>Gada Bitch</p>
            <p>
              Your not login, <Link to="/">login here</Link>
            </p>
          </div>
        </div>
      )}
      <Modal />
    </React.Fragment>
  );
};

export default Profile;
