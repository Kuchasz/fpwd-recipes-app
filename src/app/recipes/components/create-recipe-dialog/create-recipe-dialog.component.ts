import {MdDialogRef, MdSnackBar} from "@angular/material";
import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../models/recipe";

@Component({
    selector: 'app-create-recipe-dialog',
    templateUrl: './create-recipe-dialog.component.html',
    styleUrls: ['./create-recipe-dialog.component.scss']
})
export class CreateRecipeDialogComponent {

    newRecipe: FormGroup = this.formBuirder.group({
        id: ['', [Validators.required, this._validateIdentityUniqueness()]],
        name: ['', [Validators.required]],
        bigAmount: ['']
    });

    constructor(readonly recipesService: RecipesService, readonly formBuirder: FormBuilder, readonly dialogRef: MdDialogRef<CreateRecipeDialogComponent>, readonly snackBar: MdSnackBar) {
    }

    saveNewRecipe({value: recipe}) {
        const recipeToSave: Recipe = {
            id: Number(recipe.id),
            ingredients: [],
            name: String(recipe.name),
            bigAmount: Boolean(recipe.bigAmount)
        };
        this.recipesService.save(recipeToSave);
        this.dialogRef.close({addedRecipeId: recipeToSave.id});
        this.snackBar.open(`Recipe ${recipeToSave.name} saved.`, 'OK', {duration: 5000});
    }

    _validateIdentityUniqueness() {
        return (control: AbstractControl): ValidationErrors => {
            const isIdUnique = this.recipesService.checkIfIdentityIsAvailable(Number(control.value));
            return isIdUnique ? null : {'notUnique': true};
        }
    }

}