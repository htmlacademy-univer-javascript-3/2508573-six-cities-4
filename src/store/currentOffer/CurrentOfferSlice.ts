import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../entities/Offer';
import { Review } from '../../entities/Review';
import { changeFavoriteStatus } from '../offers/OffersSlice';
import { fetchNearbyOffers, fetchOffer, fetchReviews } from '../ApiActions';

export type CurrentOfferState = {
  offer: Offer | undefined;
  reviews: Review[];
  nearbyOffers: Offer[];
};

const initialState: CurrentOfferState = {
  offer: undefined,
  reviews: [],
  nearbyOffers: [],
};

export const currentOfferSlice = createSlice({
  name: 'currentOffer',
  initialState,
  reducers: {
    addReview(state, action: PayloadAction<Review>) {
      state.reviews.push(action.payload);
    },
    clearOffer(state) {
      state.offer = undefined;
      state.nearbyOffers = [];
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeFavoriteStatus, (state, action) => {
        const { offerId, isFavorite } = action.payload;
        if (state.offer && offerId === state.offer.id) {
          state.offer.isFavorite = isFavorite;
        }
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offer = action.payload;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      });
  },
});

export const { clearOffer, addReview } = currentOfferSlice.actions;
export default currentOfferSlice.reducer;
