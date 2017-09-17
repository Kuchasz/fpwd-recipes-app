import {Component, Input, OnInit} from '@angular/core';
import {RecipesService} from "../../services/recipes.service";
import {Ingredient} from "../../models/ingredient.enum";
import {UnitOfMeasure} from "../../models/unit-of-measure.enum";
import {CookingMethod} from "../../models/cooking-method.enum";
import {Recipe} from "../../models/recipe";
import {getAllValues} from "../../../../utils/enum";

@Component({
    selector: 'app-recipe-details',
    templateUrl: './recipe-details.component.html',
    styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent {

    @Input()
    recipeId: number;
    ingredients = Ingredient;
    units = UnitOfMeasure;
    methods = CookingMethod;
    allMethods = getAllValues<CookingMethod>(CookingMethod);

    constructor(readonly recipeService: RecipesService) {
    }

    get recipe(): Recipe {
        return this.recipeService.getRecipe(this.recipeId);
    }

    getAvailableMethods(ingredient: Ingredient): CookingMethod[]{
        const assignedMethods = this._getTargetRecipeIngredient(ingredient).cookingMethods;
        return this.allMethods.filter(m => assignedMethods.indexOf(m) === -1);
    }

    addCookingMethod(method: CookingMethod, ingredient: Ingredient){
        const targetRecipeIngredient = this._getTargetRecipeIngredient(ingredient);
        targetRecipeIngredient.cookingMethods = [method, ...targetRecipeIngredient.cookingMethods];
    }

    removeCookingMethod(method: CookingMethod, ingredient: Ingredient){
        const targetRecipeIngredient = this._getTargetRecipeIngredient(ingredient);
        const methodToRemoveIndex = targetRecipeIngredient.cookingMethods.indexOf(method);
        targetRecipeIngredient.cookingMethods = [...targetRecipeIngredient.cookingMethods.slice(0, methodToRemoveIndex), ...targetRecipeIngredient.cookingMethods.slice(methodToRemoveIndex+1)];
    }

    private _getTargetRecipeIngredient(ingredient: Ingredient){
        return this.recipe.ingredients.filter(i => i.ingredient === ingredient)[0];
    }

}
