import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../models/recipe";
import {MdDialog} from "@angular/material";
import {CreateRecipeDialogComponent} from "../create-recipe-dialog/create-recipe-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-recipes-list',
    templateUrl: './recipes-list.component.html',
    styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {

    recipes: Recipe[];
    selectedRecipeId: number;
    filter: string = "";

    constructor(
        readonly recipesService: RecipesService,
        readonly dialog: MdDialog,
        readonly router: Router,
        readonly route: ActivatedRoute) {
    }

    ngOnInit() {
        this.recipesService.getAllRecipes().subscribe(recipes => this.recipes = recipes);
        this.route.params.map(p => p.id).subscribe(id => this.selectedRecipeId = Number(id));
    }

    openCreateRecipeDialog() {
        const dialogWindow = this.dialog.open(CreateRecipeDialogComponent, {hasBackdrop: true});
        dialogWindow.afterClosed().subscribe(({addedRecipeId}: { addedRecipeId: number }) => {
            if (addedRecipeId !== undefined) this.selectRecipe(addedRecipeId);
        });
    }

    get filteredRecipes(): Recipe[] {
        const filter = this.filter.toLowerCase().trim();
        return this.recipes.filter(r => r.name.toLowerCase().includes(filter)
            || r.id.toString().toLowerCase().includes(filter)
            || r.ingredients.length.toString().toLowerCase().includes(filter));
    }

    selectRecipe(recipeId: number) {
        this.router.navigate(['recipe', {id: recipeId}]);
    }

    deleteRecipe(recipeId: number) {
        this.selectRecipe(undefined);
        this.recipesService.delete(recipeId);
    }
}
