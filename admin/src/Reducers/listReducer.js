import { GET_LISTS, DELETE_LISTS } from "../Actions/types";
let listDefault = [];
const listReducer = (state = listDefault, action) => {
  switch (action.type) {
    case GET_LISTS:
      return {
        ...state,
        lists: action.payload,
      };
    case DELETE_LISTS:
      return {
        ...state,
        lists: action.payload,
      };

    default:
      return state;
  }
};

export default listReducer;
