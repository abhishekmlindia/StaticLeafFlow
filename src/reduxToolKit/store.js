import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import { resetStore } from "./resetAction";

import loginReducer from "./loginSlice";
import toastReducer from "./toastSlice";
import validationReducer from "./validationSlice";
import masterDataReducer from "./masterDataSlice";
import commonDataReducer from "./commonDataSlice";
import progressReducer from "./progressSlice";

const appReducer = combineReducers({
  loginData: loginReducer,
  toast: toastReducer,
  validationData: validationReducer,
  masterData: masterDataReducer,
  commonData: commonDataReducer,
  progress: progressReducer,
});

const rootReducer = (state, action) => {
  if (action.type === resetStore.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "loginData",
    "toast",
    "validationData",
    "masterData",
    "commonData",
    "progress",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
