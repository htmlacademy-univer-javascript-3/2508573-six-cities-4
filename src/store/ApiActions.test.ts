import { Action } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {
  fetchOffersAction,
  checkAuthAction,
  loginAction,
  fetchFavoritesAction,
  logoutAction,
  loginAndFetchFavorites,
  changeFavoriteStatusAction,
  fetchNearbyOffers,
  fetchOffer,
  fetchReviews,
  sendReview,
} from './ApiActions';
import { State } from '../entities/State';
import { createAPI } from '../services/api';
import { AppThunkDispatch, extractActionsTypes } from '../mocks/Utils';
import { ApiRoutes, AuthorizationStatus } from '../Constants';
import { generateOffer } from '../mocks/Offer';
import { buildUrl } from '../services/apiUtils';
import { changeFavoriteStatus } from './offers/OffersSlice';
import { generateReview } from '../mocks/Review';

describe('Async actions', () => {
  const api = createAPI();
  const mockAxiosAdapter = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      offers: { offers: [] },
      auth: { authorizationStatus: AuthorizationStatus.NoAuth },
    });
  });

  describe('fetchOffersAction', () => {
    it("should dispatch 'fetchOffersAction.pending' and 'fetchOffersAction.fulfilled' with thunk 'fetchOffersAction'", async () => {
      const mockOffers = [generateOffer(), generateOffer()];
      mockAxiosAdapter.onGet(ApiRoutes.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());
      const emmitedActions = store.getActions();
      const actionsTypes = extractActionsTypes(emmitedActions);
      const fetchOffersActionFulfilled = emmitedActions.at(1) as ReturnType<
        typeof fetchOffersAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);
      expect(fetchOffersActionFulfilled.payload).toEqual(mockOffers);
    });

    it("should dispatch 'fetchOffersAction.pending' and 'fetchOffersAction.rejected' with thunk 'fetchOffersAction' if api error occured", async () => {
      mockAxiosAdapter.onGet(ApiRoutes.Offers).reply(400);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchFavoritesAction', () => {
    it("should dispatch 'fetchFavoritesAction.pending' and 'fetchFavoritesAction.fulfilled' with thunk 'fetchFavoritesAction' if user authorized", async () => {
      store.getState().auth!.authorizationStatus = AuthorizationStatus.Auth;
      const mockFavorites = [generateOffer(), generateOffer()];
      mockAxiosAdapter.onGet(ApiRoutes.Favorite).reply(200, mockFavorites);

      await store.dispatch(fetchFavoritesAction());
      const emmitedActions = store.getActions();
      const actionsTypes = extractActionsTypes(emmitedActions);
      const fetchFavoritesActionFulfilled = emmitedActions.at(1) as ReturnType<
        typeof fetchFavoritesAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type,
      ]);
      expect(fetchFavoritesActionFulfilled.payload).toEqual(mockFavorites);
    });

    it("should dispatch 'fetchFavoritesAction.pending' and 'fetchFavoritesAction.rejected' with thunk 'fetchFavoritesAction' if the user is not authorized", async () => {
      mockAxiosAdapter.onGet(ApiRoutes.Favorite).reply(401);

      await store.dispatch(fetchFavoritesAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.rejected.type,
      ]);
    });

    it("should dispatch 'fetchFavoritesAction.pending' and 'fetchFavoritesAction.rejected' with thunk 'fetchFavoritesAction' if api error occured", async () => {
      mockAxiosAdapter.onGet(ApiRoutes.Favorite).reply(400);

      await store.dispatch(fetchFavoritesAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.rejected.type,
      ]);
    });
  });

  describe('checkAuthAction', () => {
    it("should dispatch 'checkAuthAction.pending' and 'checkAuthAction.fulfilled' with thunk 'checkAuthAction", async () => {
      mockAxiosAdapter.onGet(ApiRoutes.Login).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it("should dispatch 'checkAuthAction.pending' and 'checkAuthAction.rejected' with thunk 'checkAuthAction' if api error occured", async () => {
      mockAxiosAdapter.onGet(ApiRoutes.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" when server response 200', async () => {
      const fakeUser = { login: 'test@test.ru', password: '123456' };
      const fakeServerReply = { token: 'secret' };
      mockAxiosAdapter.onPost(ApiRoutes.Login).reply(200, fakeServerReply);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it("should dispatch 'loginAction.pending' and 'loginAction.fulfilled' with thunk 'loginAction", async () => {
      const fakeUser = { login: 'test@test.ru', password: '123456' };
      const fakeServerReply = { token: 'secret' };
      mockAxiosAdapter.onPost(ApiRoutes.Login).reply(200, fakeServerReply);

      await store.dispatch(loginAction(fakeUser));
      const emmitedActions = store.getActions();
      const actionsTypes = extractActionsTypes(emmitedActions);
      const loginActionFulfilled = emmitedActions.at(1) as ReturnType<
        typeof loginAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);
      expect(loginActionFulfilled.payload).toEqual(fakeServerReply);
    });
  });

  describe('loginAndFetchFavorites', () => {
    it('should dispatch login, fetchFavorites actions if login is successful', async () => {
      const fakeUser = { login: 'test@test.ru', password: '123456' };
      const fakeServerReply = { token: 'secret' };
      const mockFavorites = [generateOffer(), generateOffer()];
      store.getState().auth!.authorizationStatus = AuthorizationStatus.Auth;

      mockAxiosAdapter.onPost(ApiRoutes.Login).reply(200, fakeServerReply);
      mockAxiosAdapter.onGet(ApiRoutes.Favorite).reply(200, mockFavorites);

      await store.dispatch(loginAndFetchFavorites(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContainEqual(loginAction.fulfilled.type);
      expect(actions).toContainEqual(fetchFavoritesAction.fulfilled.type);
    });

    it('should dispatch login and reject fetchFavorites actions if login fails', async () => {
      const fakeUser = { login: 'test@test.ru', password: '123456' };
      mockAxiosAdapter.onPost(ApiRoutes.Login).reply(400);

      await store.dispatch(loginAndFetchFavorites(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContainEqual(loginAction.rejected.type);
      expect(actions).not.toContain(fetchFavoritesAction.fulfilled.type);
    });
  });

  describe('logoutAction', () => {
    it("should dispatch 'logoutAction.pending' and 'logoutAction.fulfilled' with thunk 'logoutAction'", async () => {
      mockAxiosAdapter.onDelete(ApiRoutes.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it("should dispatch 'logoutAction.pending' and 'logoutAction.rejected' with thunk 'logoutAction' if api error occured", async () => {
      mockAxiosAdapter.onDelete(ApiRoutes.Logout).reply(400);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.rejected.type,
      ]);
    });
  });

  describe('changeFavoriteStatusAction', () => {
    it("should dispatch 'changeFavoriteStatusAction.pending', 'changeFavoriteStatus' and 'changeFavoriteStatusAction.fulfilled' with thunk 'changeFavoriteStatusAction' if the user is authorized", async () => {
      const fakeFavoriteData = { offerId: '123', isFavorite: true };
      mockAxiosAdapter
        .onPost(
          buildUrl(ApiRoutes.FavoriteStatus, {
            offerId: '123',
            status: '1',
          })
        )
        .reply(200);
      store.getState().auth!.authorizationStatus = AuthorizationStatus.Auth;

      await store.dispatch(changeFavoriteStatusAction(fakeFavoriteData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavoriteStatusAction.pending.type,
        changeFavoriteStatus.type,
        changeFavoriteStatusAction.fulfilled.type,
      ]);
    });

    it("should dispatch 'changeFavoriteStatusAction.pending' and 'changeFavoriteStatusAction.rejected' with thunk 'changeFavoriteStatusAction' if the user is not authorized", async () => {
      store.getState().auth!.authorizationStatus = AuthorizationStatus.NoAuth;

      await store.dispatch(
        changeFavoriteStatusAction({ offerId: '123', isFavorite: true })
      );

      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        changeFavoriteStatusAction.pending.type,
        changeFavoriteStatusAction.rejected.type,
      ]);
    });
  });

  describe('fetchOffer', () => {
    it("should dispatch 'fetchOffer.pending' and 'fetchOffer.fulfilled' with thunk 'fetchOffer'", async () => {
      const mockOfferId = '123';
      const mockOffer = generateOffer();
      mockAxiosAdapter
        .onGet(buildUrl(ApiRoutes.Offer, { offerId: mockOfferId }))
        .reply(200, mockOffer);

      await store.dispatch(fetchOffer(mockOfferId));
      const emittedActions = store.getActions();
      const actionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchOffer.fulfilled
      >;

      expect(actionsTypes).toEqual([
        fetchOffer.pending.type,
        fetchOffer.fulfilled.type,
      ]);
      expect(fetchOfferFulfilled.payload).toEqual(mockOffer);
    });

    it("should dispatch 'fetchOffer.pending' and 'fetchOffer.rejected' with thunk 'fetchOffer' if API error occurs", async () => {
      const mockOfferId = '123';
      mockAxiosAdapter
        .onGet(buildUrl(ApiRoutes.Offer, { offerId: mockOfferId }))
        .reply(400);

      await store.dispatch(fetchOffer(mockOfferId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffer.pending.type,
        fetchOffer.rejected.type,
      ]);
    });
  });

  describe('fetchReviews', () => {
    it("should dispatch 'fetchReviews.pending' and 'fetchReviews.fulfilled' with thunk 'fetchReviews'", async () => {
      const mockOfferId = '123';
      const mockReviews = [generateReview(), generateReview()];
      mockAxiosAdapter
        .onGet(buildUrl(ApiRoutes.Comments, { offerId: mockOfferId }))
        .reply(200, mockReviews);

      await store.dispatch(fetchReviews(mockOfferId));
      const emittedActions = store.getActions();
      const actionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchReviews.fulfilled
      >;

      expect(actionsTypes).toEqual([
        fetchReviews.pending.type,
        fetchReviews.fulfilled.type,
      ]);
      expect(fetchReviewsFulfilled?.payload).toEqual(mockReviews);
    });

    it("should dispatch 'fetchReviews.pending' and 'fetchReviews.rejected' with thunk 'fetchReviews' if API error occurs", async () => {
      const mockOfferId = '123';
      mockAxiosAdapter
        .onGet(buildUrl(ApiRoutes.Comments, { offerId: mockOfferId }))
        .reply(400);

      await store.dispatch(fetchReviews(mockOfferId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviews.pending.type,
        fetchReviews.rejected.type,
      ]);
    });
  });

  describe('fetchNearbyOffers', () => {
    it("should dispatch 'fetchNearbyOffers.pending' and 'fetchNearbyOffers.fulfilled' with thunk 'fetchNearbyOffers'", async () => {
      const mockOfferId = '123';
      const mockNearbyOffers = [generateOffer(), generateOffer()];
      mockAxiosAdapter
        .onGet(buildUrl(ApiRoutes.OffersNearby, { offerId: mockOfferId }))
        .reply(200, mockNearbyOffers);

      await store.dispatch(fetchNearbyOffers(mockOfferId));
      const emittedActions = store.getActions();
      const actionsTypes = extractActionsTypes(emittedActions);
      const fetchNearbyOffersFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchNearbyOffers.fulfilled
      >;

      expect(actionsTypes).toEqual([
        fetchNearbyOffers.pending.type,
        fetchNearbyOffers.fulfilled.type,
      ]);
      expect(fetchNearbyOffersFulfilled?.payload).toEqual(mockNearbyOffers);
    });

    it("should dispatch 'fetchNearbyOffers.pending' and 'fetchNearbyOffers.rejected' with thunk 'fetchNearbyOffers' if API error occurs", async () => {
      const mockOfferId = '123';
      mockAxiosAdapter
        .onGet(buildUrl(ApiRoutes.OffersNearby, { offerId: mockOfferId }))
        .reply(400);

      await store.dispatch(fetchNearbyOffers(mockOfferId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearbyOffers.pending.type,
        fetchNearbyOffers.rejected.type,
      ]);
    });
  });

  describe('sendReview', () => {
    it("should dispatch 'sendReview.pending' and 'sendReview.fulfilled' with correct payload for authorized user", async () => {
      const mockReviewData = {
        offerId: '123',
        formData: { comment: 'Great experience', rating: 5 },
      };
      const mockReview = generateReview();
      mockAxiosAdapter
        .onPost(
          buildUrl(ApiRoutes.Comments, { offerId: mockReviewData.offerId })
        )
        .reply(200, mockReview);
      store.getState().auth!.authorizationStatus = AuthorizationStatus.Auth;

      await store.dispatch(sendReview(mockReviewData));
      const emittedActions = store.getActions();
      const actionsTypes = extractActionsTypes(emittedActions);
      const sendReviewFulfilled = emittedActions.at(1) as ReturnType<
        typeof sendReview.fulfilled
      >;

      expect(actionsTypes).toEqual([
        sendReview.pending.type,
        sendReview.fulfilled.type,
      ]);
      expect(sendReviewFulfilled?.payload).toEqual(mockReview);
    });

    it("should dispatch 'sendReview.pending' and 'sendReview.rejected' for unauthorized user", async () => {
      const mockReviewData = {
        offerId: '123',
        formData: { comment: 'Great experience', rating: 5 },
      };
      store.getState().auth!.authorizationStatus = AuthorizationStatus.NoAuth;

      await store.dispatch(sendReview(mockReviewData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        sendReview.pending.type,
        sendReview.rejected.type,
      ]);
    });
  });
});
