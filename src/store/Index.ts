import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import cityReducer from './slices/CitySlice';
import offersReducer from './slices/OffersSlice';
import authReducer from './slices/AuthSlice';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    city: cityReducer,
    offers: offersReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
