import { UserData } from './User';

export type Review = {
  id: string;
  date: string;
  user: UserData;
  comment: string;
  rating: number;
}
