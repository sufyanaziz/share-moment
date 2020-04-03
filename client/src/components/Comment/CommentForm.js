import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ShareMomentContext } from "../../globalContext/globalstorage";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";

const CommentForm = () => {
  const context = useContext(ShareMomentContext);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});
  const { error, submitComment } = context.postingan;

  const { id_postingan } = context.postingan.single_post;

  useEffect(() => {
    if (!error) {
      setErrors({});
    } else {
      setErrors(error);
    }
  }, [error]);

  const submitHandler = e => {
    e.preventDefault();
    const commentsOnSubmit = {
      id_postingan: id_postingan,
      comment: comment
    };
    submitComment({ data: commentsOnSubmit });
    setComment("");
  };

  return (
    <>
      {context.user.authenticated ? (
        <>
          {errors.comment && alert(errors.comment)}
          <form
            onSubmit={e => submitHandler(e)}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              width: "100%"
            }}
          >
            <InputBase
              autoFocus={true}
              placeholder="Add comment here..."
              inputProps={{ "aria-label": "search" }}
              style={{ width: "80%" }}
              value={comment}
              onChange={e => setComment(e.target.value)}
              multiline
            />
            <div style={{ position: "fixed", right: 150 }}>
              <button
                variant="body1"
                style={{
                  background: "transparent",
                  border: "transparent",
                  cursor: "pointer",
                  outline: "none"
                }}
                type="submit"
              >
                Post
              </button>
            </div>
          </form>
        </>
      ) : (
        <Link
          to="/"
          style={{ textDecoration: "none", cursor: "pointer", color: "black" }}
        >
          Cannot put a comment, pls login
        </Link>
      )}
    </>
  );
};

export default CommentForm;
