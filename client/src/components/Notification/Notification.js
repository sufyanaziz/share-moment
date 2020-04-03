import React, { useState, useContext } from "react";
import { ShareMomentContext } from "../../globalContext/globalstorage";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const context = useContext(ShareMomentContext);
  let notificationIcon;
  dayjs.extend(relativeTime);
  const { notifications, readNotification } = context.user;
  const all_notifikasi = [...notifications.like, ...notifications.comment];
  const handleOpen = e => {
    setAnchorEl(e.target);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuOpen = () => {
    readNotification();
  };

  if (all_notifikasi.length > 0) {
    all_notifikasi.filter(not => not.read_notif === "false").length > 0
      ? (notificationIcon = (
          <Badge
            badgeContent={
              all_notifikasi.filter(not => not.read_notif === "false").length
            }
            color="secondary"
          >
            <NotificationsIcon style={{ color: "rgb(29, 28, 28)" }} />
          </Badge>
        ))
      : (notificationIcon = <NotificationsIcon />);
  } else {
    notificationIcon = <NotificationsIcon />;
  }

  let notification_menu =
    all_notifikasi && all_notifikasi.length > 0
      ? all_notifikasi.map(not => {
          const type = not.config_notifikasi === 1 ? "Liked" : "Comment on";
          const time = dayjs(not.created_at).fromNow();
          const iconColor = not.read_notif ? "primary" : "secondary";
          const icon =
            not.config_notifikasi === 1 ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );
          return (
            <MenuItem key={not.id} onClick={handleClose}>
              {icon}
              <Link
                to={`/postingan/${not.id_notifikasi}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                  cursor: "pointer"
                }}
              >
                {not.username} {type} your scream {time}
              </Link>
            </MenuItem>
          );
        })
      : null;

  return (
    <React.Fragment>
      <Tooltip
        placement="top"
        title={`${
          all_notifikasi.filter(not => not.read_notif === "false").length
        } Unread Message`}
      >
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEnter={onMenuOpen}
      >
        {notification_menu ? (
          notification_menu
        ) : (
          <Typography variant="body1" style={{ padding: "10px" }}>
            Nothing to see
          </Typography>
        )}
      </Menu>
    </React.Fragment>
  );
};

export default Notification;
