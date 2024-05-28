import {
  currentOfferSlice,
  fillReviews,
  addReview,
  fillNearbyOffers,
  updateOffer,
  clearOffer,
  CurrentOfferState,
} from './CurrentOfferSlice';
import { generateOffer } from '../../mocks/Offer';
import { generateReview } from '../../mocks/Review';
import { changeFavoriteStatus } from '../offers/OffersSlice';
import { datatype } from 'faker';

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

  it('should fill reviews with \'fillReviews\' action', () => {
    const reviews = [generateReview()];

    const result = currentOfferSlice.reducer(
      initialState,
      fillReviews(reviews)
    );

    expect(result.reviews).toBe(reviews);
  });

  it('should add review with \'addReview\' action', () => {
    const review = generateReview();

    const result = currentOfferSlice.reducer(
      initialState,
      addReview(review)
    );

    expect(result.reviews).toContainEqual(review);
  });

  it('should fill nearby offers with \'fillNearbyOffers\' action', () => {
    const nearbyOffers = [generateOffer(), generateOffer(), generateOffer()];

    const result = currentOfferSlice.reducer(
      initialState,
      fillNearbyOffers(nearbyOffers)
    );

    expect(result.nearbyOffers).toEqual(nearbyOffers);
  });

  it('should update current offer with \'updateOffer\' action', () => {
    const offer = generateOffer();

    const result = currentOfferSlice.reducer(
      initialState,
      updateOffer(offer)
    );

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
