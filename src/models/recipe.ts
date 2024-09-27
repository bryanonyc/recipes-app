import type { RecipeRating } from "./recipe-rating";
import type { User } from "./user";

export type Recipe = {
    id: number;
    title: string;
    description: string | "";
    ingredients: string;
    directions: string;
    prepTime: number;
    cookTime: number;
    totalTime: number;
    servings: number;
    author: User;
    authorId: number;
    rating: RecipeRating[];
    tags: string;
  }
