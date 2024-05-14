import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../entities/Offer';
import { SortingOrder } from '../../entities/SortingOrder';

type OffersState = {
  offers: Offer[];
  sortingOrder: SortingOrder;
  offersLoadingStatus: boolean;
}

const initialState: OffersState = {
  offers: [],
  sortingOrder: 'Popular',
  offersLoadingStatus: false,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    fillOrders(state, action: PayloadAction<Offer[]>) {
      state.offers = action.payload;
    },
    setOrdersLoadingStatus(state, action: PayloadAction<boolean>) {
      state.offersLoadingStatus = action.payload;
    },
    changeSortingOrder(state, action: PayloadAction<SortingOrder>) {
      state.sortingOrder = action.payload;
    },
  },
});

export const { fillOrders, setOrdersLoadingStatus, changeSortingOrder } = offersSlice.actions;
export default offersSlice.reducer;
