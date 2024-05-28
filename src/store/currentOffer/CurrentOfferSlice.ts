import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../entities/Offer';
import { Review } from '../../entities/Review';
import { changeFavoriteStatus } from '../offers/OffersSlice';
import {
  fetchFullOffer,
  fetchNearbyOffers,
  fetchOffer,
  fetchReviews,
  sendReview,
} from '../ApiActions';
export type CurrentOfferState = {
  offer: Offer | undefined;
  reviews: Review[];
  nearbyOffers: Offer[];
  isError: boolean;
  isLoading: boolean;
};

const initialState: CurrentOfferState = {
  offer: undefined,
  reviews: [],
  nearbyOffers: [],
  isError: false,
  isLoading: false,
};

export const currentOfferSlice = createSlice({
  name: 'currentOffer',
  initialState,
  reducers: {
    clearOffer(state) {
      state.offer = undefined;
      state.nearbyOffers = [];
      state.reviews = [];
      state.isError = false;
      state.isLoading = false;
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
        state.isError = false;
        state.offer = action.payload;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.isError = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchFullOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFullOffer.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFullOffer.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(sendReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      });
  },
});

export const { clearOffer } = currentOfferSlice.actions;
export default currentOfferSlice.reducer;
