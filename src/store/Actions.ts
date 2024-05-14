import { createAction } from '@reduxjs/toolkit';
import { SortingOrder } from '../entities/SortingOrder';
import { Offer } from '../entities/Offer';
import { AuthorizationStatus } from '../Constants';

export const changeCityAction = createAction<string>('CHANGE_CITY');

export const fillOrdersAction = createAction<Offer[]>('FILL_ORDERS');

export const setOrdersLoadingStatusAction = createAction<boolean>('SET_OFFERS_LOADING');

export const changeSortingOrderAction = createAction<SortingOrder>('CHANGE_SORT_ORDER');

export const changeAuthStatusAction = createAction<AuthorizationStatus>('CHANGE_AUTH_STATUS');
