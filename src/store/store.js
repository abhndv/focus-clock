import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import timerReducer from "./timerSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    timer: timerReducer,
  },
});
