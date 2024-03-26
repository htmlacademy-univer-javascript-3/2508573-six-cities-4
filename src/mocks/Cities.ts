import { City } from '../entities/City';
import { Location } from '../entities/Location';

export const MockLocation: Location = {
  latitude: 0,
  longitude: 0,
  zoom: 1
};

export const Cities: City[] = [
  {
    name: 'Paris',
    location: MockLocation
  },
  {
    name: 'Cologne',
    location: MockLocation
  },
  {
    name: 'Brussels',
    location: MockLocation
  },
  {
    name: 'Amsterdam',
    location: MockLocation
  },
  {
    name: 'Hamburg',
    location: MockLocation
  },
  {
    name: 'Dusseldorf',
    location: MockLocation
  }
];
