import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../entities/State';
import { AxiosInstance } from 'axios';
import { ApiRoutes, AuthorizationStatus } from '../Constants';
import { Offer } from '../entities/Offer';
import { User } from '../entities/User';
import { AuthData } from '../entities/AuthData';
import { changeFavoriteStatus } from './offers/OffersSlice';
import { FavoriteData } from '../entities/FavoriteData';
import { buildUrl } from '../services/apiUtils';
import { Review } from '../entities/Review';
import { ReviewData } from '../entities/ReviewData';

export const fetchOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('FETCH_OFFERS', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>(ApiRoutes.Offers);
  return data;
});

export const fetchFavoritesAction = createAsyncThunk<
  Offer[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'FETCH_FAVORITES',
  async (_arg, { getState, rejectWithValue, extra: api }) => {
    if (getState().auth.authorizationStatus !== AuthorizationStatus.Auth) {
      return rejectWithValue('Unauthorized');
    }
    const { data } = await api.get<Offer[]>(ApiRoutes.Favorite);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<
  User,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('CHECK_AUTH', async (_arg, { extra: api }) => {
  const { data: user } = await api.get<User>(ApiRoutes.Login);
  return user;
});

export const loginAction = createAsyncThunk<
  User,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('LOGIN', async ({ login: email, password }, { extra: api }) => {
  const { data: user } = await api.post<User>(ApiRoutes.Login, {
    email,
    password,
  });
  return user;
});

export const loginAndFetchFavorites = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('LOGIN_AND_FETCH_FAVORITES', async (authData, { dispatch }) => {
  await dispatch(loginAction(authData));
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
>('LOGOUT', async (_arg, { extra: api }) => {
  await api.delete(ApiRoutes.Logout);
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
  async (
    { offerId, isFavorite },
    { dispatch, getState, rejectWithValue, extra: api }
  ) => {
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

export const fetchOffer = createAsyncThunk<
  Offer,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('FETCH_OFFER', async (offerId, { extra: api }) => {
  const { data: offer } = await api.get<Offer>(
    buildUrl(ApiRoutes.Offer, { offerId })
  );
  return offer;
});

export const fetchReviews = createAsyncThunk<
  Review[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('FETCH_REVIEWS', async (offerId, { extra: api }) => {
  const { data: reviews } = await api.get<Review[]>(
    buildUrl(ApiRoutes.Comments, { offerId })
  );
  return reviews;
});

export const fetchNearbyOffers = createAsyncThunk<
  Offer[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'FETCH_NEARBY_OFFERS',
  async (offerId, { extra: api }) => {
    const { data: nearbyOffers } = await api.get<Offer[]>(
      buildUrl(ApiRoutes.OffersNearby, { offerId })
    );
    return nearbyOffers;
  }
);

export const fetchFullOffer = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('FETCH_FULL_OFFER', (offerId, { dispatch }) => {
  dispatch(fetchOffer(offerId));
  dispatch(fetchReviews(offerId));
  dispatch(fetchNearbyOffers(offerId));
});

export const sendReview = createAsyncThunk<
  Review,
  ReviewData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'SEND_REVIEW',
  async (
    { offerId, formData },
    { getState, rejectWithValue, extra: api }
  ) => {
    if (getState().auth.authorizationStatus !== AuthorizationStatus.Auth) {
      return rejectWithValue('Unauthorized');
    }
    const { data: review } = await api.post<Review>(
      buildUrl(ApiRoutes.Comments, { offerId }),
      formData
    );
    return review;
  }
);
