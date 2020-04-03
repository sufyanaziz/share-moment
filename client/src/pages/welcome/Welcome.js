import React, { useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

import FavoriteIcon from "@material-ui/icons/Favorite";
import Dashboard from "@material-ui/icons/Dashboard";

import FormLogin from "../../components/FormLogin/Login";

const useStyle = makeStyles({
  root: {
    height: "100vh",
    width: "100vw",
    textTransform: "capitalize"
    // backgroundImage: " linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)"
  },
  welcome: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  welcomeHeader: {
    height: "80%",
    width: "80%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  containerFormLogin: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  formLogin: {
    height: "80%",
    width: "60%",
    borderRadius: "5px",
    border: "1px solid rgb(215,215,215)",
    textAlign: "center",
    background: "white",
    boxShadow: "0px 5px 10px rgb(200,200,200)"
  },
  header: { fontFamily: "Pacifico, cursive" }
});
const Welcome = () => {
  const classes = useStyle();

  useEffect(() => {
    document.title = "Share Moment App";
  }, []);

  return (
    <React.Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={12} md={6} className={classes.welcome}>
          <div className={classes.welcomeHeader}>
            <div>
              <Dashboard style={{ fontSize: 80, marginBottom: "10px" }} />
            </div>
            <Typography variant="h2" className={classes.header}>
              Share Moment
            </Typography>
            <Typography variant="h5">
              Share your moment, and make it memories
            </Typography>
            <br />
            <br />
            <br />
            <Typography
              variant="caption"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              made with
              <FavoriteIcon style={{ color: "red", margin: "0 5px" }} />
              by achmad sufyan aziz
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={6} className={classes.containerFormLogin}>
          <FormLogin />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Welcome;
