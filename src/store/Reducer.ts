import { createReducer } from '@reduxjs/toolkit';
import { Cities } from '../mocks/Cities';
import { Offers } from '../mocks/Offers';
import { changeCityAction, fillOrdersAction } from './Actions';
import { State } from '../entities/State';


const initialState: State = {
  city: Cities[0],
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOrdersAction, (state) => {
      state.offers = Offers;
    });
});
