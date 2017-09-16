import {Injectable} from '@angular/core';
import {Recipe} from '../models/recipe';
import {RecipeIngredient} from '../models/recipe-ingredient';
import {Ingredient} from '../models/ingredient.enum';
import {isNumber} from 'util';
import {UnitOfMeasure} from '../models/unit-of-measure.enum';
import {CookingMethod} from '../models/cooking-method.enum';

const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

const getArrayRange = (range: number) => Array.from(Array(range)).map((_, index) => index);

type Enum = { [id: number]: string };

const getRandomEnum: <T>(Enum) => T = <T>(enumType: Enum) => {
    const enumValues = Object.values(enumType).filter(i => isNumber(i));
    return <T>enumValues[getRandomNumber(enumValues.length)];
};

const getRandomRecipeIngredient: () => RecipeIngredient = () => {
    return {
        ingredient: getRandomEnum<Ingredient>(Ingredient),
        amount: getRandomNumber(500),
        unit: getRandomEnum<UnitOfMeasure>(UnitOfMeasure),
        cookingMethods: [getRandomEnum<CookingMethod>(CookingMethod)]
    };
};

const getRandomRecipe: (number) => Recipe = (id: number) => {
    const ingredients = getArrayRange(getRandomNumber(5) + 1).map(() => getRandomRecipeIngredient());
    return {
        id,
        name: `Recipe number ${id + 1}`,
        ingredients,
        bigAmount: ingredients.reduce((prev, cur) => prev + cur.amount, 0) > 1000
    };
};

const getRandomRecipes = () => getArrayRange(getRandomNumber(20) + 5).map(id => getRandomRecipe(id));

@Injectable()
export class RecipesService {

    private readonly recipes: Recipe[];

    constructor() {
        this.recipes = [...getRandomRecipes()];
    }

    getAllRecipes() {
        return this.recipes;
    }

}
