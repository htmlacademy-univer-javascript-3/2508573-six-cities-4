import { DEFAULT_MAP_ZOOM } from '../Constants';
import { Location } from '../entities/Location';
import { Point } from '../entities/Point';

export const MockLocation: Point = {
  latitude:  52.379863,
  longitude: 4.894327,
  zoom: DEFAULT_MAP_ZOOM
};

export const Cities: Location[] = [
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
