import { applyMiddleware, createStore } from "redux";
import rootReducer from "./Reducers";
import ReduxThunk from "redux-thunk";
import promiseMiddleware from "redux-promise";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

const middlewares = [ReduxThunk, promiseMiddleware, logger];
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
export const persistor = persistStore(store);
