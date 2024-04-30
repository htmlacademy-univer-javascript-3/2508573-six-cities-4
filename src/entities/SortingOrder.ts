import { Offer } from './Offer';

export const sortingOrders = {
  Popular: () => 0,
  'Price: low to high': (a: Offer, b: Offer) => a.price - b.price,
  'Price: high to low': (a: Offer, b: Offer) => b.price - a.price,
  'Top rated first': (a: Offer, b: Offer) => b.rating - a.rating,
};

export type SortingOrder = keyof typeof sortingOrders;
