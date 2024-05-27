import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../entities/Offer';
import { Review } from '../../entities/Review';
import { changeFavoriteStatus } from './OffersSlice';

type CurrentOfferState = {
  offer: Offer | undefined;
  reviews: Review[];
  nearbyOffers: Offer[];
};

const initialState: CurrentOfferState = {
  offer: undefined,
  reviews: [],
  nearbyOffers: [],
};

const currentOfferSlice = createSlice({
  name: 'currentOffer',
  initialState,
  reducers: {
    fillReviews(state, action: PayloadAction<Review[]>) {
      state.reviews = action.payload;
    },
    addReview(state, action: PayloadAction<Review>) {
      state.reviews.push(action.payload);
    },
    fillNearbyOffers(state, action: PayloadAction<Offer[]>) {
      state.nearbyOffers = action.payload;
    },
    updateOffer(state, action: PayloadAction<Offer | undefined>) {
      state.offer = action.payload;
    },
    clearOffer(state) {
      state.offer = undefined;
      state.nearbyOffers = [];
      state.reviews = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeFavoriteStatus, (state, action) => {
        const { offerId, isFavorite } = action.payload;
        if (state.offer && offerId === state.offer.id) {
          state.offer.isFavorite = isFavorite;
        }
      });
  },
});

export const { fillNearbyOffers, fillReviews, updateOffer, clearOffer, addReview } = currentOfferSlice.actions;
export default currentOfferSlice.reducer;
