import {Component, Input, OnInit} from '@angular/core';
import {RecipesService} from "../../services/recipes.service";
import {Ingredient} from "../../models/ingredient.enum";
import {UnitOfMeasure} from "../../models/unit-of-measure.enum";

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
  constructor(readonly recipeService: RecipesService) { }

  ngOnInit() {
  }

  get recipe(){
    return this.recipeService.getAllRecipes().filter((r => r.id === this.recipeId))[0];
  }

}
