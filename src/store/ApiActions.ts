import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../entities/State';
import { AxiosInstance } from 'axios';
import { fillOrdersAction, setOrdersLoadingStatusAction } from './Actions';
import { ApiRoutes } from '../Constants';
import { Offer } from '../entities/Offer';

export const fetchOrdersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('FETCH_OFFERS', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOrdersLoadingStatusAction(true));
  const { data } = await api<Offer[]>(ApiRoutes.Offers);
  dispatch(setOrdersLoadingStatusAction(false));
  dispatch(fillOrdersAction(data));
});
