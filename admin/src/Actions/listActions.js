import { GET_LISTS, DELETE_LISTS } from "./types";

export const get_Lists = (lists) => ({
  type: GET_LISTS,
  payload: lists,
});

export const delete_Lists = (lists) => ({
  type: DELETE_LISTS,
  payload: lists,
});
