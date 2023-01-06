import {
  GET_MOVIES,
  DELETE_MOVIE,
  GET_SERIES,
  DELETE_SERIES,
} from "../Actions/types";
let contentDefault = {
  movies: [],
  series: [],
};
const contentReducer = (state = contentDefault, action) => {
  switch (action.type) {
    // MOVIES
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };

    case DELETE_MOVIE:
      return {
        ...state,
        movies: action.payload,
      };

    // SERIES
    case GET_SERIES:
      return {
        ...state,
        series: action.payload,
      };

    case DELETE_SERIES:
      return {
        ...state,
        series: action.payload,
      };

    default:
      return state;
  }
};

export default contentReducer;
