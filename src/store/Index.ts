import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import cityReducer from './city/CitySlice';
import offersReducer from './offers/OffersSlice';
import authReducer from './auth/AuthSlice';
import currentOfferReducer from './currentOffer/CurrentOfferSlice';
import errorReducer from './errors/ErrorsSlice';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    city: cityReducer,
    offers: offersReducer,
    auth: authReducer,
    currentOffer: currentOfferReducer,
    error: errorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
