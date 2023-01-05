import {
  REGISTER_USER,
  LOGIN_USER,
  VERIFY_USER,
  SIGNOUT_USER,
} from "../actions/types";
let userDefault = {
  firstname: null,
  lastname: null,
  email: null,
  phone: null,
};
const userReducer = (state = { loginInfo: userDefault }, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginInfo: { ...action.payload },
      };
    case VERIFY_USER:
      return {
        ...state,
        loginInfo: { ...state.data, ...action.payload },
        auth: action.payload.auth,
      };
    case REGISTER_USER:
      return {
        ...state,
        loginInfo: { ...state.data, ...action.payload },
      };
    case SIGNOUT_USER:
      return {
        ...state,
        loginInfo: { ...userDefault },
      };

    default:
      return state;
  }
};

export default userReducer;
