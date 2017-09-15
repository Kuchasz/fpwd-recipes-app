import {UnitOfMeasure} from "./unit-of-measure.enum";
import {CookingMethod} from "./cooking-method.enum";
import {Ingredient} from "./ingredient.enum";

export interface RecipeIngredient {
  amount: number;
  ingredient: Ingredient;
  unit: UnitOfMeasure;
  cookingMethods: CookingMethod[];
}
