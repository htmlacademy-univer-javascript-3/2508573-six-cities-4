import { currentOfferSlice, fillReviews, addReview, fillNearbyOffers, updateOffer, clearOffer, CurrentOfferState } from './CurrentOfferSlice';
import { generateOffer } from '../../mocks/Offer';
import { generateReview } from '../../mocks/Review';

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

    const result = currentOfferSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should fill reviews with \'fillReviews\' action', () => {
    const reviews = [generateReview()];

    const result = currentOfferSlice.reducer(initialState, fillReviews(reviews));

    expect(result.reviews).toBe(reviews);
  });

  it('should add review with \'addReview\' action', () => {
    const newReview = generateReview();

    const result = currentOfferSlice.reducer(initialState, addReview(newReview));

    expect(result.reviews).toContainEqual(newReview);
  });

  it('should fill nearby offers with \'fillNearbyOffers\' action', () => {
    const nearbyOffers = [generateOffer(), generateOffer(), generateOffer()];

    const result = currentOfferSlice.reducer(initialState, fillNearbyOffers(nearbyOffers));

    expect(result.nearbyOffers).toEqual(nearbyOffers);
  });

  it('should update current offer with \'updateOffer\' action', () => {
    const newOffer = generateOffer();

    const result = currentOfferSlice.reducer(initialState, updateOffer(newOffer));

    expect(result.offer).toEqual(newOffer);
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
});
// TODO: добавить тест на extrareducers
