import { SET_PROFILE } from "./types";

export const set_profile = (profile) => ({
  type: SET_PROFILE,
  payload: profile,
});
