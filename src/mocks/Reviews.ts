import { Review } from '../entities/Review';
import { Users } from './Users';

export const Comments: Review[] = [
  {
    id: '1',
    date: '2019-05-08T14:13:56.569Z',
    user: Users[1],
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    rating: 4
  },
  {
    id: '2',
    date: '2019-05-08T14:13:56.569Z',
    user: Users[1],
    comment: 'Spacious and stylish place, the perfect choice for a relaxing time in Amsterdam. Everything was great!',
    rating: 5
  },
  {
    id: '3',
    date: '2019-05-08T14:13:56.569Z',
    user: Users[1],
    comment: 'Fantastic location, beautiful architecture, highly recommended for a memorable stay in Amsterdam!',
    rating: 4.5
  },
  {
    id: '4',
    date: '2019-05-08T14:13:56.569Z',
    user: Users[1],
    comment: 'Absolutely loved our stay here, amazing views and cozy atmosphere. A hidden gem in Amsterdam!',
    rating: 4.8
  }
];
