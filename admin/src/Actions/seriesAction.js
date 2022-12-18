import { LOGIN_USER, SIGNOUT_USER } from "./types";

export const login_user = (user) => ({
  type: LOGIN_USER,
  payload: user,
});

export const signout_user = () => ({
  type: SIGNOUT_USER,
});
