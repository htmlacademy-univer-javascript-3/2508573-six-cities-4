import { createAction } from '@reduxjs/toolkit';

const changeCityAction = createAction('CHANGE_CITY', (value: string)=> ({
  payload: value
}));

const fillOrdersAction = createAction('FILL_ORDERS');
