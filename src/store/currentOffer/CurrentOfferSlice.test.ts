import {
  currentOfferSlice,
  addReview,
  clearOffer,
  CurrentOfferState,
} from './CurrentOfferSlice';
import { generateOffer } from '../../mocks/Offer';
import { generateReview } from '../../mocks/Review';
import { changeFavoriteStatus } from '../offers/OffersSlice';
import { datatype } from 'faker';
import { fetchNearbyOffers, fetchOffer, fetchReviews } from '../ApiActions';

describe('Current Offer slice', () => {
  let initialState: CurrentOfferState;

  beforeEach(() => {
    initialState = {
      offer: undefined,
      reviews: [],
      nearbyOffers: [],
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

  it('should add review with \'addReview\' action', () => {
    const review = generateReview();

    const result = currentOfferSlice.reducer(initialState, addReview(review));

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

  it('should update current offer with \'fetchOffer\' action', () => {
    const offer = generateOffer();

    const result = currentOfferSlice.reducer(initialState, fetchOffer.fulfilled(offer, '', ''));

    expect(result.offer).toEqual(offer);
  });

  it('should clear current offer with \'clearOffer\' action', () => {
    initialState = {
      offer: generateOffer(),
      reviews: [generateReview()],
      nearbyOffers: [generateOffer(), generateOffer()],
    };

    const result = currentOfferSlice.reducer(initialState, clearOffer());

    expect(result.offer).toBeUndefined();
    expect(result.reviews).toHaveLength(0);
    expect(result.nearbyOffers).toHaveLength(0);
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
