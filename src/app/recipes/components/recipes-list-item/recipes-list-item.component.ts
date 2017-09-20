import {Component, Input} from "@angular/core";
import {Recipe} from "../../models/recipe";

@Component({
    selector: 'app-recipes-list-item',
    templateUrl: './recipes-list-item.component.html',
    styleUrls: ['./recipes-list-item.component.scss']
})
export class RecipesListItemComponent {
    @Input()
    recipe: Recipe;

    getRecipeBadgeColor(recipe: Recipe) {
        const {ingredients: {length}} = recipe;
        return length < 5
            ? '#4CAF50'
            : length < 10
                ? '#FF9800'
                : '#F44336';
    }
}