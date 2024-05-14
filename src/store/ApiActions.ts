import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../entities/State';
import { AxiosInstance } from 'axios';
import {
  changeAuthStatusAction,
  fillOrdersAction,
  setOrdersLoadingStatusAction,
  setUserAction,
} from './Actions';
import { ApiRoutes, AuthorizationStatus } from '../Constants';
import { Offer } from '../entities/Offer';
import { User } from '../entities/User';
import { AuthData } from '../entities/AuthData';
import { dropToken, saveToken } from '../services/token';

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
  const { data } = await api.get<Offer[]>(ApiRoutes.Offers);
  dispatch(setOrdersLoadingStatusAction(false));
  dispatch(fillOrdersAction(data));
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('CHECK_AUTH', async (_arg, { dispatch, extra: api }) => {
  try {
    const user = (await api.get<User>(ApiRoutes.Login)).data;
    dispatch(setUserAction(user));
    dispatch(changeAuthStatusAction(AuthorizationStatus.Auth));
  } catch {
    dispatch(changeAuthStatusAction(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const user = (await api.post<User>(ApiRoutes.Login, { email, password })).data;
    dispatch(setUserAction(user));
    saveToken(user.token);
    dispatch(changeAuthStatusAction(AuthorizationStatus.Auth));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(ApiRoutes.Logout);
  dropToken();
  dispatch(changeAuthStatusAction(AuthorizationStatus.NoAuth));
});
