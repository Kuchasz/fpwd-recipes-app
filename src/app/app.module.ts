import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RecipesListComponent } from './recipes/components/recipes-list/recipes-list.component';
import {RecipesService} from "./recipes/services/recipes.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MdCardModule, MdGridListModule, MdIconModule, MdListModule} from "@angular/material";
import { RecipeDetailsComponent } from './recipes/components/recipe-details/recipe-details.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipesListComponent,
    RecipeDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdListModule,
    MdIconModule,
    MdCardModule,
    MdGridListModule
  ],
  providers: [RecipesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
