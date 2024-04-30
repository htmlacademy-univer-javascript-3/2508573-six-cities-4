import { createReducer } from '@reduxjs/toolkit';
import { Cities } from '../mocks/Cities';
import { Offers } from '../mocks/Offers';
import { changeCityAction, changeSortingOrderAction, fillOrdersAction } from './Actions';
import { State } from '../entities/State';


const initialState: State = {
  city: Cities[0].name,
  offers: [],
  sortingOrder: 'Popular'
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOrdersAction, (state) => {
      state.offers = Offers;
    })
    .addCase(changeSortingOrderAction, (state, action) => {
      state.sortingOrder = action.payload;
    });
});
