import { combineReducers, configureStore } from "@reduxjs/toolkit";
import subjectsReducer from "./subjectSlice";
const rootReducer = combineReducers({
  subjectsReducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
