import { configureStore } from "@reduxjs/toolkit";
// import { useReducer } from "react";
import userSlice from "./slice/user";
import { api } from "./slice/api";
import app from "./slice/app";

const store = configureStore({
  reducer: {
    users: userSlice,
    [api.reducerPath]: api.reducer,
    app: app,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
