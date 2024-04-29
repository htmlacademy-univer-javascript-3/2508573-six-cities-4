import { createReducer } from '@reduxjs/toolkit';
import { Cities } from '../mocks/Cities';
import { Offers } from '../mocks/Offers';
import { changeCityAction, fillOrdersAction } from './Actions';
import { Location } from '../entities/Location';
import { Offer } from '../entities/Offer';

type State = {
  city: Location;
  offers: Offer[];
};

const initialState: State = {
  city: Cities.find((c) => c.name === 'Amsterdam') || Cities[0],
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
