import { axiosInstance } from "../utilities/axiosHelper";

import {
  getTokenCookie,
  getAuthHeader,
  removeTokenCookie,
} from "../utilities/authTools.js";

export const LoginUser = async (values) => {
  const loginInfo = await axiosInstance.post("auth/signin", {
    email: values.email,
    password: values.password,
  });

  return loginInfo.data;
};

export const userIsAuth = async () => {
  if (!getTokenCookie()) {
    return false;
  } else {
    const user = await axiosInstance.get("/auth/isauth", getAuthHeader());

    return user.data;
  }
};

export const userSignOut = async () => {
  await removeTokenCookie();
  return true;
};
