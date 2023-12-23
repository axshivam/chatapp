import URLS from "../utils/endpoint-urls";

const loginAPI = async (data) => {
  const url = `${URLS.BASE_URL}${URLS.LOGIN_URL}`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response;
};

const signUpAPI = async (data) => {
  const url = `${URLS.BASE_URL}${URLS.SIGN_UP_URL}`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export default { loginAPI, signUpAPI };
