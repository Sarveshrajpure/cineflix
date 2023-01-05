import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";

import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["Profile"],
  blackList: ["User"],
};

const rootReducer = combineReducers({
  User: userReducer,
  Profile: profileReducer,
});

export default persistReducer(persistConfig, rootReducer);
