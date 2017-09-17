import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RecipesListComponent} from './recipes/components/recipes-list/recipes-list.component';
import {RecipesService} from "./recipes/services/recipes.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
    MdButtonModule, MdCardModule, MdCheckboxModule, MdChipsModule, MdDialog, MdDialogModule, MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule, MdSelectModule, MdSnackBarModule, MdTooltipModule
} from "@angular/material";
import {RecipeDetailsComponent} from './recipes/components/recipe-details/recipe-details.component';
import {RecipesListItemComponent} from "./recipes/components/recipes-list-item/recipes-list-item.component";
import {CreateRecipeDialogComponent} from "./recipes/components/create-recipe-dialog/create-recipe-dialog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        RecipesListComponent,
        RecipesListItemComponent,
        RecipeDetailsComponent,
        CreateRecipeDialogComponent
    ],
    entryComponents:[
        CreateRecipeDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MdListModule,
        ReactiveFormsModule,
        MdIconModule,
        MdCardModule,
        MdSnackBarModule,
        MdGridListModule,
        MdInputModule,
        MdButtonModule,
        MdChipsModule,
        MdTooltipModule,
        MdSelectModule,
        MdDialogModule,
        MdCheckboxModule
    ],
    providers: [RecipesService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
