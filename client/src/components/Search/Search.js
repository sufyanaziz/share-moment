import React, { useState, useEffect } from "react";
import axios from "../../config/axios";

import useDebounce from "./debounce";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  searchContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    position: "relative",
    "& ::-webkit-scrollbar": {
      width: "10px"
    },
    "& ::-webkit-scrollbar-track": {
      background: "#f1f1f1 "
    },
    "& ::-webkit-scrollbar-thumb": {
      background: "rgb(29, 28, 28)"
    },
    "& ::-webkit-scrollbar-thumb:hover": {
      background: "#555"
    }
  },
  search: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    background: "rgb(230,230,230)",
    borderRadius: "5px",
    width: "50%",
    padding: "2px 2rem"
  },
  searchIcon: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    color: "rgb(29, 28, 28)"
  },
  inputSearch: { marginLeft: "2rem", display: "flex", alignItems: "center" },
  liveSearch: {
    position: "absolute",
    width: "250px",
    maxHeight: "400px",
    background: "white",
    top: "45px",
    right: "120px",
    overflow: "auto",
    boxShadow: "0 2px 10px rgb(29, 28, 28)"
  },
  dataUserContainer: {
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    border: "0.5px solid rgb(29, 28, 28)"
  },
  imageContainer: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "1rem"
  },
  image: {
    borderRadius: "50%",
    objectFit: "cover",
    height: "100%",
    width: "100%"
  },
  link: {
    color: "black",
    textDecoration: "none",
    cursor: "pointer"
  }
}));

const Search = () => {
  const classes = useStyles();
  const [inputSearch, setInputSearch] = useState("");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emptyUser, setEmptyUser] = useState(false);

  const debouncedSearchTerm = useDebounce(inputSearch, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);

      liveSearchUser(debouncedSearchTerm).then(res => {
        if (res.length === 0) {
          setTimeout(() => {
            setLoading(false);
            setEmptyUser(true);
          }, 300);
        } else {
          setTimeout(() => {
            setLoading(false);
            setEmptyUser(false);
            setUserData(res);
          }, 300);
        }
      });
    } else {
      setUserData([]);
    }
  }, [debouncedSearchTerm]);

  const liveSearchUser = async username => {
    const source = `/user/search/${username}`;

    try {
      const res = await axios.get(source);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeSearch = e => {
    setInputSearch(e.target.value);
  };

  return (
    <>
      <div className={classes.searchContainer}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            className={classes.inputSearch}
            value={inputSearch}
            onChange={e => onChangeSearch(e)}
          />
        </div>
        {inputSearch ? (
          loading ? (
            <div className={classes.liveSearch}>
              <div
                style={{
                  border: "1px solid gray",
                  display: "flex",
                  justifyContent: "center",
                  padding: "1rem"
                }}
              >
                <CircularProgress size={30} color="primary" />
              </div>
            </div>
          ) : (
            <div className={classes.liveSearch}>
              {!emptyUser ? (
                userData.map(data => {
                  return (
                    <React.Fragment key={data.id_user}>
                      <Link
                        to={`/${data.username}`}
                        className={classes.link}
                        onClick={() => setInputSearch("")}
                      >
                        <div className={classes.dataUserContainer}>
                          <div className={classes.imageContainer}>
                            <img
                              className={classes.image}
                              alt="profile"
                              src={`/image/profile_image/${data.image}`}
                            />
                          </div>
                          <div className={classes.user_data}>
                            <Typography
                              variant="body2"
                              style={{ fontWeight: "bold" }}
                            >
                              {data.username}
                            </Typography>
                            <Typography variant="body2">
                              {data.full_name}
                            </Typography>
                          </div>
                        </div>
                      </Link>
                    </React.Fragment>
                  );
                })
              ) : (
                <div className={classes.dataUserContainer}>
                  <Typography variant="body2">Tidak ditemukan</Typography>{" "}
                </div>
              )}
            </div>
          )
        ) : null}
      </div>
    </>
  );
};

export default Search;
