import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ShareMomentContext } from "../../globalContext/globalstorage";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyle = makeStyles({
  formLogin: {
    height: "90%",
    width: "60%",
    borderRadius: "5px",
    border: "1px solid rgb(215,215,215)",
    textAlign: "center",
    background: "white",
    boxShadow: "0px 5px 10px rgb(200,200,200)",
    padding: "0 3rem"
  },
  header: { fontFamily: "Pacifico, cursive", marginBottom: "6rem" },
  inputLogin: {
    marginBottom: "1.5rem"
  },
  signup: {
    textDecoration: "none",
    color: "#0B9ED9",
    "&:hover": {
      textDecoration: "underline"
    }
  }
});

const FormLogin = props => {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const classes = useStyle();
  const context = useContext(ShareMomentContext);

  const { login, error } = context.user;

  useEffect(() => {
    if (!error) {
      setErrors("");
    } else {
      setErrors(error);
    }
  }, [error]);

  const handleSubmit = e => {
    e.preventDefault();
    const userData = {
      input: input,
      password: password
    };
    login(userData);
  };

  return (
    <React.Fragment>
      <div className={classes.formLogin}>
        <Typography
          variant="h4"
          className={classes.header}
          style={{ margin: "2rem 0 6rem 0" }}
        >
          Share Moment
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className={classes.inputLogin}>
            <TextField
              type="text"
              name="input"
              label="username or email"
              autoComplete="off"
              value={input}
              onChange={e => setInput(e.target.value)}
              error={errors.input ? true : false}
              helperText={errors.input}
              fullWidth
            />
          </div>
          <div className={classes.inputLogin}>
            <TextField
              type="password"
              name="password"
              label=" password"
              autoComplete="off"
              value={password}
              error={errors.password ? true : false}
              helperText={errors.password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
            />
          </div>
          <div>
            {errors.general && (
              <Typography variant="caption" color="secondary">
                {errors.general}
              </Typography>
            )}
          </div>
          <div style={{ margin: "3rem 0" }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Log in
            </Button>
          </div>
          <div>
            <Typography variant="subtitle1">
              Don't have an account?{" "}
              <Link to="/account/signup" className={classes.signup}>
                Signup here
              </Link>
            </Typography>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default FormLogin;
