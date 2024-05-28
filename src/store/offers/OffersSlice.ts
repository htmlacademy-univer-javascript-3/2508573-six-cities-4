import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../entities/Offer';
import { SortingOrder } from '../../entities/SortingOrder';
import { FavoriteData } from '../../entities/FavoriteData';
import { fetchFavoritesAction, fetchOffersAction } from '../ApiActions';

export type OffersState = {
  offers: Offer[];
  sortingOrder: SortingOrder;
  offersLoadingStatus: boolean;
  favorites: Offer[];
};

const initialState: OffersState = {
  offers: [],
  sortingOrder: 'Popular',
  offersLoadingStatus: false,
  favorites: [],
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeSortingOrder(state, action: PayloadAction<SortingOrder>) {
      state.sortingOrder = action.payload;
    },
    changeFavoriteStatus(state, action: PayloadAction<FavoriteData>) {
      const { offerId, isFavorite } = action.payload;
      const offer = state.offers.find((x) => x.id === offerId);
      if (offer) {
        offer.isFavorite = isFavorite;
        if (isFavorite && !state.favorites.find((x) => x.id === offerId)) {
          state.favorites.push(offer);
        } else {
          state.favorites = state.favorites.filter((x) => x.id !== offerId);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.offersLoadingStatus = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.offersLoadingStatus = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offersLoadingStatus = false;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  },
});

export const {
  changeSortingOrder,
  changeFavoriteStatus,
} = offersSlice.actions;
export default offersSlice.reducer;
