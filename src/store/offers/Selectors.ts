import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../entities/State';
import { sortingOrders } from '../../entities/SortingOrder';

export const cityOffersSelector = createSelector(
  [
    (state: Pick<State, 'offers'>) => state.offers.offers,
    (state: Pick<State, 'offers'>) => state.offers.sortingOrder,
    (state: Pick<State, 'city'>) => state.city.city,
  ],
  (offers, order, city) =>
    offers.filter((o) => o.city.name === city).sort(sortingOrders[order])
);
