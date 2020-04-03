import React, { useContext, useState } from "react";
import { ShareMomentContext } from "../../globalContext/globalstorage";
import EditProfileForm from "./EditProfileForm";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import CreateIcon from "@material-ui/icons/Create";
import LanguageIcon from "@material-ui/icons/Language";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles({
  root: {
    position: "sticky",
    top: "14vh",
    maxHeight: "600px",
    padding: "1rem",
    textAlign: "center"
  },
  imageContainer: {
    width: "130px",
    height: "130px",
    margin: "0 auto 1rem auto"
  },
  image: {
    borderRadius: "50%",
    objectFit: "cover",
    height: "100%",
    width: "100%"
  },
  typography: {},
  action: {
    display: "flex",
    margin: "1rem 0"
  },
  data: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "16px",
    "& :nth-child(2)": {
      marginLeft: "10px"
    }
  }
});
const CardProfile = ({ history, data }) => {
  const classes = useStyles();
  const context = useContext(ShareMomentContext);
  const [open, setOpen] = useState(false);

  const { id_user, full_name, username, bio, website, location, image } = data;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logoutHandler = () => {
    context.user.logout(history);
  };

  let dialogEditProfile = (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <EditProfileForm
        onClose={handleClose}
        data={data}
        editProfile={context.user.editProfile}
      />
    </Dialog>
  );
  return (
    <Paper className={classes.root} elevation={3}>
      <div className={classes.imageContainer}>
        <img className={classes.image} src={`/image/profile_image/${image}`} />
      </div>
      <div>
        <Typography variant="h5">{full_name}</Typography>
        <Typography variant="h6">{username}</Typography>
        {bio && (
          <div className={classes.data}>
            <CreateIcon />
            <Typography variant="body1">{bio}</Typography>
          </div>
        )}
        {website && (
          <div className={classes.data}>
            <LanguageIcon />
            <Typography variant="body1">{website}</Typography>
          </div>
        )}

        {location && (
          <div className={classes.data}>
            <HomeIcon />
            <Typography variant="body1">{location}</Typography>
          </div>
        )}
      </div>
      <div className={classes.action}>
        {context.user.authenticated ? (
          context.user.user_details.id_user === id_user &&
          window.location.pathname !== "/" ? (
            <>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                style={{ marginRight: 10 }}
                onClick={logoutHandler}
              >
                Logout
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleClickOpen}
              >
                edit profile
              </Button>
              {dialogEditProfile}
            </>
          ) : null
        ) : null}
      </div>
    </Paper>
  );
};

export default CardProfile;
