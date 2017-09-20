import {Component} from "@angular/core";

@Component({
    selector: 'app-recipes-viewer',
    templateUrl: './recipes-viewer.component.html',
    styleUrls: ['./recipes-viewer.component.scss']
})
export class RecipesViewerComponent {
    selectedTabIndex: number = RecipesTabs.View;

    constructor() {

    }
}

enum RecipesTabs {
    View,
    AdvancedSearch
}