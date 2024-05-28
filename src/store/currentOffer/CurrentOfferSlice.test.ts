import {
  currentOfferSlice,
  clearOffer,
  CurrentOfferState,
} from './CurrentOfferSlice';
import { generateOffer } from '../../mocks/Offer';
import { generateReview } from '../../mocks/Review';
import { changeFavoriteStatus } from '../offers/OffersSlice';
import { datatype } from 'faker';
import { fetchFullOffer, fetchNearbyOffers, fetchOffer, fetchReviews, sendReview } from '../ApiActions';
import { ReviewData } from '../../entities/ReviewData';

describe('Current Offer slice', () => {
  let initialState: CurrentOfferState;

  beforeEach(() => {
    initialState = {
      offer: undefined,
      reviews: [],
      nearbyOffers: [],
      isError: false,
      isLoading: false,
    };
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = currentOfferSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should fill reviews with \'fetchReviews\' action', () => {
    const reviews = [generateReview()];

    const result = currentOfferSlice.reducer(
      initialState,
      fetchReviews.fulfilled(reviews, '', '')
    );

    expect(result.reviews).toBe(reviews);
  });

  it('should add review with \'sendReview\' action', () => {
    const review = generateReview();

    const result = currentOfferSlice.reducer(initialState, sendReview.fulfilled(review, '', {} as ReviewData));

    expect(result.reviews).toContainEqual(review);
  });

  it('should fill nearby offers with \'fetchNearbyOffers\' action', () => {
    const nearbyOffers = [generateOffer(), generateOffer(), generateOffer()];

    const result = currentOfferSlice.reducer(
      initialState,
      fetchNearbyOffers.fulfilled(nearbyOffers, '', '')
    );

    expect(result.nearbyOffers).toEqual(nearbyOffers);
  });

  it('should update current offer and set isError to true with \'fetchOffer\' action', () => {
    const offer = generateOffer();

    const result = currentOfferSlice.reducer(initialState, fetchOffer.fulfilled(offer, '', ''));

    expect(result.offer).toEqual(offer);
    expect(result.isError).toEqual(false);
  });

  it('should set isError to true with \'fetchOffer\' rejected action', () => {
    const result = currentOfferSlice.reducer(initialState, fetchOffer.rejected);

    expect(result.isError).toEqual(true);
  });

  it('should set isLoading to true with \'fetchFullOffer\' pending action', () => {
    const result = currentOfferSlice.reducer(initialState, fetchFullOffer.pending);

    expect(result.isLoading).toEqual(true);
  });

  it('should set isLoading to false with \'fetchFullOffer\' fulfilled or rejected action', () => {
    let result = currentOfferSlice.reducer(initialState, fetchFullOffer.fulfilled);

    expect(result.isLoading).toEqual(false);

    result = currentOfferSlice.reducer(initialState, fetchFullOffer.rejected);

    expect(result.isLoading).toEqual(false);
  });

  it('should clear current offer with \'clearOffer\' action', () => {
    initialState = {
      offer: generateOffer(),
      reviews: [generateReview()],
      nearbyOffers: [generateOffer(), generateOffer()],
      isError: true,
      isLoading: true
    };

    const result = currentOfferSlice.reducer(initialState, clearOffer());

    expect(result.offer).toBeUndefined();
    expect(result.reviews).toHaveLength(0);
    expect(result.nearbyOffers).toHaveLength(0);
    expect(result.isError).toEqual(false);
    expect(result.isLoading).toEqual(false);
  });

  it('should update favorite status of current offer when "changeFavoriteStatus" action is dispatched', () => {
    const offer = generateOffer();
    initialState.offer = offer;

    const result = currentOfferSlice.reducer(
      initialState,
      changeFavoriteStatus({ offerId: offer.id, isFavorite: true })
    );

    expect(result.offer?.isFavorite).toEqual(true);
  });

  it('should not update favorite status if offerId does not match current offer', () => {
    const offer = generateOffer();
    initialState.offer = offer;

    const result = currentOfferSlice.reducer(
      initialState,
      changeFavoriteStatus({ offerId: datatype.uuid(), isFavorite: true })
    );

    expect(result.offer?.isFavorite).toEqual(false);
  });
});
