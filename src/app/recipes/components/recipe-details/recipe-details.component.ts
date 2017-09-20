import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RecipesService} from "../../services/recipes.service";
import {Ingredient} from "../../models/ingredient.enum";
import {UnitOfMeasure} from "../../models/unit-of-measure.enum";
import {CookingMethod} from "../../models/cooking-method.enum";
import {Recipe} from "../../models/recipe";
import {getAllValues} from "../../../../utils/enum";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {RecipeIngredient} from "../../models/recipe-ingredient";
import {ActivatedRoute, ParamMap, Params} from "@angular/router";
import {isUndefined} from "util";

@Component({
    selector: 'app-recipe-details',
    templateUrl: './recipe-details.component.html',
    styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent {

    recipe: Recipe = undefined;
    ingredients = Ingredient;
    units = UnitOfMeasure;
    methods = CookingMethod;
    allMethods = getAllValues<CookingMethod>(CookingMethod);
    allIngredients = getAllValues<Ingredient>(Ingredient);
    allUnits = getAllValues<UnitOfMeasure>(UnitOfMeasure);

    newIngredient: FormGroup = this.formBuilder.group({
        ingredient: ['', Validators.required],
        unit: ['', Validators.required],
        amount: ['', [Validators.required, this._validateAmount()]]
    });

    constructor(readonly recipeService: RecipesService,
                readonly formBuilder: FormBuilder,
                readonly route: ActivatedRoute) {

        this.route.params.map(p => p.id).subscribe(id => {
            this.recipe = this.recipeService.getRecipe(Number(id));
        });
    }

    changeRecipeName(recipe: Recipe, newName: string) {
        recipe.name = newName;
    }

    getAvailableMethods(ingredient: Ingredient): CookingMethod[] {
        const assignedMethods = this._getTargetRecipeIngredient(ingredient).cookingMethods;
        return this.allMethods.filter(m => assignedMethods.indexOf(m) === -1);
    }

    getAvailableIngredients(recipe: Recipe): Ingredient[] {
        const assignedIngredients = recipe.ingredients.map(i => i.ingredient);
        return this.allIngredients.filter(i => assignedIngredients.indexOf(i) === -1);
    }

    addCookingMethod(method: CookingMethod, ingredient: Ingredient) {
        const targetRecipeIngredient = this._getTargetRecipeIngredient(ingredient);
        targetRecipeIngredient.cookingMethods = [method, ...targetRecipeIngredient.cookingMethods];
    }

    removeCookingMethod(method: CookingMethod, ingredient: Ingredient) {
        const targetRecipeIngredient = this._getTargetRecipeIngredient(ingredient);
        const methodToRemoveIndex = targetRecipeIngredient.cookingMethods.indexOf(method);
        targetRecipeIngredient.cookingMethods = [...targetRecipeIngredient.cookingMethods.slice(0, methodToRemoveIndex), ...targetRecipeIngredient.cookingMethods.slice(methodToRemoveIndex + 1)];
    }

    addIngredient({value: ingredient}) {
        const ingredientToSave: RecipeIngredient = {
            ingredient: ingredient.ingredient,
            cookingMethods: [],
            unit: ingredient.unit,
            amount: ingredient.amount
        };
        this.recipe.ingredients = [ingredientToSave, ...this.recipe.ingredients];
        this.newIngredient.reset();
    }

    private _getTargetRecipeIngredient(ingredient: Ingredient) {
        return this.recipe.ingredients.filter(i => i.ingredient === ingredient)[0];
    }

    private _validateAmount() {
        return (control: AbstractControl): ValidationErrors => {
            return (!this.recipe || this.recipe.bigAmount) ? null : this.recipe.ingredients.reduce((sum, ingredient) => sum + ingredient.amount, 0) + control.value >= 1000 ? {'tooMuchIngredients': true} : null;
        }
    }


}
