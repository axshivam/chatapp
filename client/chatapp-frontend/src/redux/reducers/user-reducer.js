import { USER_TYPES } from "../constants";

const initialState = {
  username: "",
  isLoggedIn: false,
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

    default:
      return state; // Add a default case to return the current state
  }
};

export default userReducer;
