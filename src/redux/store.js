import { configureStore } from '@reduxjs/toolkit';
import { carApi } from './api';


export const store = configureStore({
  reducer: {
    // Add the carApi reducer
    [carApi.reducerPath]: carApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(carApi.middleware),
});


