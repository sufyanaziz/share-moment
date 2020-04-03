import React from "react";

import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

import FavoriteIcon from "@material-ui/icons/Favorite";
import Dashboard from "@material-ui/icons/Dashboard";

import FormSignup from "../../components/Signup/FormSignup";

const useStyle = makeStyles({
  root: {
    height: "100vh",
    width: "100vw",
    textTransform: "capitalize",
    "& ::-webkit-scrollbar": {
      width: "10px"
    },
    "& ::-webkit-scrollbar-track": {
      background: "#f1f1f1 "
    },
    "& ::-webkit-scrollbar-thumb": {
      background: "#888"
    },
    "& ::-webkit-scrollbar-thumb:hover": {
      background: "#555"
    }
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
const Signup = props => {
  const classes = useStyle();
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
          <FormSignup history={props.history} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Signup;
