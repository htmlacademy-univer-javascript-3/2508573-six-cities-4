import faker from 'faker';
import { User } from '../entities/User';

export const generateUser = (): User => ({
  email: faker.internet.email(),
  token: faker.random.alphaNumeric(16),
  name: faker.name.findName(),
  avatarUrl: faker.image.avatar(),
  isPro: faker.datatype.boolean(),
});
