import {Injectable} from '@angular/core';
import {Recipe} from '../models/recipe';
import {RecipeIngredient} from '../models/recipe-ingredient';
import {Ingredient} from '../models/ingredient.enum';
import {isNumber} from 'util';
import {UnitOfMeasure} from '../models/unit-of-measure.enum';
import {CookingMethod} from '../models/cooking-method.enum';
import {getRandomEnum} from "../../../utils/enum";
import {getRandomInteger} from "../../../utils/number";
import {gerRandomArrayItem, getArrayFromRange, removeDuplicates} from "../../../utils/array";
import * as Rx from "rxjs";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

const getRandomRecipeIngredient: () => RecipeIngredient = () => {
    return {
        ingredient: getRandomEnum<Ingredient>(Ingredient),
        amount: getRandomInteger(500),
        unit: getRandomEnum<UnitOfMeasure>(UnitOfMeasure),
        cookingMethods: removeDuplicates(getArrayFromRange(getRandomInteger(3) + 1).map(x => getRandomEnum<CookingMethod>(CookingMethod)), method=>method)
    };
};

const cuisineNames = ['Italian', 'Indonesian', 'Mexican', 'Chinese', 'Spanish', 'French', 'Japanese', 'Turkey', 'Thai', 'Indian'];
const dishNames = ['Soup', 'Chicken', 'Pizza', 'Fried Rice', 'Cake', 'Salad', 'Fish'];

const getRandomRecipeName = () => `${gerRandomArrayItem(cuisineNames)} ${gerRandomArrayItem(dishNames)}`;

const getRandomRecipe = (id: number) => {
    const ingredients = removeDuplicates(getArrayFromRange(getRandomInteger(15) + 1).map(() => getRandomRecipeIngredient()), ingredient => ingredient.ingredient);
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

    private recipes: Recipe[];
    private readonly recipesSubject: Subject<Recipe[]>;
    private readonly recipesObservable: Observable<Recipe[]>;

    constructor() {
        this.recipesSubject = new Subject<Recipe[]>();
        this.recipes = getRandomRecipes();
        this.recipesObservable = Rx.Observable.from([this.recipes]).merge(this.recipesSubject.asObservable());
    }

    getAllRecipes(): Observable<Recipe[]> {
        return this.recipesObservable;
    }

    getRecipe(recipeId: number){
        return this.recipes.filter(r => r.id === recipeId)[0];
    }

    checkIfIdentityIsAvailable(id: number) {
        return this.getRecipe(id) === undefined;
    }

    save(recipe: Recipe) {
        this.recipes = [recipe, ...this.recipes];
        this.recipesSubject.next(this.recipes);
    }

    delete(recipeId: number){
        const recipeToDelete = this.recipes.filter(r => r.id === recipeId)[0];
        const recipeToDeleteIndex = this.recipes.indexOf(recipeToDelete);
        this.recipes = [...this.recipes.slice(0, recipeToDeleteIndex), ...this.recipes.slice(recipeToDeleteIndex+1)];
        this.recipesSubject.next(this.recipes);
    }

}
