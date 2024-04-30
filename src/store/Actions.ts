import { createAction } from '@reduxjs/toolkit';
import { SortingOrder } from '../entities/SortingOrder';

export const changeCityAction = createAction(
  'CHANGE_CITY',
  (value: string) => ({
    payload: value,
  })
);

export const fillOrdersAction = createAction('FILL_ORDERS');

export const changeSortingOrderAction = createAction(
  'CHANGE_SORT_ORDER',
  (value: SortingOrder) => ({
    payload: value,
  })
);
