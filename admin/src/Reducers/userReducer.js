import {
  LOGIN_USER,
  SIGNOUT_USER,
} from "../Actions/types";
let userDefault = {
  _id: null,
  email: null,
  password: null,
  isAdmin: false,
};
const userReducer = (state = { loginInfo: userDefault }, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginInfo: { ...action.payload },
      };
    case SIGNOUT_USER:
      return {
        ...state,
        loginInfo: { ...userDefault },
        auth: false,
      };

    default:
      return state;
  }
};

export default userReducer;
