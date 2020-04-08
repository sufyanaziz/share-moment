import {
  SET_AUTHENTICATION,
  SET_UNAUTHENTICATION,
  SET_USER,
  MARK_NOTIFICATION_READED,
  LOADING_USER,
  SET_ERROR_USER,
  SET_PROFILE,
  SET_LIKE_USER,
  SET_UNLIKE_USER,
  CLEAR_ERROR,
} from "../types";

export const initialState = {
  authenticated: false,
  user_details: {},
  loading: false,
  likes: [],
  notifications: [],
  profile: {},
  error: {},
};

const userReducer = (state, action) => {
  switch (action.type) {
    case SET_AUTHENTICATION:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATION:
      return initialState;
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        loading: false,
        ...action.payload,
        error: {},
      };
    case SET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case MARK_NOTIFICATION_READED:
      state.notifications.like.forEach((not) => (not.read_notif = true));
      state.notifications.comment.forEach((not) => (not.read_notif = true));
      return {
        ...state,
      };
    case SET_ERROR_USER:
      return {
        ...state,
        error: { ...action.payload },
        loading: false,
      };
    case CLEAR_ERROR:
      return initialState;
    case SET_LIKE_USER:
      return {
        ...state,
        likes: [action.payload, ...state.likes],
      };
    case SET_UNLIKE_USER:
      let unlike = state.likes.filter(
        (like) => like.id_postingan !== action.payload
      );
      return {
        ...state,
        likes: unlike,
      };
    default:
      return state;
  }
};

export default userReducer;
