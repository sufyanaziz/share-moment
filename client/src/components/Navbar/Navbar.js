import React, { useContext } from "react";
import { ShareMomentContext } from "../../globalContext/globalstorage";
import { Link } from "react-router-dom";
import Notification from "../Notification/Notification";
import Search from "../Search/Search";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";

import Tooltip from "@material-ui/core/Tooltip";

import Dashboard from "@material-ui/icons/Dashboard";
import AddCircle from "@material-ui/icons/AddCircle";

const useStyles = makeStyles(theme => ({
  navbar: {
    background: "white",
    color: "rgb(29, 28, 28)"
  },
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  },
  logo: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    color: "rgb(29, 28, 28)"
  },
  searchContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center"
  },
  search: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    background: "rgb(230,230,230)",
    borderRadius: "5px",
    width: "50%",
    padding: "2px 2rem"
  },
  searchIcon: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    color: "black"
  },
  inputSearch: { marginLeft: "2rem", display: "flex", alignItems: "center" },
  actionIcon: {
    flex: 0.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  imageContainer: {
    height: "30px",
    width: "30px"
  },
  image: {
    borderRadius: "50%",
    objectFit: "cover",
    height: "100%",
    width: "100%"
  }
}));

const Navbar = props => {
  const classes = useStyles();
  const context = useContext(ShareMomentContext);
  const { image, username } = context.user.user_details;

  let imageUser = context.user.user_details ? (
    <div className={classes.imageContainer}>
      <img className={classes.image} src={`/image/profile_image/${image}`} />
    </div>
  ) : null;
  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.navbar}>
        <Toolbar className={classes.root}>
          <Link to="/" className={classes.logo}>
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
          <div className={classes.actionIcon}>
            <Notification />
            <Tooltip title="add post">
              <Link to="/new/postingan">
                <IconButton style={{ color: "rgb(29, 28, 28)" }}>
                  <AddCircle style={{ fontSize: "25px" }} />
                </IconButton>
              </Link>
            </Tooltip>
            <Link to={`/${username}`}>
              <Tooltip title={username}>
                <IconButton color="inherit">{imageUser}</IconButton>
              </Tooltip>
            </Link>
          </div>
          <Search />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
