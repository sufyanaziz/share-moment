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
    padding: "0 3rem",
    overflowY: "auto"
  },
  header: { fontFamily: "Pacifico, cursive", margin: "1rem 0" },
  inputLogin: {
    marginBottom: "0.8rem"
  },
  signup: {
    textDecoration: "none",
    color: "#0B9ED9",
    "&:hover": {
      textDecoration: "underline"
    }
  }
});

const FormSignup = props => {
  const context = useContext(ShareMomentContext);
  const { signup } = context.user;

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState({});
  const classes = useStyle();

  useEffect(() => {
    if (!error) {
      setErrors("");
    } else {
      setErrors(error);
    }
  }, [error]);

  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      full_name: fullName,
      username,
      email,
      password,
      confirmPassword
    };
    const fixDataSignup = {
      full_name: fullName,
      username,
      email,
      password
    };

    const { valid, errors } = signupValidation(data);

    if (!valid) {
      setError(errors);
      return false;
    } else {
      signup(fixDataSignup);
      props.history.push("/");
    }
  };

  return (
    <React.Fragment>
      <div className={classes.formLogin}>
        <Typography variant="h4" className={classes.header} style={{}}>
          Share Moment
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className={classes.inputLogin}>
            <TextField
              type="text"
              name="full_name"
              label="full name"
              autoComplete="off"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              error={errors.full_name ? true : false}
              helperText={errors.full_name}
              fullWidth
            />
          </div>
          <div className={classes.inputLogin}>
            <TextField
              type="text"
              name="username"
              label="username"
              autoComplete="off"
              value={username}
              onChange={e => setUsername(e.target.value)}
              error={errors.username ? true : false}
              helperText={errors.username}
              fullWidth
            />
          </div>
          <div className={classes.inputLogin}>
            <TextField
              type="text"
              name="email"
              label="email"
              autoComplete="off"
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={errors.email ? true : false}
              helperText={errors.email}
              fullWidth
            />
          </div>
          <div className={classes.inputLogin}>
            <TextField
              type="password"
              name="password"
              label=" password"
              value={password}
              error={errors.password ? true : false}
              helperText={errors.password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
            />
          </div>
          <div className={classes.inputLogin}>
            <TextField
              type="password"
              name="confirmPassword"
              label=" Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
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
          <div style={{ margin: "1.5rem 0 1rem 0" }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Signup
            </Button>
          </div>
          <div>
            <Typography variant="body2" style={{ marginBottom: "10px" }}>
              Already have an account?{" "}
              <Link to="/" className={classes.signup}>
                Login here
              </Link>
            </Typography>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

const isEmpty = string => {
  if (string.trim() === "") return true;
  else return false;
};

const validateEmail = email => {
  const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(regEx)) return true;
  else return false;
};

const signupValidation = data => {
  let errors = {};

  const lengthUsername = data.username.split(" ").length;
  const fixUsername = data.username.split(" ").join("");

  if (isEmpty(data.full_name))
    errors.full_name = "Full Name tidak boleh kosong";
  if (isEmpty(data.password)) {
    errors.password = "Password tidak boleh kosong";
  } else if (data.password !== data.confirmPassword) {
    errors.password = "Password tidak sama, periksa kembali!";
  }
  if (isEmpty(data.email)) {
    errors.email = "Email tidak boleh kosong";
  } else if (!validateEmail(data.email)) {
    errors.email = "Email tidak valid";
  }
  if (isEmpty(data.username)) {
    errors.username = "Username tidak boleh kosong";
  } else if (lengthUsername > 1) {
    errors.username = `Username tidak boleh memiliki spasi. (${fixUsername})`;
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

export default FormSignup;
