import { createReducer } from '@reduxjs/toolkit';
import { Cities } from '../mocks/Cities';
import {
  changeAuthStatusAction,
  changeCityAction,
  changeSortingOrderAction,
  fillOrdersAction,
  setOrdersLoadingStatusAction,
  setUserAction,
} from './Actions';
import { SortingOrder } from '../entities/SortingOrder';
import { Offer } from '../entities/Offer';
import { AuthorizationStatus } from '../Constants';
import { User } from '../entities/User';

const initialState: {
  city: string;
  offers: Offer[];
  sortingOrder: SortingOrder;
  offersLoadingStatus: boolean;
  authorizationStatus: AuthorizationStatus;
  user?: User;
} = {
  city: Cities[0].name,
  offers: [],
  sortingOrder: 'Popular',
  offersLoadingStatus: false,
  authorizationStatus: AuthorizationStatus.Unknown,
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
    })
    .addCase(changeAuthStatusAction, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserAction, (state, action) => {
      state.user = action.payload;
    });
});
