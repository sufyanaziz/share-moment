import React, { useEffect, useContext } from "react";
import jwtDecode from "jwt-decode";
import axios from "./config/axios";
import { Switch, Redirect, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/home/Home";
import Welcome from "./pages/welcome/Welcome";
import Profile from "./pages/profile/Profile";
import Postingan from "./pages/postingan/Postingan";
import Signup from "./pages/signup/Signup";
import AddPost from "./pages/addpost/AddPost";
import Error404 from "./pages/error/_error404.js";

import { ShareMomentContext } from "./globalContext/globalstorage";

const App = () => {
  const context = useContext(ShareMomentContext);

  let token = localStorage.idToken;
  const { authenticated, getUserData } = context.user;

  useEffect(() => {
    if (token) {
      const decodetoken = jwtDecode(token);
      if (decodetoken.exp * 1000 < Date.now()) {
        // window.location.href = "/account/login";
        // context.user.logout();
      } else {
        axios.defaults.headers.common["Authorization"] = token;
        getUserData();
      }
    }
  }, []);

  return (
    <React.Fragment>
      {authenticated && <Navbar />}
      {authenticated ? (
        <div style={{ margin: "100px 7rem 0 7rem" }}>
          <Switch>
            {authenticated && <Redirect from="/account/signup" to="/" exact />}
            {authenticated && <Redirect from="/account/login" to="/" exact />}
            {authenticated && token ? (
              <Route path="/" exact component={Home} />
            ) : (
              <Route path="/" exact component={Welcome} />
            )}
            {!authenticated && <Redirect from="/new/postingan" to="/" exact />}
            <Redirect from="/account/login" to="/" />
            <Route path="/:username" exact component={Profile} />
            <Route path="/account/signup" exact component={Signup} />
            <Route path="/postingan/:idPostingan" exact component={Postingan} />
            <Route path="/new/postingan" exact component={AddPost} />
            <Route path="*" exact component={Error404} />
          </Switch>
        </div>
      ) : (
        <Switch>
          {authenticated && <Redirect from="/account/signup" to="/" exact />}
          {authenticated && <Redirect from="/account/login" to="/" exact />}
          {authenticated && token ? (
            <Route path="/" exact component={Home} />
          ) : (
            <Route path="/" exact component={Welcome} />
          )}
          {!authenticated && <Redirect from="/new/postingan" to="/" exact />}
          <Redirect from="/account/login" to="/" />
          <Route path="/:username" exact component={Profile} />
          <Route path="/account/signup" exact component={Signup} />
          <Route path="/postingan/:idPostingan" exact component={Postingan} />
          <Route path="/new/postingan" exact component={AddPost} />
          <Route path="*" exact component={Error404} />
        </Switch>
      )}
    </React.Fragment>
  );
};

export default App;
