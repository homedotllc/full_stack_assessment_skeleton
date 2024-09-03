import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import homeReducer from './homeSlice';
import apiSlice from './apiSlice';

const store = configureStore({
  reducer: {
    user: userReducer, 
    home: homeReducer, 
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
