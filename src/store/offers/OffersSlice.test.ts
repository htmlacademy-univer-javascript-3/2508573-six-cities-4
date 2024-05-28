﻿import {
  offersSlice,
  fillOrders,
  setOrdersLoadingStatus,
  changeSortingOrder,
  changeFavoriteStatus,
  fillFavorites,
  OffersState,
} from './OffersSlice';
import { SortingOrder } from '../../entities/SortingOrder';
import { generateOffer } from '../../mocks/Offer';

describe('Offers slice', () => {
  let initialState: OffersState;

  beforeEach(() => {
    initialState = {
      offers: [],
      sortingOrder: 'Popular',
      offersLoadingStatus: false,
      favorites: [],
    };
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should fill offers with \'fillOrders\' action', () => {
    const orders = [generateOffer()];

    const result = offersSlice.reducer(initialState, fillOrders(orders));

    expect(result.offers).toEqual(orders);
  });

  it('should set loading status with \'setOrdersLoadingStatus\' action', () => {
    const loadingStatus = true;

    const result = offersSlice.reducer(
      initialState,
      setOrdersLoadingStatus(loadingStatus)
    );

    expect(result.offersLoadingStatus).toEqual(loadingStatus);
  });

  it('should change sorting order with \'changeSortingOrder\' action', () => {
    const newSortingOrder: SortingOrder = 'Price: high to low';

    const result = offersSlice.reducer(
      initialState,
      changeSortingOrder(newSortingOrder)
    );

    expect(result.sortingOrder).toEqual(newSortingOrder);
  });

  it('should change favorite status and update favorites list with \'changeFavoriteStatus\' action', () => {
    const offer = generateOffer();
    initialState.offers = [offer];

    const expectedOffer = offer;
    expectedOffer.isFavorite = true;

    const result = offersSlice.reducer(
      initialState,
      changeFavoriteStatus({ offerId: offer.id, isFavorite: true })
    );

    expect(result.favorites).toContainEqual(expectedOffer);
    expect(result.offers.find((o) => o.id === offer.id)?.isFavorite).toEqual(
      true
    );
  });

  it('should not add offer to favorites if offer is not in offers list', () => {
    const favoriteOffer = generateOffer();

    const result = offersSlice.reducer(
      initialState,
      changeFavoriteStatus({
        offerId: favoriteOffer.id,
        isFavorite: true,
      })
    );

    expect(result.favorites).not.toContainEqual(favoriteOffer);
  });

  it('should remove offer from favorites list when changing favorite status to false', () => {
    const favoriteOffer = generateOffer();
    favoriteOffer.isFavorite = true;

    initialState.offers = [favoriteOffer];
    initialState.favorites = [favoriteOffer];

    const favoriteData = {
      offerId: favoriteOffer.id,
      isFavorite: false,
    };

    const result = offersSlice.reducer(
      initialState,
      changeFavoriteStatus(favoriteData)
    );

    expect(result.favorites).not.toContainEqual(favoriteOffer);
  });

  it('should fill favorites with \'fillFavorites\' action', () => {
    const favorites = [generateOffer()];

    const result = offersSlice.reducer(initialState, fillFavorites(favorites));

    expect(result.favorites).toEqual(favorites);
  });
});
