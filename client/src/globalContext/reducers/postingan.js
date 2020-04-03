import {
  SET_ALL_POSTINGAN,
  LOADING_POSTINGAN,
  SET_SINGLE_POSTINGAN,
  SET_USER_POSTINGAN,
  RESET_SINGLE_POST,
  POST_POSTINGAN,
  SET_ERROR_POSTINGAN,
  SUBMIT_COMMENT,
  LIKE_POSTINGAN,
  UNLIKE_POSTINGAN,
  DELETE_POSTINGAN
} from "../types";

export const initialState = {
  loading: false,
  all_post: [],
  single_post: {},
  user_post: [],
  error: {}
};

const postinganReducer = (state, action) => {
  switch (action.type) {
    case LOADING_POSTINGAN:
      return {
        ...state,
        loading: true
      };
    case SET_ALL_POSTINGAN:
      return {
        ...state,
        loading: false,
        all_post: action.payload,
        error: {}
      };
    case SET_USER_POSTINGAN:
      return {
        ...state,
        loading: false,
        user_post: action.payload,
        error: {}
      };
    case SET_SINGLE_POSTINGAN:
      return {
        ...state,
        loading: false,
        single_post: action.payload,
        error: {}
      };
    case RESET_SINGLE_POST:
      return {
        ...state,
        single_post: {}
      };
    case POST_POSTINGAN:
      return {
        ...state,
        all_post: [action.payload, ...state.all_post],
        error: {}
      };
    case SET_ERROR_POSTINGAN:
      return {
        ...state,
        error: { ...action.payload },
        loading: false
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        single_post: {
          ...state.single_post,
          comment_count: state.single_post.comment_count + 1,
          comments: [action.payload, ...state.single_post.comments]
        }
      };
    case LIKE_POSTINGAN:
      let id = state.all_post.findIndex(
        post => post.id_postingan === action.payload.id_postingan
      );
      state.all_post[id] = action.payload;
      return {
        ...state,
        single_post: {
          ...state.single_post,
          like_count: state.single_post.like_count + 1
        }
      };
    case UNLIKE_POSTINGAN:
      let index = state.all_post.findIndex(
        post => post.id_postingan === action.payload.id_postingan
      );
      state.all_post[index] = action.payload;
      return {
        ...state,
        single_post: {
          ...state.single_post,
          like_count: state.single_post.like_count - 1
        }
      };
    case DELETE_POSTINGAN:
      const deletePost = state.all_post.filter(
        id => id.id_postingan !== action.payload
      );
      return {
        ...state,
        loading: false,
        all_post: deletePost
      };
    default:
      return state;
  }
};

export default postinganReducer;
