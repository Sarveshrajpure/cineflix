import { GET_MOVIES, DELETE_MOVIE } from "../Actions/types";
let contentDefault = {
  movies: [],
  series: [],
};
const contentReducer = (state = contentDefault, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export default contentReducer;
