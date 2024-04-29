import { Location } from './Location';
import { Offer } from './Offer';

export type State = {
  city: Location;
  offers: Offer[];
};
