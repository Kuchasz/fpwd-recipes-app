import {Injectable} from '@angular/core';
import {Recipe} from '../models/recipe';
import {RecipeIngredient} from '../models/recipe-ingredient';
import {Ingredient} from '../models/ingredient.enum';
import {isNumber} from 'util';
import {UnitOfMeasure} from '../models/unit-of-measure.enum';
import {CookingMethod} from '../models/cooking-method.enum';

const getRandomInteger = (max: number) => Math.floor(Math.random() * max);

const getArrayFromRange = (range: number) => Array.from(Array(range)).map((_, index) => index);

const gerRandomArrayItem = <T>(arr: T[]) => arr[getRandomInteger(arr.length)];

type Enum = { [id: number]: string };

const getRandomEnum: <T>(Enum) => T = <T>(enumType: Enum) => {
    const enumValues = Object.values(enumType).filter(i => isNumber(i));
    return <T>enumValues[getRandomInteger(enumValues.length)];
};

const getRandomRecipeIngredient: () => RecipeIngredient = () => {
    return {
        ingredient: getRandomEnum<Ingredient>(Ingredient),
        amount: getRandomInteger(500),
        unit: getRandomEnum<UnitOfMeasure>(UnitOfMeasure),
        cookingMethods: getArrayFromRange(getRandomInteger(3)+1).map(x => getRandomEnum<CookingMethod>(CookingMethod))
    };
};

const cuisineNames = ['Italian', 'Indonesian', 'Mexican', 'Chinese', 'Spanish', 'French', 'Japanese', 'Turkey', 'Thai', 'Indian'];
const dishNames = ['Soup', 'Chicken', 'Pizza', 'Fried Rice', 'Cake', 'Salad', 'Fish'];

const getRandomRecipeName = () => `${gerRandomArrayItem(cuisineNames)} ${gerRandomArrayItem(dishNames)}`;

const getRandomRecipe: (number) => Recipe = (id: number) => {
    const ingredients = getArrayFromRange(getRandomInteger(15) + 1).map(() => getRandomRecipeIngredient());
    return {
        id,
        name: getRandomRecipeName(),
        ingredients,
        bigAmount: ingredients.reduce((prev, cur) => prev + cur.amount, 0) > 1000
    };
};

const getRandomRecipes = () => getArrayFromRange(getRandomInteger(20) + 5).map(id => getRandomRecipe(id));

@Injectable()
export class RecipesService {

    private readonly recipes: Recipe[];

    constructor() {
        this.recipes = [...getRandomRecipes()];
    }

    getAllRecipes() {
        return this.recipes;
    }

    checkIfIdentityIsAvailable(id: number){
        return this.recipes.filter(r => r.id === id).length === 0;
    }

    save(recipe: Recipe){
        this.recipes.push(recipe);
    }

}
