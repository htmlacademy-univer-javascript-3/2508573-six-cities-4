import { createReducer } from '@reduxjs/toolkit';
import { Cities } from '../mocks/Cities';
import { Offers } from '../mocks/Offers';

const initialState = {
  city: Cities.find((c) => c.name === 'Amsterdam') || Cities[0],
  offers: Offers
};

const reducer = createReducer(initialState, (builder) => builder);
