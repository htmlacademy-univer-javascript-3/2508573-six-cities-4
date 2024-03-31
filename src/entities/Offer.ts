import { Location } from './Location';
import { UserData } from './User';
import { Point } from './Point';

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: Location;
  location: Point;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods?: string[];
  host: UserData;
  previewImage: string;
  images?: string[];
  maxAdults: number;
};
