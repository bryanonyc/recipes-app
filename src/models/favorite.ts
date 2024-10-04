import { User } from './user';

export type Favorite = {
  id: number;
  recipeId: number;
  userId: number;
  user: User;
}
