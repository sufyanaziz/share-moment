import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShareMomentContext } from "../../globalContext/globalstorage";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FavoritBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoritIcon from "@material-ui/icons/Favorite";

const Like = ({ id_postingan, data, history }) => {
  const context = useContext(ShareMomentContext);
  const likedPostingan = () => {
    if (
      data.likes &&
      data.likes.find(like => like.id_postingan === id_postingan)
    ) {
      return true;
    } else return false;
  };

  const { likesOnPostingan, unlikeOnPostingan } = context.postingan;

  return (
    <>
      {!data.authenticated ? (
        history ? (
          <IconButton>
            <FavoritBorderIcon style={{ fontSize: 40, color: "white" }} />
          </IconButton>
        ) : (
          <Link to="/">
            <IconButton>
              <FavoritBorderIcon style={{ fontSize: 30, color: "black" }} />
            </IconButton>
          </Link>
        )
      ) : history ? (
        likedPostingan() ? (
          <IconButton>
            <FavoritIcon style={{ fontSize: 40, color: "#F20F38" }} />
          </IconButton>
        ) : (
          <IconButton>
            <FavoritBorderIcon style={{ fontSize: 40, color: "white" }} />
          </IconButton>
        )
      ) : likedPostingan() ? (
        <Tooltip title="unlike">
          <IconButton onClick={() => unlikeOnPostingan(id_postingan)}>
            <FavoritIcon style={{ fontSize: 30, color: "#F20F38" }} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="like">
          <IconButton onClick={() => likesOnPostingan(id_postingan)}>
            <FavoritBorderIcon style={{ fontSize: 30 }} />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default Like;
