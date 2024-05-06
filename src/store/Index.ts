import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './Reducer';
import { createAPI } from '../services/Api';

export const api = createAPI();

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
