import { GET_MOVIES, DELETE_MOVIE } from "./types";

export const get_movies = (movies) => ({
  type: GET_MOVIES,
  payload: movies,
});

export const delete_movies = (movies) => ({
  type: DELETE_MOVIE,
  payload: movies,
});
