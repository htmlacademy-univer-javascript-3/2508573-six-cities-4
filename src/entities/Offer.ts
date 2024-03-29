import { City } from './City';
import { UserData } from './User';
import { Location } from './Location';

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
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
