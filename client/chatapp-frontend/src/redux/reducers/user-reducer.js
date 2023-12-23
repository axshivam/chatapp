import { USER_TYPES } from "../constants";

const initialState = {
  username: "",
  isLoggedIn: false,
  name: "",
  picture: "",
  status: "offline",
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TYPES.SET_USERNAME:
      return {
        ...state,
        username: action.payload.username,
      };
    case USER_TYPES.SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload.status,
      };
    case USER_TYPES.SET_NAME:
      return {
        ...state,
        name: action.payload.name,
      };
    case USER_TYPES.SET_PICTURE:
      return {
        ...state,
        picture: action.payload.picture,
      };
    case USER_TYPES.SET_STATUS:
      return {
        ...state,
        status: action.payload.status,
      };
    case USER_TYPES.SET_PHONENUMBER:
      return {
        ...state,
        phoneNumber: action.payload.phoneNumber,
      };

    default:
      return state; // Add a default case to return the current state
  }
};

export default userReducer;
