import React, { useEffect, useState } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    width: 400,
    position: "relative"
  },
  icon: {
    position: "absolute",
    right: 0,
    margin: "1rem 1.5rem 0 0",
    cursor: "pointer"
  },
  imageContainer: {
    width: "100px",
    height: "100px",
    margin: "0.2rem auto 1.2rem auto"
  },
  image: {
    borderRadius: "50%",
    objectFit: "cover",
    height: "100%",
    width: "100%"
  },
  input_container: {
    margin: "1rem 0 0.5rem 0"
  },
  input: {
    marginBottom: "0.6rem"
  }
});
const EditProfile = props => {
  const classes = useStyles();
  const [fileImage, setFileImage] = useState({});
  const [errorImage, setErrorImage] = useState("");
  const [web, setWeb] = useState("");
  const [status, setStatus] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [fullName, setFullName] = useState("");

  const { username, full_name, image, bio, website, location } = props.data;

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setWeb(website);
      setStatus(bio);
      setLokasi(location);
      setFullName(full_name);
    }
    return () => (mounted = false);
  }, []);

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

  const closeDialog = () => {
    if (
      Object.keys(fileImage).length !== 0 ||
      web !== website ||
      location !== lokasi ||
      status !== bio ||
      fullName !== full_name
    ) {
      if (
        window.confirm(
          "Anda sudah melakukan perubahan, apakah anda yakin keluar?"
        )
      )
        props.onClose();
    } else {
      props.onClose();
    }
  };

  const submitEditProfile = e => {
    e.preventDefault();

    let imageFromObj = new FormData();
    imageFromObj.append("userImage", fileImage.file);
    imageFromObj.append("website", website);
    imageFromObj.append("bio", status);
    imageFromObj.append("location", lokasi);
    imageFromObj.append("full_name", fullName);

    props.editProfile({
      data: imageFromObj,
      close: props.onClose,
      username: username
    });
  };
  return (
    <>
      <form className={classes.root} onSubmit={submitEditProfile}>
        <div className={classes.icon} onClick={closeDialog}>
          <CloseIcon />
        </div>
        <DialogContent>
          <div className={classes.imageContainer}>
            {fileImage.prevImg ? (
              <img src={fileImage.prevImg} className={classes.image} />
            ) : (
              <img
                className={classes.image}
                src={`/image/profile_image/${image}`}
              />
            )}
          </div>
          <div>
            <input
              type="file"
              id="userImage"
              name="userImage"
              onChange={onChangeFoto}
              accept=".jpg,.jpeg,.png"
            />
          </div>
          <div className={classes.input_container}>
            <TextField
              type="text"
              name="username"
              id="username"
              label="username"
              value={username}
              className={classes.input}
              disabled
              fullWidth
            />
            <TextField
              type="text"
              name="full_name"
              id="full_name"
              label="full_name"
              autoComplete="off"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className={classes.input}
              fullWidth
            />
            <TextField
              type="text"
              name="bio"
              id="bio"
              label="bio"
              autoComplete="off"
              value={status}
              onChange={e => setStatus(e.target.value)}
              className={classes.input}
              fullWidth
            />
            <TextField
              type="text"
              name="website"
              id="website"
              label="website"
              autoComplete="off"
              value={web}
              onChange={e => setWeb(e.target.value)}
              className={classes.input}
              fullWidth
            />
            <TextField
              type="text"
              name="location"
              id="location"
              label="location"
              autoComplete="off"
              value={lokasi}
              onChange={e => setLokasi(e.target.value)}
              className={classes.input}
              fullWidth
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginTop: "10px" }}
            >
              Edit Profile
            </Button>
          </div>
        </DialogContent>
      </form>
    </>
  );
};

export default EditProfile;
