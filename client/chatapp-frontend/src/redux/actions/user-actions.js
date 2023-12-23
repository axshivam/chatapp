import { USER_TYPES } from "../constants";

const setUsername = (username) => {
  return {
    type: USER_TYPES.SET_USERNAME,
    payload: {
      username: username,
    },
  };
};

const setUserLoginStatus = (status) => {
  return {
    type: USER_TYPES.SET_IS_LOGGED_IN,
    payload: {
      status: status,
    },
  };
};

export { setUsername, setUserLoginStatus };
