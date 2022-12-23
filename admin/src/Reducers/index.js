import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userReducer";
import listReducer from "./listReducer";
import contentReducer from "./contentReducer";
// import seriesReducer from "./seriesReducer";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
  whiteList: [""],
  blackList: ["User"],
};

const rootReducer = combineReducers({
  User: userReducer,
  List: listReducer,
  Content: contentReducer,
});

export default persistReducer(persistConfig, rootReducer);
