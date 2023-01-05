import { SET_PROFILE } from "../actions/types";
let userDefault = {
  id: null,
  name: null,
};
const profileReducer = (state = { selectedProfile: userDefault }, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        selectedProfile: { ...action.payload },
      };

    default:
      return state;
  }
};

export default profileReducer;
