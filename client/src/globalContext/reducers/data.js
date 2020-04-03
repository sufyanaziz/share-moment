import {
  SET_FLASH,
  CLOSE_FLASH,
  SET_USER_PROFILE,
  LOADING_DATA
} from "../types";

export const initialState = {
  loading: false,
  flash: "",
  close: false,
  user_profile: {}
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case SET_FLASH:
      return {
        ...state,
        flash: action.payload
      };
    case CLOSE_FLASH:
      return {
        ...state,
        flash: "",
        close: true
      };
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        loading: false,
        user_profile: action.payload
      };
    default:
      return state;
  }
};

export default dataReducer;
