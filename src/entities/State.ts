import { Offer } from './Offer';
import { SortingOrder } from './SortingOrder';

export type State = {
  city: string;
  offers: Offer[];
  sortingOrder: SortingOrder;
};
