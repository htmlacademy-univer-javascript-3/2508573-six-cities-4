import { createAction } from '@reduxjs/toolkit';
import { Location } from '../entities/Location';

export const changeCityAction = createAction(
  'CHANGE_CITY',
  (value: Location) => ({
    payload: value,
  })
);

export const fillOrdersAction = createAction('FILL_ORDERS');
