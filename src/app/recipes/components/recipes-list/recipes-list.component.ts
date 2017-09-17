import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../models/recipe";

@Component({
    selector: 'app-recipes-list',
    templateUrl: './recipes-list.component.html',
    styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {

    @Output()
    select = new EventEmitter<number>();
    recipes: Recipe[];

    constructor(readonly recipesService: RecipesService) {
    }

    ngOnInit() {
        this.recipes = this.recipesService.getAllRecipes();
    }

    onItemClick(id: number) {
        this.select.emit(id);
    }




}
