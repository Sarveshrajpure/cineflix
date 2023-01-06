import { GET_MOVIES, GET_SERIES, DELETE_MOVIE } from "./types";

// MOVIES
export const get_movies = (movies) => ({
  type: GET_MOVIES,
  payload: movies,
});

export const delete_movies = (movies) => ({
  type: DELETE_MOVIE,
  payload: movies,
});

// SERIES
export const get_series = (series) => ({
  type: GET_SERIES,
  payload: series,
});

export const delete_series = (series) => ({
  type: DELETE_MOVIE,
  payload: series,
});
