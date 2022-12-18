import { axiosInstance } from "../utilities/axiosHelper";
import { getAuthHeader, getTokenCookie } from "../utilities/authTools";

export const getUserStats = async (values) => {
  let response = await axiosInstance.get(`/auth/getstats`, getAuthHeader());

  return response.data;
};

export const loginUser = async (values) => {
  let response = await axiosInstance.post("/auth/signin", values);

  return response.data;
};

export const userIsAuth = async () => {
  if (!getTokenCookie()) {
    return false;
  } else {
    let response = await axiosInstance.get(
      "/auth/isauthadmin",
      getAuthHeader()
    );

    return response.data;
  }
};
