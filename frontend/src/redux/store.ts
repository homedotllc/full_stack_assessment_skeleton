import { configureStore } from "@reduxjs/toolkit";
// import { useReducer } from "react";
import userSlice from "./slice/user";

const store = configureStore({
  reducer: {
    users: userSlice,
  },
});

export default store;
