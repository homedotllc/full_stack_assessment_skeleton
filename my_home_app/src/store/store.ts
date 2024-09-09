import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from '../services/usersApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { homesApi } from '../services/homeApis';

// Configure the store and add the users API slice to the middleware
export const store = configureStore({
  reducer: {
    // Add the usersApi reducer to the store
    [usersApi.reducerPath]: usersApi.reducer,
    [homesApi.reducerPath]: homesApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware).concat(homesApi.middleware),
});

// Setup listeners for refetching data
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;