import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './userApi';  // Import the API slice
import { homeApi } from './homeApi';  // Import the API slice

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, homeApi.middleware),
});

export default store;
