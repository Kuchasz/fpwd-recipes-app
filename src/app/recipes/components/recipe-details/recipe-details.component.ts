import {Component, Input, OnInit} from '@angular/core';
import {RecipesService} from "../../services/recipes.service";
import {Ingredient} from "../../models/ingredient.enum";
import {UnitOfMeasure} from "../../models/unit-of-measure.enum";
import {CookingMethod} from "../../models/cooking-method.enum";
import {Recipe} from "../../models/recipe";

@Component({
    selector: 'app-recipe-details',
    templateUrl: './recipe-details.component.html',
    styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

    @Input()
    recipeId: number;
    ingredients = Ingredient;
    units = UnitOfMeasure;
    methods = CookingMethod;
    allMethods = Object.values(CookingMethod).filter(i => Number(i));

    constructor(readonly recipeService: RecipesService) {
    }

    ngOnInit() {
    }

    get recipe(): Recipe {
        return this.recipeService.getAllRecipes().filter((r => r.id === this.recipeId))[0];
    }

    getAvailableMethods(ingredient: Ingredient): CookingMethod[]{
        const assignedMethods = this.recipe.ingredients.filter(i  => i.ingredient === ingredient)[0].cookingMethods;
        return this.allMethods.filter(m => assignedMethods.indexOf(m) === -1);
    }

}
