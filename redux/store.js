import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer
    },
  });
};
