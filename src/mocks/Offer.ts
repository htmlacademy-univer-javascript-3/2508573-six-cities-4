import faker from 'faker';
import { Offer } from '../entities/Offer';
import { UserData } from '../entities/User';
import { generateLocation, generatePoint } from './Location';

export const generateOffer = (host: UserData): Offer => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: faker.lorem.word(),
  price: faker.datatype.number({ min: 50, max: 200 }),
  city: generateLocation(),
  location: generatePoint(),
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.datatype.float({ min: 0, max: 5 }),
  description: faker.lorem.paragraph(),
  bedrooms: faker.datatype.number({ min: 1, max: 5 }),
  goods: faker.random.words(5).split(' '),
  host: host,
  previewImage: faker.image.imageUrl(),
  images: [
    faker.image.imageUrl(),
    faker.image.imageUrl(),
    faker.image.imageUrl(),
  ],
  maxAdults: faker.datatype.number({ min: 1, max: 10 }),
});
