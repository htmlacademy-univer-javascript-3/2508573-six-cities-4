import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../entities/State';
import { AxiosInstance } from 'axios';
import { ApiRoutes, AuthorizationStatus } from '../Constants';
import { Offer } from '../entities/Offer';
import { User } from '../entities/User';
import { AuthData } from '../entities/AuthData';
import { dropToken, saveToken } from '../services/token';
import { setUser, changeAuthStatus } from './slices/AuthSlice';
import {
  changeFavoriteStatus,
  fillFavorites,
  fillOrders,
  setOrdersLoadingStatus,
} from './slices/OffersSlice';
import { FavoriteData } from '../entities/FavoriteData';
import { buildUrl } from '../services/apiUtils';

export const fetchOrdersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('FETCH_OFFERS', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOrdersLoadingStatus(true));
  const { data } = await api.get<Offer[]>(ApiRoutes.Offers);
  dispatch(setOrdersLoadingStatus(false));
  dispatch(fillOrders(data));
});

export const fetchFavoritesAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('FETCH_FAVORITES', async (_arg, { dispatch, getState, rejectWithValue, extra: api }) => {
  if (getState().auth.authorizationStatus !== AuthorizationStatus.Auth) {
    return rejectWithValue('Unauthorized');
  }
  const { data } = await api.get<Offer[]>(ApiRoutes.Favorite);
  dispatch(fillFavorites(data));
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
    dispatch(setUser(user));
    dispatch(changeAuthStatus(AuthorizationStatus.Auth));
  } catch {
    dispatch(changeAuthStatus(AuthorizationStatus.NoAuth));
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
>('LOGIN', async ({ login: email, password }, { dispatch, extra: api }) => {
  const {data: user} = await api.post<User>(ApiRoutes.Login, { email, password });
  dispatch(setUser(user));
  saveToken(user.token);
  dispatch(changeAuthStatus(AuthorizationStatus.Auth));
  dispatch(fetchFavoritesAction());
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('LOGOUT', async (_arg, { dispatch, extra: api }) => {
  await api.delete(ApiRoutes.Logout);
  dropToken();
  dispatch(changeAuthStatus(AuthorizationStatus.NoAuth));
  dispatch(setUser(null));
});

export const changeFavoriteStatusAction = createAsyncThunk<
  void,
  FavoriteData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'CHANGE_FAVORITE_STATUS',
  async ({ offerId, isFavorite }, { dispatch, getState, rejectWithValue, extra: api }) => {
    if (getState().auth.authorizationStatus !== AuthorizationStatus.Auth) {
      return rejectWithValue('Unauthorized');
    }
    await api.post<Offer>(
      buildUrl(ApiRoutes.FavoriteStatus, {
        offerId: offerId,
        status: Number(isFavorite).toString(),
      })
    );
    dispatch(changeFavoriteStatus({ offerId, isFavorite }));
  }
);
