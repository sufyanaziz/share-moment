import React, { useEffect, useContext } from "react";
import { ShareMomentContext } from "../../globalContext/globalstorage";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SinglePostingan from "../Postingan/SinglePostingan";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  backdrop: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
    background: "black",
    opacity: 0.6,
    zIndex: 9999
  },
  single_post: {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000,
    padding: "0 7rem",
    margin: 0
  },
  closeButton: {
    position: "fixed",
    top: 0,
    right: 0,
    zIndex: 100000
  }
});

const Modal = () => {
  const classes = useStyles();
  const context = useContext(ShareMomentContext);

  return (
    <React.Fragment>
      {context.ui.openModal && (
        <div>
          <div className={classes.backdrop}></div>
          <div className={classes.single_post}>
            <Grid container>
              <Grid item xs={12} md={12}>
                {context.postingan.loading ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress size={40} color="primary" />
                  </div>
                ) : (
                  <SinglePostingan
                    data={context.postingan.single_post}
                    modal={context}
                  />
                )}
              </Grid>
            </Grid>
          </div>
          <div
            className={classes.closeButton}
            onClick={() => context.ui.closeModalPost(context.ui.pathName)}
          >
            <CloseIcon
              style={{
                color: "white",
                fontSize: 40,
                marginRight: "3rem",
                marginTop: "10px",
                cursor: "pointer"
              }}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Modal;
