import React, { useState, useEffect, useContext } from "react";
import { ShareMomentContext } from "../../globalContext/globalstorage";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ImageIcon from "@material-ui/icons/Image";
import TextField from "@material-ui/core/TextField";
import { Alert } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "100%",
    height: "420px",
    border: "1px solid gray"
  },
  image_section: {
    flex: 1,
    borderRight: "1px solid gray",
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  image_container: {
    width: "100%",
    height: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid gray"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  change_image: {
    marginTop: "2rem"
  },
  form_section: {
    flex: 1,
    padding: "2rem 5rem",
    textAlign: "center"
  },
  button: {
    margin: "20px auto",
    width: "70%",
    position: "relative",
    height: "2.8rem"
  },
  progress: {
    position: "absolute"
  }
});

const AddPost = props => {
  const classes = useStyles();
  const [fileImage, setFileImage] = useState({});
  const [errorImage, setErrorImage] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [caption, setCaption] = useState("");
  const [errors, setErrors] = useState({});

  const context = useContext(ShareMomentContext);
  const { post_postingan, error, loading } = context.postingan;

  useEffect(() => {
    if (!error) {
      setErrors({});
    } else {
      setErrors(error);
    }
  }, [error]);

  const onChangeFoto = e => {
    if (!e.target.files[0]) {
      setFileImage({});
      setErrorImage("");
      return false;
    } else {
      if (
        e.target.files[0].type === "image/jpeg" ||
        e.target.files[0].type === "image/jpg" ||
        e.target.files[0].type === "image/png"
      ) {
        setFileImage({
          file: e.target.files[0],
          prevImg: URL.createObjectURL(e.target.files[0])
        });
        setErrorImage("");
        return true;
      }
      setFileImage({});
      setErrorImage(
        "Yang Anda Masukan Bukan Gambar Atau Foto!! (*.png, *.jpg, *.jpeg)"
      );
      return false;
    }
  };

  const changeCaption = e => {
    setCaption(e.target.value);
  };
  const changeLokasi = e => {
    setLokasi(e.target.value);
  };

  const postingData = e => {
    e.preventDefault();
    let imageFromObj = new FormData();
    imageFromObj.append("postImage", fileImage.file);
    imageFromObj.append("location", lokasi);
    imageFromObj.append("status_postingan", caption);

    post_postingan({
      data: imageFromObj,
      history: props.history
    });
  };

  return (
    <React.Fragment>
      <Paper elevation={3}>
        <form onSubmit={e => postingData(e)} className={classes.root}>
          <div className={classes.image_section}>
            <div className={classes.image_container}>
              {fileImage.prevImg ? (
                <img src={fileImage.prevImg} className={classes.image} />
              ) : (
                <ImageIcon style={{ fontSize: 60, color: "gray" }} />
              )}
            </div>
            <div className={classes.change_image}>
              <input
                type="file"
                id="postImage"
                name="postImage"
                onChange={onChangeFoto}
                accept=".jpg,.jpeg,.png"
              />
            </div>
            <p style={{ marginTop: "5px", color: "red", fontSize: "10px" }}>
              {errorImage}
            </p>
          </div>
          <div className={classes.form_section}>
            <Alert style={{ marginBottom: "15px" }} severity="info">
              location can be anything!
            </Alert>
            <TextField
              type="text"
              name="location"
              id="location"
              label="location"
              autoComplete="off"
              value={lokasi}
              onChange={e => changeLokasi(e)}
              fullWidth
            />
            <TextField
              type="text"
              name="status_postingan"
              id="status_postingan"
              label="caption"
              autoComplete="off"
              value={caption}
              onChange={e => changeCaption(e)}
              fullWidth
              multiline
              style={{ overflow: "auto", height: "100px", margin: "1.5rem 0" }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
              disabled={loading ? true : false}
            >
              {loading ? (
                <CircularProgress className={classes.progress} />
              ) : (
                "Posting"
              )}
            </Button>
            <div>
              {errors.gambar && (
                <Typography style={{ color: "red" }} variant="body2">
                  {errors.gambar}
                </Typography>
              )}
            </div>
          </div>
        </form>
      </Paper>
    </React.Fragment>
  );
};

export default AddPost;
