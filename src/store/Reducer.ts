import { createReducer } from '@reduxjs/toolkit';
import { Cities } from '../mocks/Cities';
import {
  changeCityAction,
  changeSortingOrderAction,
  fillOrdersAction,
  setOrdersLoadingStatusAction,
} from './Actions';
import { SortingOrder } from '../entities/SortingOrder';
import { Offer } from '../entities/Offer';

const initialState: {
  city: string;
  offers: Offer[];
  sortingOrder: SortingOrder;
  offersLoadingStatus: boolean;
} = {
  city: Cities[0].name,
  offers: [],
  sortingOrder: 'Popular',
  offersLoadingStatus: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOrdersAction, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOrdersLoadingStatusAction, (state, action) => {
      state.offersLoadingStatus = action.payload;
    })
    .addCase(changeSortingOrderAction, (state, action) => {
      state.sortingOrder = action.payload;
    });
});
