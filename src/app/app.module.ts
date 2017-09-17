import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RecipesListComponent } from './recipes/components/recipes-list/recipes-list.component';
import {RecipesService} from "./recipes/services/recipes.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
    MdButtonModule, MdCardModule, MdChipsModule, MdGridListModule, MdIconModule,
    MdListModule, MdTooltipModule
} from "@angular/material";
import { RecipeDetailsComponent } from './recipes/components/recipe-details/recipe-details.component';
import {RecipesListItemComponent} from "./recipes/components/recipes-list-item/recipes-list-item.component";

@NgModule({
  declarations: [
    AppComponent,
    RecipesListComponent,
    RecipesListItemComponent,
    RecipeDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdListModule,
    MdIconModule,
    MdCardModule,
    MdGridListModule,
    MdButtonModule,
    MdChipsModule,
    MdTooltipModule
  ],
  providers: [RecipesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
