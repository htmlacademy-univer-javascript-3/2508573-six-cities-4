import faker from 'faker';
import { Location } from '../entities/Location';
import { Point } from '../entities/Point';

export const generatePoint = (): Point => ({
  latitude: parseFloat(faker.address.latitude()),
  longitude: parseFloat(faker.address.longitude()),
  zoom: faker.datatype.number({ min: 5, max: 15 }),
});

export const generateLocation = (): Location => ({
  name: faker.address.city(),
  location: generatePoint(),
});
