import React, { useState, createContext, useReducer } from "react";
import userReducer, { initialState as initialStateUser } from "./reducers/user";
import postinganReducer, {
  initialState as initialStatePostingan,
} from "./reducers/postingan";
import dataReducer, { initialState as initialStateData } from "./reducers/data";
import axios from "../config/axios";
import {
  LOADING_USER,
  SET_ERROR_USER,
  SET_USER,
  LOADING_POSTINGAN,
  SET_ALL_POSTINGAN,
  SET_UNAUTHENTICATION,
  SET_SINGLE_POSTINGAN,
  SET_USER_POSTINGAN,
  RESET_SINGLE_POST,
  POST_POSTINGAN,
  SET_ERROR_POSTINGAN,
  SUBMIT_COMMENT,
  SET_FLASH,
  CLOSE_FLASH,
  SET_USER_PROFILE,
  LOADING_DATA,
  LIKE_POSTINGAN,
  SET_LIKE_USER,
  SET_UNLIKE_USER,
  UNLIKE_POSTINGAN,
  MARK_NOTIFICATION_READED,
  DELETE_POSTINGAN,
  CLEAR_ERROR,
} from "./types";

const ShareMomentContext = createContext();

const ShareMomentProvider = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [pathName, setPathName] = useState("");
  const [userState, userDispatch] = useReducer(userReducer, initialStateUser);
  const [postinganState, postinganDispatch] = useReducer(
    postinganReducer,
    initialStatePostingan
  );
  const [dataState, dataDispatch] = useReducer(dataReducer, initialStateData);

  // * Action User ---------------------------------------------------
  const getUserData = () => {
    userDispatch({ type: LOADING_USER });
    axios
      .get("/user")
      .then((res) => {
        userDispatch({ type: SET_USER, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const login = (data) => {
    userDispatch({ type: LOADING_USER });
    axios
      .post("/login", data)
      .then((res) => {
        setAuthorization(res.data.token);
        getUserData();
      })
      .catch((err) => {
        userDispatch({ type: SET_ERROR_USER, payload: err.response.data });
      });
  };

  const signup = ({ data, history }) => {
    userDispatch({ type: LOADING_USER });
    axios
      .post("/signup", data)
      .then((res) => {
        setAuthorization(res.data.token);
        getUserData();
        history.push("/");
      })
      .catch((err) => {
        console.log(err.response.data);
        userDispatch({ type: SET_ERROR_USER, payload: err.response.data });
      });
  };

  const logout = (history) => {
    localStorage.removeItem("idToken");
    delete axios.defaults.headers.common["Authorization"];
    userDispatch({ type: SET_UNAUTHENTICATION });
    history.push("/");
  };

  const readNotification = () => {
    axios
      .post("/notifications")
      .then(() => {
        userDispatch({ type: MARK_NOTIFICATION_READED });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editProfile = ({ data, close, username }) => {
    axios
      .post("/user", data)
      .then(() => {
        setUserProfile(username);
        getUserData();
        close();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearError = () => {
    userDispatch({ type: CLEAR_ERROR });
  };
  // * End Action User --------------------------------------------------------

  // * Start Action postingan -------------------------------------------------------
  const getPostingan = () => {
    postinganDispatch({ type: LOADING_POSTINGAN });
    axios
      .get("/post")
      .then((res) => {
        postinganDispatch({ type: SET_ALL_POSTINGAN, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getSinglePosting = (id) => {
    postinganDispatch({ type: LOADING_POSTINGAN });
    axios
      .post(`/post/${id}`)
      .then((res) => {
        postinganDispatch({ type: SET_SINGLE_POSTINGAN, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUserPostingan = (id_user) => {
    postinganDispatch({ type: LOADING_USER });
    axios
      .get(`/post/${id_user}`)
      .then((res) => {
        postinganDispatch({ type: SET_USER_POSTINGAN, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const post_postingan = ({ data, history }) => {
    postinganDispatch({ type: LOADING_POSTINGAN });

    axios
      .post("/post", data)
      .then((res) => {
        postinganDispatch({ type: POST_POSTINGAN, payload: res.data });
        dataDispatch({
          type: SET_FLASH,
          payload:
            "Posting Berhasil Ditambahkan!! (click untuk menghapus pesan ini)",
        });
        history.push("/");
      })
      .catch((err) => {
        postinganDispatch({
          type: SET_ERROR_POSTINGAN,
          payload: err.response.data,
        });
      });
  };

  const submitComment = ({ data }) => {
    const { id_postingan } = data;
    axios
      .post(`/post/${id_postingan}/comment`, data)
      .then((res) => {
        postinganDispatch({ type: SUBMIT_COMMENT, payload: res.data });
      })
      .catch((err) => {
        postinganDispatch({
          type: SET_ERROR_POSTINGAN,
          payload: err.response.data,
        });
      });
  };

  const likesOnPostingan = (id_postingan) => {
    axios
      .get(`post/${id_postingan}/like`)
      .then((res) => {
        postinganDispatch({
          type: LIKE_POSTINGAN,
          payload: res.data.posting_data,
        });
        userDispatch({ type: SET_LIKE_USER, payload: res.data.userLike });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikeOnPostingan = (id_postingan) => {
    axios
      .delete(`post/${id_postingan}/like`)
      .then((res) => {
        postinganDispatch({
          type: UNLIKE_POSTINGAN,
          payload: res.data,
        });
        userDispatch({ type: SET_UNLIKE_USER, payload: id_postingan });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePostingan = (id) => {
    postinganDispatch({ type: LOADING_POSTINGAN });
    axios
      .delete(`/post/${id}`)
      .then(() => {
        postinganDispatch({ type: DELETE_POSTINGAN, payload: id });
        dataDispatch({
          type: SET_FLASH,
          payload:
            "Posting Berhasil Dihapus!! (click untuk menghapus pesan ini)",
        });
      })
      .catch((err) => console.log(err));
  };
  // * End Action postingan -------------------------------------------------------

  // * Start Action data -------------------------------------------------------
  const closeFlash = () => {
    dataDispatch({ type: CLOSE_FLASH });
  };

  const setUserProfile = (user) => {
    dataDispatch({ type: LOADING_DATA });
    axios
      .post(`/user/${user}`)
      .then((res) => {
        getUserPostingan(res.data.id_user);
        dataDispatch({ type: SET_USER_PROFILE, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // * End Action data -------------------------------------------------------

  // * Start Action ui -------------------------------------------------------
  const openModalPost = (id, user, status) => {
    setOpenModal(true);
    getSinglePosting(id);

    const split = user.split("/");
    setPathName(split[1]);
    const newPath = `/postingan/${id}`;
    document.title = `${split[1]} on Posting : ${status}`;
    window.history.pushState(null, null, newPath);
  };
  const closeModalPost = (user) => {
    setOpenModal(false);
    postinganDispatch({ type: RESET_SINGLE_POST });
    setPathName("");
    const newPath = `/${user}`;
    document.title = `${user}`;
    window.history.pushState(null, null, newPath);
    setUserProfile(user);
  };
  // * End Action ui -------------------------------------------------------

  return (
    <ShareMomentContext.Provider
      value={{
        user: {
          ...userState,
          login,
          signup,
          logout,
          getUserData,
          readNotification,
          editProfile,
          clearError,
        },
        postingan: {
          ...postinganState,
          getPostingan,
          getSinglePosting,
          getUserPostingan,
          post_postingan,
          submitComment,
          likesOnPostingan,
          unlikeOnPostingan,
          deletePostingan,
        },
        ui: {
          openModal,
          setOpenModal,
          openModalPost,
          closeModalPost,
          pathName,
        },
        data: { ...dataState, closeFlash, setUserProfile },
      }}
    >
      {props.children}
    </ShareMomentContext.Provider>
  );
};

const setAuthorization = (token) => {
  const IdToken = `Bearer ${token}`;
  localStorage.setItem("idToken", IdToken);
  axios.defaults.headers.common["Authorization"] = IdToken;
};

const ShareMomentConsumer = ShareMomentContext.Consumer;

export { ShareMomentContext, ShareMomentProvider, ShareMomentConsumer };
