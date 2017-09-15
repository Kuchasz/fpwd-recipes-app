import {RecipeIngredient} from "./recipe-ingredient";

export interface Recipe {
  id: number;
  name: string;
  bigAmount: boolean;
  ingredients: RecipeIngredient[];
}
