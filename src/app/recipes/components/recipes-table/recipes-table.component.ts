import {Component, EventEmitter, Output} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {DataSource} from "@angular/cdk/collections";
import {Recipe} from "../../models/recipe";
import {RecipesFilter, RecipesService} from "../../services/recipes.service";
import {Ingredient} from "../../models/ingredient.enum";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Router} from "@angular/router";

@Component({
    selector: 'app-recipes-table',
    styleUrls: ['./recipes-table.component.scss'],
    templateUrl: './recipes-table.component.html'
})
export class RecipesTableComponent {

    columns = ['navigate', 'id', 'name', 'bigAmount', 'ingredients'];
    recipes: Recipes;

    @Output()
    navigateBack = new EventEmitter<void>();

    idFilter: string;
    nameFilter: string;
    ingredientsFilter: string;

    constructor(readonly recipesService: RecipesService, readonly router: Router) {
        this.recipes = new Recipes(recipesService);
    }

    getIngredients(recipe: Recipe): string {
        const ingredientsNames = recipe.ingredients.map(i => Ingredient[i.ingredient]);
        return ingredientsNames.slice(1).reduce((ingredients, i) => `${ingredients}, ${i}`, ingredientsNames[0]);
    }

    navigateToRecipe(recipeId: number) {
        this.router.navigate(['recipe', {id: recipeId,}]);
        this.navigateBack.emit();
    }

    setFilters(){
        this.recipes.setFilters({
            id: this.idFilter,
            name: this.nameFilter,
            ingredients: this.ingredientsFilter
        });
    }
}


export class Recipes extends DataSource<Recipe> {

    filterChange = new BehaviorSubject<RecipesFilter>({id: '', name: '', ingredients: ''});

    setFilters(filter: RecipesFilter) {
        this.filterChange.next(filter);
    }

    constructor(readonly recipesService: RecipesService) {
        super();
    }

    connect(): Observable<Recipe[]> {

        const subjects: any[] = [this.filterChange, this.recipesService.getRecipesSubject()];

        return Observable.merge(...subjects).map(() => {
            return this.recipesService.getFilteredRecipes(this.filterChange.getValue());
        });

    }

    disconnect() {
    }
}