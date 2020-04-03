import React, { useState, useEffect, useContext } from "react";
import { ShareMomentContext } from "../../globalContext/globalstorage";
import SinglePostingan from "../../components/Postingan/SinglePostingan";

import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dashboard from "@material-ui/icons/Dashboard";

const Postingan = props => {
  const idPostingan = props.match.params.idPostingan;
  const context = useContext(ShareMomentContext);

  const { loading, single_post, getSinglePosting } = context.postingan;
  const { authenticated } = context.user;

  useEffect(() => {
    getSinglePosting(idPostingan);
  }, [idPostingan]);

  return (
    <React.Fragment>
      {authenticated ? (
        <Grid container>
          <Grid item xs={12} md={12}>
            {loading ? (
              <div
                style={{
                  width: "100%",
                  height: "80vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <CircularProgress size={40} color="primary" />
              </div>
            ) : (
              <SinglePostingan data={single_post} />
            )}
          </Grid>
        </Grid>
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
            <Grid container>
              <Grid item xs={12} md={12}>
                {loading ? (
                  <div
                    style={{
                      width: "100%",
                      height: "80vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <CircularProgress size={40} color="primary" />
                  </div>
                ) : (
                  <SinglePostingan data={single_post} />
                )}
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Postingan;
