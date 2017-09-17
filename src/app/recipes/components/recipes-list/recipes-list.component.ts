import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../models/recipe";
import {MdDialog} from "@angular/material";
import {CreateRecipeDialogComponent} from "../create-recipe-dialog/create-recipe-dialog.component";

@Component({
    selector: 'app-recipes-list',
    templateUrl: './recipes-list.component.html',
    styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {

    @Output()
    select = new EventEmitter<number>();
    recipes: Recipe[];
    selectedRecipeId: number;

    constructor(readonly recipesService: RecipesService, readonly dialog: MdDialog) {
    }

    ngOnInit() {
        this.recipes = this.recipesService.getAllRecipes();
    }

    openCreateRecipeDialog(){
        const dialogWindow = this.dialog.open(CreateRecipeDialogComponent, {hasBackdrop: true});
        dialogWindow.afterClosed().subscribe( ({addedRecipeId}: {addedRecipeId: number}) => {
            if(addedRecipeId) this.selectRecipe(addedRecipeId);
        });
    }

    selectRecipe(recipeId: number){
        this.selectedRecipeId = recipeId;
        this.select.emit(recipeId);
    }
}
